//Inicializa las variables globales
var imgDeck = "wiki";
var imgBack = "bicycle-red";
var vrChck0 = "glyphicon glyphicon-unchecked";
var vrChck1 = "glyphicon glyphicon-check";
var idCartaActual;
var baraja;
var lugarAnt;
var JsonApi = new RandomJs();
var comandosHistorial = [];
var comandoHistorialN = 0;
// Inicia el menu de herramientas

// Menu HELP

// Menu: Baraja
$( ".mnuGenerarQr" ).on( "click", generarQr );
$( "#mnuGuardarImagen" ).on( "click", screenshot );
$( "#ordenMnemonica" ).on( "click", ordenarMnemonica );
$( "#ordenBicycle" ).on( "click", ordenarBicycle );
$( "#orden4Kings" ).on( "click", ordenar4Kings);
$( "#ordenRosarioEightKings" ).on( "click", ordenarRosarioEightKings);
$( "#ordenRosarioDixRois" ).on( "click", ordenarRosarioDixRois);
$( "#ordenRosarioUnusQuinque" ).on( "click", ordenarRosarioUnusQuinque);
$( "#ordenRosario18Reyes" ).on( "click", ordenarRosario18Reyes);
$( "#ordenSoloAces" ).on( "click", ordenarSoloAces);
$( "#abrirOrdenPersonal" ).on( "click", ordenarPersonal);

//$( "#bjAjustes" ).on( "click", bjAjustes );
$( "#colorTapete" ).on( "change", cambiarColorTapete );
$( "#texturaTapete" ).on( "change", cambiarTexturaTapete );
$( "#colorConsola" ).on( "change", cambiarColorConsola );
$( "#colorConsolaTexto" ).on( "change", cambiarColorConsolaTexto );
$( "#fuenteConsola" ).on( "change", cambiarFuenteConsola );
$( "#reiniciarTema" ).on( "click", reiniciarTema );
$( "#fuenteConsolaSize" ).on( "change", cambiarFuenteSizeConsola );

$( "#sfRepetir" ).on( "click", sfRepetir );
$( ".sfInvertir" ).on( "click", sfInvertir );

// Cortar
$( ".sfCut" ).on( "click", sfModalCortar );
$( ".btnMontar" ).on( "click", sfCortarMontar );
$( "#alNumero" ).on( "change", actualizarCorte );


// Aleatoriedad
$( ".sfFisherYates" ).on( "click", sfFisherYates );
$( ".sfDurstenfeld" ).on( "click", sfDurstenfeld );
$( ".sfSattolo" ).on( "click", sfSattolo );
$( ".sfRandomOrg" ).on( "click", sfRandomOrg );
$( ".sfNumeroAleatorio" ).on( "click", sfNumeroAleatorio );

// Faros
$( ".sfFaroExt" ).on( "click", sfFaroExt );
$( ".sfFaroInt" ).on( "click", sfFaroInt );
$( ".sfAntiFaroExt" ).on( "click", sfAntiFaroExt );
$( ".sfAntiFaroIn" ).on( "click", sfAntiFaroInt );
$( "#modalFaro .btnAplicar" ).on( "click", faroAplicar );
$( ".sfFaroAv" ).on( "click", faroShow );


// Menu: Ver Check / UnCheck
$( "#vrRefresh" ).on( "click", refresh );
$( "#vrFullScreen" ).on( "click", vrFullScreen );
$( "#vrMatriz" ).on( "click", {name: "Matriz"}, verModulos );
$( "#vrTapete" ).on( "click", {name: "Tapete"}, verModulos );
$( "#vrBotonera" ).on( "click", {name: "Botonera"}, verModulos );
$( "#vrConsola" ).on( "click", {name: "Consola"}, verModulos );
$( "#vrStats" ).on( "click", verStats );
$( "#modalStats .printStats" ).on( "click", printStats );

