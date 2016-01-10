var orden = getQueryVariable("orden");
    orden = orden.split(",");
var colores = ["#bf2330","#0ff","#0f0","#00f","#ff0","#f0f","#f00","#888","#7c0741","#280b5d","#146961","#98cb3e","#ef6f2d","#186c68"];
var oCanvas = document.getElementById("grafico");
var cxt = oCanvas.getContext("2d");
var pY = 250;
var centroX = (800/2);
var centroY = (500/2);
var sumandos;

    
// Dibuja cada mezcla
function dM(inicial,final){
  
  if (inicial > final) {
    var tmp = inicial;
    inicial = final;
    final = tmp;
    var signo = "-";
  } else {
    var signo = "+";
    }
    
  if ($("#inpRadial").bootstrapSwitch('state')){
      // Arcos
      diametro = final - inicial;
      pX = margenX + inicial * dotEspacio -  dotEspacio / 2 + (diametro-1) * dotEspacio/2;
      pD = diametro * dotEspacio / 2;
      cxt.beginPath();
      cxt.arc(pX,pY,pD,0,Math.PI,dir=!dir);
      cxt.stroke();
  }else{
      // Lineas
      cxt.beginPath();
      posX = centroX + Math.cos(alfa * inicial + modif) * radio;
      posY = centroY + Math.sin(alfa * inicial + modif) * radio;
      cxt.moveTo(posX,posY);
      posX = centroX + Math.cos(alfa * final + modif) * radio;
      posY = centroY + Math.sin(alfa * final + modif) * radio;
      cxt.lineTo(posX,posY);
      cxt.stroke();
  }

  // Rótulos
  rotYmargen = 8
  if ($("#inpRotulos").bootstrapSwitch('state') && $("#inpRadial").bootstrapSwitch('state')){

    disY = (diametro) * dotEspacio/2;
    if (dir){
        rotpY = pY - disY - rotYmargen;
    } else {
        rotpY = pY + disY + 4 + rotYmargen;
    }
    
    cxt.fillStyle ="white";
    cxt.beginPath();
    cxt.arc(pX,rotpY-2,10,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();
    cxt.stroke();
    cxt.fillStyle ="black";
    cxt.beginPath();
    cxt.font = "bold 10px Georgia";
    cxt.textAlign = "center";
    cxt.fillText(signo+diametro,pX,rotpY);
 }

}

// Dibuja cada ciclo
function dCiclo(nums){

  nums = nums.split(",");
  dir = false;

  for(var i=0;i < nums.length; i++){

    dM(parseInt(nums[i]),parseInt(nums[(i+1)%nums.length]));

  }

}

function dibujar(){
  // Primero borra el dibujo anterior
  cxt.fillStyle = "white";
  cxt.fillRect(0, 0, oCanvas.width, oCanvas.height);

  // Lee las preferencias
  dotEspacio = $("#inpEspacio").val();
  margenX = (800/2) - (orden.length * dotEspacio)/2;
  alfa = Math.PI*2 / orden.length;
  modif = alfa * orden.length/2;
  radio = 200;
  porSecuencia();
    
  // Dibuja los puntos por cada carta
  for(var i=0;i < orden.length; i++){
    
    cxt.fillStyle ="black";
    cxt.beginPath();
    if ($("#inpRadial").bootstrapSwitch('state')){
        
      var pX = margenX + dotEspacio * i;
      cxt.arc(pX,pY,1.5,0,Math.PI*2,true);
        
    }else{
    
      posX = centroX + Math.cos(alfa * (i+1) + modif) * radio;
      posY = centroY + Math.sin(alfa * (i+1) + modif) * radio;
      cxt.arc(posX,posY,1.5,0,Math.PI*2,true);
        
    }
    
    cxt.closePath();
    cxt.fill();
    
    if ($("#inpPosiciones").bootstrapSwitch('state')){
      cxt.font = "10px Georgia";
      cxt.fillStyle = "black";
      cxt.textAlign = "center";
      if ($("#inpRadial").bootstrapSwitch('state')){
        cxt.fillText(i+1,pX,pY+10);
      }else{
	   cxt.fillText(i+1,posX,posY+10);
      }
    }
  }

  // mostrando la matriz graficada
  cxt.font = "12px Georgia";
  cxt.fillStyle = "black";
  cxt.textAlign = "left";
  cxt.fillText(orden,10,25);
    
  // Creando la partición de lambda(x)
  cxt.font = "14px Georgia";
  cxt.fillStyle = "black";
  cxt.textAlign = "right";
  num = String(orden.length);
  subs = "₀₁₂₃₄₅₆₇₈₉".split("");
  for(var i=0;i<10;i++){
    var re = new RegExp(i, "g");
    num = num.replace(re,subs[i]);
  }
  
  // Ordena los sumandos de la partición
  sumandos.sort(function(a, b){return b - a;});
  var particion;
    
  // ¿Partición con representación natural o multiplicativa?
  if ($("#inpParticion").bootstrapSwitch('state')){
      
    particion = sumandos.join("+");
      
  } else {
  
    //if (sumandos.length != 1){
        
        var sumandosM = 1;
        particion = [];
        for(var i=1;i<=sumandos.length;i++){

            if (sumandos[i] == sumandos[i-1]){
            
                sumandosM++;
                
            } else {
                
                particion.push(sumandos[i-1]+"·"+sumandosM);
                sumandosM = 1;
            }
        }
        
        particion = particion.join("+");
      
    //}
        
  }
    
  cxt.fillText("λ₍"+num+"₎=("+particion+")",790,480);

}
    
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
    
function porSecuencia(){

tempO = orden.slice();
var e = 1;
var ciclos = [];
sumandos = [];
    
do{

    // Rastrea un ciclo
    var ciclo = [e];
    var v = e;
    var max = 0;
    while (parseInt(orden[v-1]) != e || max > orden.length ){

     ciclo.push(orden[v-1]);
     tempO[v-1] = 0;
     v = orden[v-1];
     max++;

    }
    tempO[v-1] =  0;

    ciclos.push(ciclo.toString());
    
    sumandos.push(ciclo.length);
 
    
    // Dibuja el ciclo si tiene más de un paso
    if (ciclo.length != 1){
        
        $("#l"+(ciclos.length)).css("color",colores[ciclos.length-1]);
        $("#s"+(ciclos.length)).html(ciclo[0]);
        $("#l"+(ciclos.length)).css("display","inline-block");
        if ($("#inp"+(ciclos.length)).prop("checked")){
            cxt.strokeStyle = colores[ciclos.length-1];
            dCiclo(ciclo.toString());
        }
        
    } else 
    {
        // Oculta los ciclos e 1 paso
    
    }
    
    // Define el siguiente ciclo a buscar
    do{e++} while(tempO[e-1] == 0);
        
} while (e <= orden.length);

}

dibujar();

// BootstrapSwitch
$(function(argument) {
  $.fn.bootstrapSwitch.defaults.onText = 'Si';
  $.fn.bootstrapSwitch.defaults.offText = 'No'; 
  $.fn.bootstrapSwitch.defaults.size = 'mini';
  $('[type="checkbox"].bts').bootstrapSwitch();

})