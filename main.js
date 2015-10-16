//Inicializa las variables globales
var imgDeck = "wiki";
var imgBack = "bicycle-red";
var vrChck0 = "glyphicon glyphicon-unchecked";
var vrChck1 = "glyphicon glyphicon-check"

var JsonApi = new RandomJs();

// Inicia el menu de herramientas

// Menu HELP

// Menu: Baraja
$( ".mnuGenerarQr" ).on( "click", generarQr );
$( "#ordenMnemonica" ).on( "click", ordenarMnemonica );
$( "#ordenBicycle" ).on( "click", ordenarBicycle );
$( "#orden4Kings" ).on( "click", ordenar4Kings);
$( "#ordenRosarioEightKings" ).on( "click", ordenarRosarioEightKings);
$( "#ordenRosarioDixRois" ).on( "click", ordenarRosarioDixRois);
$( "#ordenRosarioUnusQuinque" ).on( "click", ordenarRosarioUnusQuinque);
$( "#ordenRosario18Reyes" ).on( "click", ordenarRosario18Reyes);

//$( "#bjAjustes" ).on( "click", bjAjustes );

$( "#colorTapete" ).on( "change", cambiarColorTapete );
$( "#texturaTapete" ).on( "change", cambiarTexturaTapete );
$( "#colorConsola" ).on( "change", cambiarColorConsola );
$( "#colorConsolaTexto" ).on( "change", cambiarColorConsolaTexto );
$( "#fuenteConsola" ).on( "change", cambiarFuenteConsola );

// Menu: Mezclar
$( ".sfInvertir" ).on( "click", sfInvertir );
$( ".sfFisherYates" ).on( "click", sfFisherYates );
$( ".sfSattolo" ).on( "click", sfSattolo );
$( ".sfRandomOrg" ).on( "click", sfRandomOrg );
$( ".sfFaroExt" ).on( "click", sfFaroExt );
$( ".sfFaroInt" ).on( "click", sfFaroInt );
$( ".sfAntiFaroExt" ).on( "click", sfAntiFaroExt );
$( ".sfAntiFaroIn" ).on( "click", sfAntiFaroInt );
// $( "#sfCortar" ).on( "click", sfCortar );
// $( "#sfOverhand" ).on( "click", sfOverhand );

// Menu: Ver Check / UnCheck
$( "#vrMatriz" ).on( "click", {name: "Matriz"}, verModulos );
$( "#vrTapete" ).on( "click", {name: "Tapete"}, verModulos );
$( "#vrBotonera" ).on( "click", {name: "Botonera"}, verModulos );
$( "#vrConsola" ).on( "click", {name: "Consola"}, verModulos );

// Entrar comando en consola
 $('#consolaInput').keypress(function(event){  
       var keycode = (event.keyCode ? event.keyCode : event.which);  
      if(keycode == '13'){  
           inputConsola();
      }   
 });  


document.oncontextmenu = function(){return false;}

// Ordenaciones
var baraja = "AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH,AS,2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD";
baraja = baraja.split(",");

// Ordenar Bicycle
function ordenarBicycle(){
    baraja = "AH,2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,KD,QD,JD,10D,9D,8D,7D,6D,5D,4D,3D,2D,AD,KS,QS,JS,10S,9S,8S,7S,6S,5S,4S,3S,2S,AS";
    baraja = baraja.split(",");
    abreBaraja();
}

function ordenarRosarioEightKings(){
    baraja = "8S,KH,3C,10D,2S,7H,9C,5D,QS,4H,AC,6D,JS,8H,KC,3D,10S,2H,7C,9D,5S,QH,4C,AD,6S,JH,8C,KD,3S,10H,2C,7D,9S,5H,QC,4D,AS,6H,JC,8D,KS,3H,10C,2D,7S,9H,5C,QD,4S,AH,6C,JD";
    baraja = baraja.split(",");
    consola('"Eight Kings threatened to save ninety-five ladies for one sick knave"')
    abreBaraja();
}

function ordenar4Kings(){
    baraja = "AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH,AS,2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD";
    baraja = baraja.split(",");
    //consola('"Eight Kings threatened to save ninety-five ladies for one sick knave"')
    abreBaraja();
}