// Editar carta
$( "#modalEditarCarta input" ).on( "keyup", editarCodigoCarta );
$( "#modalEditarCarta .btnAplicar" ).on( "click", editarCartaAplicar );

// Cambiar nombre del archivo modalScreen
$( "#nombreImagenBaraja" ).on( "change", cambiarNombreArchivo );

// Entrar comando en consola
 $('#consolaInput').keydown(function(event){  
       var keycode = (event.keyCode ? event.keyCode : event.which);  
      // ENTER
      if(keycode == '13'){
          
           inputConsola();
           comandoHistorialN = 0;
      } else {
        // FLECHA DE ARRIBA
        if (keycode == '38'){ 
            if (comandosHistorial.length != 0){
            var regresivo = comandosHistorial.length - comandoHistorialN;
            
                if (regresivo > 0){
                    
                    $("#consolaInput").val(comandosHistorial[regresivo-1]);
                    comandoHistorialN++;
                    
                }
            return false;

            }
        } else {
            // Flecha abajo
            if (keycode = '40'){
            
                if (comandosHistorial.length != 0){
                var regresivo = comandosHistorial.length - comandoHistorialN + 2;
                    
                    if (regresivo < comandosHistorial.length + 1) {
                    
                    $("#consolaInput").val(comandosHistorial[regresivo-1]);
                    comandoHistorialN--;
    
                    }
                }
            }
        }
      }
 });  

// Inicia el barajador
function iniciar(){

    // Desactivar el menú contextual del navegador
    document.oncontextmenu = function(){return false;}
    
    
    // ¿Había una baraja abierta en la sesión?
    if ( sessionStorage.getItem("baraja_autosave") ) {
        baraja = abrirSesion("baraja_autosave");
        baraja = baraja.split(",");
        abreBaraja();
    }else{

        ordenar4Kings();
    }
    
    // Carga las preferencias guardadas
    if ( localStorage.getItem("tapete_fondo") ) {
        var tapete_fondo = abrirLocal("tapete_fondo");
        $('#colorTapete').val(tapete_fondo);
        $('#tapeteFondo').css('background-color',tapete_fondo);
    }
    
    if ( localStorage.getItem("tapete_textura") ) {
        var tapete_textura = abrirLocal("tapete_textura");
        $('#texturaTapete').val(tapete_textura);
        $('#tapeteFondo').css('background-image',"url('img/table/"+ tapete_textura + ".png')");
    }
    
    if ( localStorage.getItem("consola_fondo") ) {
        var consola_fondo = abrirLocal("consola_fondo");
        $('#colorConsola').val(consola_fondo);
        $('#consola').css('background',consola_fondo);        
    }
    
    if ( localStorage.getItem("consola_texto") ) {
        var consola_texto = abrirLocal("consola_texto");
        $('#colorConsolaTexto').val(consola_texto);
        $('#consola').css('color',consola_texto);
        
    }
    
    if ( localStorage.getItem("consola_fuente") ) {
        var consola_fuente = abrirLocal("consola_fuente");
        $('#fuenteConsola').val(consola_fuente);
        $('#consola').css('font-family',consola_fuente);
    }
    
    if ( localStorage.getItem("consola_fuenteSize") ) {
        var consola_fuenteSize = abrirLocal("consola_fuenteSize");
        $('#fuenteConsolaSize').val(consola_fuenteSize);
        $('#consola').css('font-size',consola_fuenteSize+'pt');
    }
    
    if($.support.fullscreen){
        // Show the full screen button
        $("#liFullScreen").show();
    }
    
    
    
}

iniciar();

// Ordenar Bicycle
function ordenarBicycle(){
    baraja = "AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AT,2T,3T,4T,5T,6T,7T,8T,9T,10T,JT,QT,KT,KD,QD,JD,10D,9D,8D,7D,6D,5D,4D,3D,2D,AD,KP,QP,JP,10P,9P,8P,7P,6P,5P,4P,3P,2P,AP";
    baraja = baraja.split(",");
    abreBaraja();
}