function ordenarRosarioDixRois(){
    baraja = "10S,8H,KC,9D,JS,AH,7C,QD,10H,8C,KD,9S,JH,AC,7D,QS,10C,8D,KS,9H,JC,AD,7S,QH,10D,8S,KH,9C,JD,AS,7H,QC";
    baraja = baraja.split(",");
    consola('"Dix huit Rois ne valent pas sept Dames"')
    abreBaraja();
}

function ordenarRosarioUnusQuinque(){
    baraja = "AS,5H,9C,JD,6S,4H,2C,KD,7S,8H,QC,3D,10S,AH,5C,9D,JS,6H,4C,2D,KS,7H,8C,QD,3S,10H,AC,5D,9S,JH,6C,4D,2S,KH,7C,8D,QS,3H,10C,AD,5S,9H,JC,6D,4S,2H,KC,7D,8S,QH,3C,10D";
    baraja = baraja.split(",");
    consola('"Unus quinque noven fámulus sex quatuor duo Rex septem acto faemina trina decem"')
    abreBaraja();
}

function ordenarRosario18Reyes(){
    baraja = "10S,8H,KC,7D,2S,3H,AC,4D,9S,QH,6C,JD,5S,10H,8C,KD,7S,2H,3C,AD,4S,9H,QC,6D,JS,5H,10C,8D,KS,7H,2C,3D,AS,4H,9C,QD,6S,JH,5C,10D,8S,KH,7C,2D,3S,AH,4C,9D,QS,6H,JC,5D";
    baraja = baraja.split(",");
    consola('"18 Reyes sentados entre las 49 damas se van al cine"')
    abreBaraja();
}


// Ordenar Mnemónica
function ordenarMnemonica(){
    baraja = "4C,2H,7D,3C,4H,6D,AS,5H,9S,2S,QH,3D,QC,8H,6S,5S,9H,KC,2D,JH,3S,8S,6H,10C,5D,KD,2C,3H,8D,5C,KS,JD,8C,10S,KH,JC,7S,10H,AD,4S,7H,4D,AC,9C,JS,QD,7C,QS,10D,6C,AH,9D";
    baraja = baraja.split(",");
    abreBaraja();
}

// Función de Renderización
function abreBaraja(){

    
    var contenido = '<ul class="baraja" id="naipes">';
    var rotulos = '';

    for (var i = 0;i < baraja.length;i++){
        contenido = contenido + '<li><a class="naipe" id="naipe' + i + '"><div class="rotulo">' + (i+1) + '</div></a></li>';

    }
    contenido = contenido + '</ul>';
    
    $("#tapete").html(contenido);
    renderizar();
}

// Algoritmo de FisherShuttle 
function sfFisherYates() {
    var counter = baraja.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = baraja[counter];
        baraja[counter] = baraja[index];
        baraja[index] = temp;
    }
    renderizar();
    consola("durstenfeld");
}

// Algoritmo Sattolo
function sfSattolo() {
    for (var i = 0; i < baraja.length - 1; i++) {
        var j = i + 1 + Math.floor(Math.random() * (baraja.length - i - 1));

        var temp = baraja[j];
        baraja[j] = baraja[i];
        baraja[i] = temp;
    }
    renderizar();
    consola("sattolo");
}

// RANDOM.ORG
$("#customApiKeyRandom").val("2dbcb5c9-d4f8-4d19-b1f1-cd5cf3980e97");
comprobarApiRandom();

function sfRandomOrg(){
var barajaTemp = baraja.slice();

    var result = JsonApi
    .apikey($("#customApiKeyRandom").val())
    .method('generateIntegers')
    .params({
        n:baraja.length,
        min:0,
        max:(baraja.length-1),
        replacement:true
    })
    .post(function(xhrOrError, stream, body) {
        
        for (var i = 0; i < baraja.length ; i++){
            baraja[i] = barajaTemp[body.result.random.data[i]]
        }
        
        comprobarApiRandom(body.result.requestsLeft, body.result.bitsLeft);
        renderizar();
        consola("radomOrg");
    });
}