// Ordenar Solo Aces
function ordenarSoloAces(){
    baraja = "AT,AC,AP,AD,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X";
    baraja = baraja.split(",");
    abreBaraja();
}

function ordenarRosarioEightKings(){
    baraja = "8P,KC,3T,10D,2P,7C,9T,5D,QP,4C,AT,6D,JP,8C,KT,3D,10P,2C,7T,9D,5P,QC,4T,AD,6P,JC,8T,KD,3P,10C,2T,7D,9P,5C,QT,4D,AP,6C,JT,8D,KP,3C,10T,2D,7P,9C,5T,QD,4P,AC,6T,JD";
    baraja = baraja.split(",");
    consola('"Eight Kings threatened to save ninety-five ladies for one sick knave"')
    abreBaraja();
}

function ordenar4Kings(){
    baraja = "AT,2T,3T,4T,5T,6T,7T,8T,9T,10T,JT,QT,KT,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AP,2P,3P,4P,5P,6P,7P,8P,9P,10P,JP,QP,KP,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD";
    baraja = baraja.split(",");
    abreBaraja();
}

function ordenarRosarioDixRois(){
    baraja = "10P,8C,KT,9D,JP,AC,7T,QD,10C,8T,KD,9P,JC,AT,7D,QP,10T,8D,KP,9C,JT,AD,7P,QC,10D,8P,KC,9T,JD,AP,7C,QT";
    baraja = baraja.split(",");
    consola('"Dix huit Rois ne valent pas sept Dames"')
    abreBaraja();
}

function ordenarRosarioUnusQuinque(){
    baraja = "AP,5C,9T,JD,6P,4C,2T,KD,7P,8C,QT,3D,10P,AC,5T,9D,JP,6C,4T,2D,KP,7C,8T,QD,3P,10C,AT,5D,9P,JC,6T,4D,2P,KC,7T,8D,QP,3C,10T,AD,5P,9C,JT,6D,4P,2C,KT,7D,8P,QC,3T,10D";
    baraja = baraja.split(",");
    consola('"Unus quinque noven fámulus sex quatuor duo Rex septem acto faemina trina decem"')
    abreBaraja();
}

function ordenarRosario18Reyes(){
    baraja = "10P,8C,KT,7D,2P,3C,AT,4D,9P,QC,6T,JD,5P,10C,8T,KD,7P,2C,3T,AD,4P,9C,QT,6D,JP,5C,10T,8D,KP,7C,2T,3D,AP,4C,9T,QD,6P,JC,5T,10D,8P,KC,7T,2D,3P,AC,4T,9D,QP,6C,JT,5D";
    baraja = baraja.split(",");
    consola('"18 Reyes sentados entre las 49 damas se van al cine"')
    abreBaraja();
}


// Ordenar Mnemónica
function ordenarMnemonica(){
    baraja = "4T,2C,7D,3T,4C,6D,AP,5C,9P,2P,QC,3D,QT,8C,6P,5P,9C,KT,2D,JC,3P,8P,6C,10T,5D,KD,2T,3C,8D,5T,KP,JD,8T,10P,KC,JT,7P,10C,AD,4P,7C,4D,AT,9T,JP,QD,7T,QP,10D,6T,AC,9D";
    baraja = baraja.split(",");
    abreBaraja();
}

// Ordenar personalizadamente
function ordenarPersonal(){
    baraja = $("#ordenPersonal").val(); 
    baraja = baraja.split(",");
    abreBaraja();
}
// Función de Renderización
function abreBaraja(){
     
    var contenido = '<ul class="baraja" id="naipes">';
    var rotulos = '';

    for (var i = 0;i < baraja.length;i++){
        contenido = contenido + '<li><a class="naipe" id="naipe' + i + '" onmousedown="javascript:cartaActual('+i+')"><div class="rotulo">' + (i+1) + '</div></a></li>';
        
    }
    contenido = contenido + '</ul>';
    
    
    $("#tapete").html(contenido);
    
    contenido = '<ul class="paqueteBaraja" id="paqueteNaipes">';
    var naipeeBorde;
    
    for (var i = 0;i < baraja.length;i++){
        
        if (i % 2 == 0){
            naipeBorde = "borBlanco"
        }else{
            naipeBorde = "borGris"
        }
        
        contenido = contenido + '<li id="naipe' + i + '"><a class="paqueteNaipe ' + naipeBorde + '" onmousedown="javascript:mostrarCorte('+(baraja.length-i)+');"></a></li>';
        
        
    }
    contenido = contenido + '</ul>';
    
    
    $("#moduloPaquetes").html(contenido);
    renderizar();
    
}

function sfFisherYates() {
    var barajaTemp = baraja.slice();
    var n = baraja.length;
    var i;
    baraja = [];
  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    baraja.push(barajaTemp.splice(i, 1)[0]);
  }
    
  renderizar();
  consola("fisherYates");
}

// Algoritmo de Durstenfeld
function sfDurstenfeld() {
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
        "n": baraja.length,
        "min": 0,
        "max": (baraja.length-1),
        "replacement": false,
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

function sfNumeroAleatorio(){
var barajaTemp = baraja.slice();
    
    var apiUrl = "http://numero-aleatorio.com/generadores/servicio-json/?desde=0&hasta=" + (baraja.length-1) + "&numero=" + baraja.length + "&repeticion=0&json=0"
        
    $.getJSON(apiUrl, function(contenido){
        consola(contenido)
    
      //  for (var i = 0; i < baraja.length ; i++){
    //        baraja[i] = barajaTemp[body.result.random.data[i]]
    //    }
        
      //  renderizar();
    //    consola("numero-aleatorio.com");
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
function sfInvertir(cantidad){
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || cantidad >= baraja.length){

        baraja.reverse();
        consola("invertir");
        renderizar();
        
    } else {
        if (cantidad > 0){
        
        consola("invertir("+cantidad+")");
        var paqueteA = baraja.slice(0,cantidad);
        var paqueteB = baraja.slice(cantidad);
        paqueteA = paqueteA.reverse()
        baraja = paqueteA.concat(paqueteB);
        renderizar();
            
    } else {
        if (cantidad < 0){
            
            consola("invertir("+cantidad+")");
            cantidad = baraja.length + parseInt(cantidad);
            var paqueteA = baraja.slice(0,cantidad);
            var paqueteB = baraja.slice(cantidad);
            paqueteB = paqueteB.reverse();
            baraja = paqueteA.concat(paqueteB);
            renderizar();
            
        } else {
            consola(cantidad + " no es un argumento válido.");
        }
    }
        }
    
}

// MEZCLA = OVERHAND
function sfOverhand(){
 //   alert("MEZCLA EN LAS MANOS")
}

// MEZCLA =  FARO EXT
function sfFaroExt(cantidad){
    var desde = 0;
    var barajaTemp = baraja.slice();
    //alert(typeof cantidad);
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= baraja.length || !cantidad){
        cantidad = baraja.length;
        consola("faroExt");
        
    } else if (typeof cantidad == "number"){
        consola("faroExt("+cantidad+")");
    
    }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = baraja.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezccla
    for (var i = 0; i < cantidad ;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                baraja[(2*i) % (cantidad-1) + desde] = barajaTemp[i + desde]
            }       
        }else{
            baraja[(2*i) % cantidad + desde] = barajaTemp[i + desde]
        }
    }
    renderizar();
}