function comprobarApiRandom(numRequest,numBits){
    var bitsQuedan, requestQuedan
    
    if (numRequest == undefined){
            var result = JsonApi
            .apikey($("#customApiKeyRandom").val())
            .method('getUsage')
            .params({
                apiKey:$("#customApiKeyRandom").val()
            })
            .post(function(xhrOrError, stream, body) {
                requestQuedan = body.result.requestsLeft;
                bitsQuedan = body.result.bitsLeft;
                $('#randomKeyApiRequestLeft').css('width', (requestQuedan/10)+'%').attr('aria-valuenow', requestQuedan); 
                $('#randomKeyApiRequestLeft').html(requestQuedan);
                $('#randomKeyApiBitsLeft').css('width', (bitsQuedan/2500)+'%').attr('aria-valuenow', bitsQuedan); 
                $('#randomKeyApiBitsLeft').html(bitsQuedan);
            });

    }  else {
        $('#randomKeyApiRequestLeft').css('width', (numRequest/10)+'%').attr('aria-valuenow', numRequest); 
        $('#randomKeyApiRequestLeft').html(numRequest);
        $('#randomKeyApiBitsLeft').css('width', (numBits/2500)+'%').attr('aria-valuenow', numBits); 
        $('#randomKeyApiBitsLeft').html(numBits);
            
    }
    
}

// MESCLA = INVERTIR
function sfInvertir(){
    baraja.reverse();
    consola("invertir");
    renderizar();
}

// MEZCLA = CORTAR
function sfCortar(){
   // alert("Corta la baraja")
}

// MEZCLA = OVERHAND
function sfOverhand(){
 //   alert("MEZCLA EN LAS MANOS")
}

// MEZCLA =  FARO EXT
function sfFaroExt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (var i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i] = barajaTemp[i/2];
        }else{
            baraja[i] = barajaTemp[(i+baraja.length-1)/2];
        }
    }
    consola("faroExt");
    renderizar();
}

// MEZCLA =  FARO INT
function sfFaroInt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (var i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i+1] = barajaTemp[i/2];
        }else{
            baraja[i-1] = barajaTemp[(i+baraja.length-1)/2];
        }
    }
    consola("faroInt");
    renderizar();
}

// MEZCLA =  ANTIFARO EXT
function sfAntiFaroExt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (var i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i/2] = barajaTemp[i];
        }else{
            baraja[(i+baraja.length-1)/2] = barajaTemp[i];
        }
    }
    consola("antiFaroExt");
    renderizar();
}

// MEZCLA =  ANTIFARO INT
function sfAntiFaroInt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (var i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i/2] = barajaTemp[i+1];
        }else{
            baraja[(i+baraja.length-1)/2] = barajaTemp[i-1];
        }
    } 
    consola("antiFaroInt");
    renderizar();
}

// Renderiza la baraja
function renderizar(){
    
    // Renderiza la Matriz v Ascii
    if (true == false){
        
    var contenido = '';
    for (var i = 0; i < baraja.length;i++){
        
        switch(baraja[i].charAt(baraja[i].length-1)){
            case 'C':
                contenido = contenido + baraja[i].substring(0,baraja[i].length-1) + '<big>&spades;</big> ';
                break;
            case 'H':
                contenido = contenido + '<font color="#dd0000">' + baraja[i].substring(0,baraja[i].length-1) + '<big>&hearts;</big></font> ';
                break
            case 'S':
                contenido = contenido + baraja[i].substring(0,baraja[i].length-1) + '<big>&clubs;</big> ';
                break;
            case 'D':
                contenido = contenido + '<font color="#dd0000">' + baraja[i].substring(0,baraja[i].length-1) + '<big>&diams;</big></font> ';
                break;
            default:
                contenido = contenido + baraja[i]        
        }
        
    } 
    document.getElementById("matrizAscii").innerHTML = contenido;
    
    }
    
    // Renderiza la Matriz
    document.getElementById("matriz").value = baraja;
    
    // Renderiza el tapete
    for (var i = 0;i < baraja.length;i++){
        $("#naipe"+i).css('background', 'url(img/decks/' + imgDeck + '/' + baraja[i] + '.png)');
        $("#naipe"+i).css('backgroundColor', 'white');
        $("#naipe"+i).css('backgroundSize', '100px 140px');
        $("#naipe"+i).css('backgroundPositionX','-1px');  
    }
}

abreBaraja();