// MEZCLA =  FARO INT
function sfFaroInt(cantidad){
    var desde = 0;
    var barajaTemp = baraja.slice();
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= baraja.length || !cantidad){
        cantidad = baraja.length;
        consola("faroInt");
    } else {
        consola("faroInt("+cantidad+")");
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = baraja.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            baraja[(2*i+1) % (cantidad+1) + desde] = barajaTemp[i + desde]
        }else{
            baraja[(2*i+1) % (cantidad) + desde] = barajaTemp[i + desde]
        }
    }
    renderizar();
}

// MEZCLA =  ANTIFARO EXT
function sfAntiFaroExt(cantidad){
    var desde = 0;
    var barajaTemp = baraja.slice();
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= baraja.length || !cantidad){
        cantidad = baraja.length;
        consola("antiFaroExt");
    } else {
        consola("antiFaroExt("+cantidad+")");
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = baraja.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                baraja[i + desde] = barajaTemp[(2*i) % (cantidad-1) + desde]
            }       
        }else{
            baraja[i + desde] = barajaTemp[(2*i) % cantidad + desde]
        }
    }
    renderizar();
}

// MEZCLA =  ANTIFARO INT
function sfAntiFaroInt(cantidad){
    var desde = 0;
    var barajaTemp = baraja.slice();
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= baraja.length || !cantidad){
        cantidad = baraja.length;
        consola("antiFaroInt");
    } else {
        consola("antiFaroInt("+cantidad+")");
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = baraja.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            baraja[i + desde] = barajaTemp[(2*i+1) % (cantidad+1) + desde]
        }else{
            baraja[i + desde] = barajaTemp[(2*i+1) % (cantidad) + desde]
        }
    }
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
    $("#matriz").attr("value", baraja);
    $("#ordenPersonal").val(baraja);
    
    // Renderiza el tapete
    for (var i = 0;i < baraja.length;i++){
        $("#naipe"+i).css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + baraja[i] + '.png)');
    }

    guardarSesion("baraja_autosave",baraja.toString());
}

// Ver Modulos
function verModulos(event){
    
    mModulo = "txtVer" + event.data.name;
    xModulo = "#modulo" + event.data.name;
    
    // Muestra el módulo seleccionado
    if( document.getElementById(mModulo).className == vrChck0 ){
         
        document.getElementById(mModulo).className = vrChck1;
        $(xModulo).css('display', 'block');
        
        // Si se muestra la consola darle foco al input
        if (event.data.name == "Consola"){
            
            $("#consolaInput").focus();
            
        }
        
    // Oculta el módulo seleccionado
    }else{
        
        document.getElementById(mModulo).className = vrChck0;
        $(xModulo).css('display', 'none');
    }
}
// Input a consola
function inputConsola(){
    var txtOrden = $("#consolaInput").val();
    comandosHistorial.push(txtOrden);
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
    
    var argAbre = texto.indexOf("(");
    var argCierra = texto.indexOf(")");
    var argumento = "";

    if (argAbre != -1 ){
        
        if (argAbre == 0) {consola("Sintáxis no válida")}
        argumento = parseInt(texto.substring(argAbre+1,argCierra));
        texto = texto.substring(0,argAbre);
    }
    
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
            case "limpiar":
            case "clear":
            {
            // Limpiar consola
                $("#consolaOutput").text("");
                return;
            }
            case "recargar":
            case "refresh":
                refresh();
                return;
            case "historial":
                historial();
                return;
            case "cortar":
                sfCortar(argumento);
                return;
            case "invertir":
            {
                sfInvertir(argumento);
                return;
            }
            case "eliminar":
                eliminarCartaX(argumento);
                return;
            case "fisheryates":
            {
                sfFisherYates();
                return;
            }
            case "durstenfeld":
            {
                sfDurstenfeld();
                return;
            }
            case "sattolo":
            {
                sfSattolo();
                return;
            }
            case "randomorg":
            {
                sfRandomOrg();
                return;
            }
            case "faroext":
            {
                sfFaroExt(argumento);
                return;
            }
            case "faroint":
            {
                sfFaroInt(argumento);
                return;
            }
            case "antifaroext":
            {
                sfAntiFaroExt(argumento);
                return;
            }
            case "antifaroint":
            {
                sfAntiFaroInt(argumento);
                return;
            }
            case "generarqr":
            {
                generarQrConsola();
                return;
            }
            case "screenshot":
            {
                screenshotConsola;
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
    var strBaraja = baraja.toString();
    // var strBaraja16 = LZString.compressToUTF16(strBaraja);
    
    $("#imagenQr").attr('src', urlApi + strBaraja);
    $("#modalQr #descargar").attr('href', urlApi + strBaraja);
    $("#modalQr").modal();
    
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function generarQrConsola(){
    qrSize = 250;
    urlApi = "https://api.qrserver.com/v1/create-qr-code/?size=" + qrSize + "x" + qrSize + "&data=";
    consola("Código QR generado, descárguelo haciendo <a href='" + urlApi + baraja +"' download='barajaQr.png'>click aquí</a>.")
}

function screenshot(){
    html2canvas($("#moduloTapete"), {
        onrendered: function(canvas) {
            var screenS = new Image();
            
            screenS = canvas.toDataURL("image/png");
            screenS = screenS.replace("image/png", "image/octet-stream");
            
            $("#imagenScreen").attr('src', screenS);
            $("#modalScreen #descargar").attr('href', screenS);
            $("#modalScreen").modal();

        }
    });
}

function cambiarNombreArchivo(){
     $("#modalScreen #descargar").attr('download', $("#modalScreen input").val()+".png");
}

function screenshotConsola(){
    html2canvas($("#moduloTapete"), {
        onrendered: function(canvas) {
            var screenS = new Image();
            screenS = canvas.toDataURL("image/png");
            screenS = screenS.replace("image/png", "image/octet-stream");
            consola("Imagen generada. Haga <a href=" + screenS + " download='" + $("#modalScreen input").val()+".png" + "'>click aquí</a> para descargar");

        }
    });
}

function cambiarColorTapete(){
    var color = $('#colorTapete').val();
    $('#tapeteFondo').css('background-color',color);
    guardarLocal("tapete_fondo",color);
}

function cambiarTexturaTapete(){
    var tapete_textura = $('#texturaTapete').val();
    $('#tapeteFondo').css('background-image',"url('img/table/"+ tapete_textura + ".png')");
    guardarLocal("tapete_textura",tapete_textura);
}

$( "#mostrarRotulos" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $(".rotulo").css('display', 'table-caption');
   }else{
       $(".rotulo").css('display', 'none');
   }
});

$( "#faroCantidad" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $("#faroCantidadOpciones").collapse('hide');
   }else{
        $("#faroCantidadOpciones").collapse('show');
   }
});

$( "#faroCalidad" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $("#faroCalidadOpciones").collapse('hide');
   }else{
        $("#faroCalidadOpciones").collapse('show');
   }
});

function cambiarColorConsola(){
    var color = $('#colorConsola').val();
    $('#consola').css('background',color);
    guardarLocal("consola_fondo",color);
}

function cambiarColorConsolaTexto(){
    var color = $('#colorConsolaTexto').val();
    $('#consola').css('color',color);
    guardarLocal("consola_texto",color);
}

function cambiarFuenteConsola(){
    var fuente = $('#fuenteConsola').val();
    $('#consola').css('font-family',fuente);
    guardarLocal("consola_fuente",fuente);
    
}

function cambiarFuenteSizeConsola(){
    var fuenteSize = $('#fuenteConsolaSize').val();
    $('#consola').css('font-size',fuenteSize+'pt');
    guardarLocal("consola_fuenteSize",fuenteSize);
    
}

function reiniciarTema(){
    localStorage.removeItem("tapete_fondo");
    localStorage.removeItem("tapete_textura");
    localStorage.removeItem("consola_fondo");
    localStorage.removeItem("consola_texto");
    localStorage.removeItem("consola_fuente");
    localStorage.removeItem("consola_fuenteSize");
    location.reload();
}