// Ver Modulos
function verModulos(event){
    
    mModulo = "txtVer" + event.data.name;
    xModulo = "#modulo" + event.data.name;
    
    // Muestra el módulo seleccionado
    if( document.getElementById(mModulo).className == vrChck0 ){
    
        document.getElementById(mModulo).className = vrChck1;
        $(xModulo).css('display', 'block');
        
    // Oculta el módulo seleccionado
    }else{
        
        document.getElementById(mModulo).className = vrChck0;
        $(xModulo).css('display', 'none');
    }
}
// Input a consola
function inputConsola(){
    var txtOrden = $("#consolaInput").val();
    txtOrden = txtOrden.toLowerCase()
    $("#consolaInput").val("");
    
    // Divide el input de la consola al encontrar un ";" generando así una secuencia de órdenes.
    txtOrden = txtOrden.split(";");

    // Ejecuta cada órden
    for (var i = 0;i < txtOrden.length;i++){
        
            var txtComando = txtOrden[i].split("*");
            
            // ¿el comando tiene multiplicador?
            if (txtComando.length == 2){
                
                if (isNaN(parseInt(txtComando[1]))){
                    consola("'" + txtComando[1] + "' no es un multiplicador válido.")
                }else{
                
                    txtComando[1] = parseInt(txtComando[1]);



                    // repite el comando según el multiplicador
                    for (var j = 0; j < txtComando[1] ;j++){
                    //consola("subiteracion = " + j );
                        ejecutarComando(txtComando[0].trim());
                    }
                }
            }else if (txtComando.length = 1){
                
                ejecutarComando(txtComando[0].trim());
            }
    }
}

function ejecutarComando(texto){
    
    switch (texto) {
            case "help":
            case "ayuda":
            {
                consola('Haga <a href="docs" target="_blank">click aquí</a> acceder a la ayuda.');
                return;
            }
            case "version":
            {
                consola('Barajador v0.1 (beta)');
                return;
            }
            case "clear":
            case "clr":
            {
            // Limpiar consola
                $("#consolaOutput").text("");
                return;
            }
            case "invertir":
            {
                sfInvertir();
                return;
            }
            case "sattolo":
            {
                sfSattolo();
                return;
            }
            case "durstenfeld":
            {
                sfFisherYates();
                return;
            }
            case "randomorg":
            {
                sfRandomOrg();
                return;
            }
            case "faroext":
            {
                sfFaroExt();
                return;
            }
            case "faroint":
            {
                sfFaroInt();
                return;
            }
            case "antifaroext":
            {
                sfAntiFaroExt();
                return;
            }
            case "antifaroint":
            {
                sfAntiFaroInt();
                return;
            }
            case "generarqr":
            {
                generarQrConsola();
                return;
            }
            case "":
            {
                return;
            }
            default:
            {
                consola(texto + ": No se encontró la orden");
                return;
                  // código si no es ninguno de los anteriores
            }
        }
}
// Output a consola
function consola(texto){
    
    document.getElementById("consolaOutput").innerHTML = texto + "\n" + document.getElementById("consolaOutput").innerHTML;
    
}

// Generar QR
function generarQr(){
    qrSize = 250;
    urlApi = "https://api.qrserver.com/v1/create-qr-code/?size=" + qrSize + "x" + qrSize + "&data=";
    $("#imagenQr").attr('src', urlApi + baraja);
    $("#modalQr #descargar").attr('href', urlApi + baraja);
    $("#modalQr").modal();
    
}

function generarQrConsola(){
    qrSize = 250;
    urlApi = "https://api.qrserver.com/v1/create-qr-code/?size=" + qrSize + "x" + qrSize + "&data=";
    consola("Código QR generado, descárguelo haciendo <a href='" + urlApi + baraja +"' download='descarga'>click aquí</a>.")
}

function cambiarColorTapete(){
    $('#tapeteFondo').css('background-color',$('#colorTapete').val())
}

function cambiarTexturaTapete(){
    var urlTextura = "url('img/table/"+ $('#texturaTapete').val() + ".png')"
    $('#tapeteFondo').css('background-image',urlTextura)
}

$( "#mostrarRotulos" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $(".rotulo").css('display', 'table-caption');
   }else{
       $(".rotulo").css('display', 'none');
   }
});


function cambiarColorConsola(){
    $('#consola').css('background',$('#colorConsola').val())
}

function cambiarColorConsolaTexto(){
    $('#consola').css('color',$('#colorConsolaTexto').val())
}

function cambiarFuenteConsola(){
    $('#consola').css('font-family',$('#fuenteConsola').val())
    $('#consolaInput').css('font-family',$('#fuenteConsola').val())
    $('#consolaOutput').css('font-family',$('#fuenteConsola').val())
}