// Menú contextual sobre naipe
function cartaActual(carta){
    
        idCartaActual = carta;
   
}

function eliminarCarta(){
    baraja.splice(idCartaActual,1);
    abreBaraja();
    consola("eliminar("+parseInt(idCartaActual+1)+")");
}
function eliminarCartaX(cual){
    if (cual == "") {
        consola("Falta un argumento");
        return;
    } else {
        if (cual > 0) {
            consola("eliminar("+cual+")");
            cual = parseInt(cual) - 1;
        } else {
            if (cual < 0){
                consola("eliminar("+cual+")");
                cual = baraja.length + parseInt(cual);
            } else {
                consola(cual + " no es un argumento válido.");
                return;
            }
        }
        baraja.splice(cual,1);
        abreBaraja();
    }
}

function editarCarta(){
    $("#modalEditarCarta input").val(baraja[idCartaActual])
    $("#modalEditarCarta .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + baraja[idCartaActual] + '.png)');
    $("#modalEditarCarta").modal();
}

function editarCartaAplicar(){
    baraja[idCartaActual] = $("#modalEditarCarta input").val()
    abreBaraja();
    $("#modalEditarCarta").modal('hide');
}

function editarCodigoCarta(){
    $("#modalEditarCarta .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + $("#modalEditarCarta input").val() + '.png)');
}

function sfModalCortar(){
    $("#alNumero").attr('min',-baraja.length+1);
    $("#alNumero").attr('max',baraja.length-1);
    $("#alNumero").val(0);
    $("#modalCortar").modal();
}

function actualizarCorte(){

    mostrarCorte($("#alNumero").val())

}

function mostrarCorte(lugar){
    
    $("#alNumero").val(lugar);
    lugar = baraja.length - lugar;
    
    if (lugar > baraja.length){
        lugar = lugar - baraja.length;
    }
    
    $("#moduloPaquetes #naipe"+lugar).css('margin-top',"-205px");
    
    if (typeof(lugarAnt) != "undefined"){
        if (lugarAnt != lugar){
            
            $("#moduloPaquetes #naipe"+lugarAnt).css('margin-top',"-188px");
        }
    }
    lugarAnt = lugar;
}

function sfCortarMontar(){
    sfCortar(posicion = $("#alNumero").val());
}

function cortarPorAca(){
    sfCortar(idCartaActual);
}

function sfCortar(posicion){
    var paqueteA = baraja.slice(0,posicion);
    var paqueteB = baraja.slice(posicion);
    baraja = paqueteB.concat(paqueteA);
    abreBaraja();
    $("#modalCortar").modal('hide');
    consola("cortar("+posicion+")");
    
}

function historial(){
    for(var i = 0; i < comandosHistorial.length; i++){
        var t = i.toString();
        if (t.length == 2) { t = " " + t + " "};
        if (t.length == 1) { t = "  " + t + " "};
        consola(t + comandosHistorial[i]);
    }
}

function sfRepetir(){
    alert("repite: " + comandosHistorial[comandosHistorial.length - 1]);
    //ejecutarComando(historial[historial.length-1]);
}

function refresh(){
    
    location.reload();
}

function vrFullScreen(){
    
    $('body').fullScreen();
    
}

// GUARDA Y ABRE LOS DATOS DE SESION
function guardarSesion(variable, valor){
    
    var compresion = LZString.compressToUTF16(valor);
    sessionStorage.setItem(variable,compresion);
        
}

function abrirSesion(variable){
    
    var valor = sessionStorage.getItem(variable);
    valor = LZString.decompressFromUTF16(valor);
    return valor;
    
}

// GUARDA Y ABRE LOS DATOS PERSISTENTES
function guardarLocal(variable, valor){
    
    var compresion = LZString.compressToUTF16(valor);
    localStorage.setItem(variable,compresion);
        
}

function abrirLocal(variable){
    
    var valor = localStorage.getItem(variable);
    valor = LZString.decompressFromUTF16(valor);
    return valor;
    
}

function faroShow(){

    $("#modalFaro").modal('show');
    
}

function faroAplicar(){
    
    var mezcla = "sf";
    
    // ¿Faro o AntiFaro?
    if ( $("#faroAntiFaro").bootstrapSwitch('state') ) {
    
        mezcla = mezcla + "Faro";
    
    } else {
        
        mezcla = mezcla + "AntiFaro";
        
    }
    
    // ¿Exterior o Interior?
    if ( $("#faroExtInt").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + "Ext(";
    
    } else {
    
        mezcla = mezcla + "Int(";
        
    }
    
    // ¿Total o parcial?
    if ( $("#faroCantidad").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + baraja.length + ")";
        
    } else {
        var valor = $('#faroParcial').val();
        
        // ¿Desde top o desde bottom?
        if ( !$("#faroTopBotom").bootstrapSwitch('state') ){
            mezcla = mezcla + "-";
        }
        
        mezcla = mezcla + valor + ")";
    }
    
    // Aplica la mezcla
    eval(mezcla);
    $("#modalFaro").modal('hide');
}

function verStats(){
    
    var redond =  7;
    // Permutaciones posibles
    var permutaciones = 1;
    for (var i = 1; i <= baraja.length; i++) {
        permutaciones = permutaciones * i
	}
    
    var ePlus = permutaciones.toString().indexOf("e+") ;

    if (ePlus != -1){
        
        permutaciones = permutaciones.toString();
        var permutacionesBase = permutaciones.substring(0,ePlus);
        var permutacionesPotencia = permutaciones.substring(ePlus+2,permutaciones.length);
        permutacionesBase = redondeo(permutacionesBase,redond);

        permutaciones = permutacionesBase +  " x10 <sup>" + permutacionesPotencia + "</sup>";
        
    }
        
    // Mezclas riffle necesaria para desordenar la baraja
    var mezclasNecesarias = (Math.log(baraja.length) / Math.log(2))*1.5;
    mezclasNecesarias = redondeo(mezclasNecesarias,redond);
    
    // Adivinaciones probables
    var adivinacionesProbables = 0;
    for (var i = 1; i<=baraja.length;i++){
    
        adivinacionesProbables = adivinacionesProbables + 1 / i;
    }
    
    var adivinacionesPorcentaje = adivinacionesProbables * 100 / baraja.length;
    adivinacionesPorcentaje = redondeo(adivinacionesPorcentaje,2);
    adivinacionesProbables = redondeo(adivinacionesProbables,redond);
    
    $("#modalStats .barajaMatriz").html(baraja.join(", "));
    $("#modalStats .cantidad").html(baraja.length);
    $("#modalStats .permutaciones").html(baraja.length + "! = " + permutaciones);
    $("#modalStats .mezclasNecesarias").html("<sup>3</sup>&frasl;<sub>2</sub> log<sub>2</sub>" + baraja.length + " = " + mezclasNecesarias);
    $("#modalStats .adivinacionesProbables").html("<sup>1</sup>&frasl;<sub>1</sub> + <sup>1</sup>&frasl;<sub>2</sub> + ... + <sup>1</sup>&frasl;<sub>" + baraja.length + "</sub> = " + adivinacionesProbables);
    $("#modalStats .adivinacionesPorcentaje").html(adivinacionesPorcentaje + "%");
    
    
}

function printStats(){

    $(".printable").print();
    
}

function redondeo(numero,decimales){

    var numeroRedondo = Math.round(numero * Math.pow(10,decimales)) / Math.pow(10,decimales);
    
    if (numero != numeroRedondo){
        numeroRedondo = numeroRedondo + "..."
    }
    
    return numeroRedondo;
    
}
