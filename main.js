//Inicializa las variables globales
var imgDeck = "wiki2";
var vrChck0 = "glyphicon glyphicon-unchecked";
var vrChck1 = "glyphicon glyphicon-check";
var clip;
var posCartaActual;
var lugarAnt;
var JsonApi = new RandomJs();
var comandosHistorial = [];
var comandoHistorialN = 0;
var ordenI;
var stkName;
var stkImg;
var stkFaces;
var stkNumbers;
var datosSlots;
// Inicia el menu de herramientas

// Menu HELP

// Barra de notificaciones
$( "#barraTop .notificaciones .close" ).on( "click", function(){$("#barraTop .notificaciones").collapse('hide'); });
$( "#modalAbrirOrdenacion .notificaciones .close" ).on( "click", function(){$("#modalAbrirOrdenacion .notificaciones").collapse('hide'); });
$( "#modalOrdenPersonal .notificaciones .close" ).on( "click", function(){$("#modalOrdenPersonal .notificaciones").collapse('hide'); });
$( "#modalPreferencias .notificaciones .close" ).on( "click", function(){$("#modalPreferencias .notificaciones").collapse('hide'); });

// Menu: Baraja
$( "#orden4Kings" ).on( "click", abreDefault );
$( ".reiniciarPosiciones" ).on( "click", reiniciarPosiciones);
$( "#abrirOrdenPersonal" ).on( "click", ordenarPersonal);
$( ".mnuGenerarQr" ).on( "click", generarQr );
$( "#mnuGuardarImagen" ).on( "click", screenshot );
//$( "#descargar" ).on( "click", function(){ notificar('Ya se está descargando el archivo "' + $("#descargar").attr("download") + '". ' + txtDescargas,"success") } );
$( "#ordenBaraja" ).on( "change", infoBaraja );
$( "#ordenPalos .bselect" ).on( "change", ordenPalos );
$( "#abrirStack" ).on( "click", abrirStack );
$( ".mnuGuardar").on( "click", modalGuardar );
$( "#slots").on( "change", infoSlot) ;
$( "#guardarBaraja").on( "click", guardarBaraja) ;

$( ".reiniciarPosiciones" ).on( "click", reiniciarPosiciones);

//$( "#bjAjustes" ).on( "click", bjAjustes );
$( "#colorTapete" ).on( "change", cambiarColorTapete );
$( "#texturaTapete" ).on( "change", cambiarTexturaTapete );
$( "#colorConsola" ).on( "change", cambiarColorConsola );
$( "#colorConsolaTexto" ).on( "change", cambiarColorConsolaTexto );
$( "#fuenteConsola" ).on( "change", cambiarFuenteConsola );
$( "#reiniciarTema" ).on( "click", reiniciarTema );
$( "#fuenteConsolaSize" ).on( "change", cambiarFuenteSizeConsola );
$( "#relativasTipo" ).on('switchChange.bootstrapSwitch', mostrarRotulos);
$( "#mostrarRotulos" ).on('switchChange.bootstrapSwitch', mostrarRotulos);
$( "#unoceroRotulos" ).on('switchChange.bootstrapSwitch', mostrarRotulos);

$( "#sfRepetir" ).on( "click", sfRepetir );
$( ".sfInvertir" ).on( "click", sfInvertir );

// Cortar
$( ".sfCut" ).on( "click", sfModalCortar );
$( ".btnMontar" ).on( "click", sfCortarMontar );
$( "#alNumero" ).on( "change", actualizarCorte );
$( ".alCrimp select" ).on( "change", actualizarCorteCrimp );

// Aleatoriedad
$( ".sfFisherYates" ).on( "click", sfFisherYates );
$( ".sfDurstenfeld" ).on( "click", sfDurstenfeld );
$( ".sfSattolo" ).on( "click", sfSattolo );
$( ".sfRandomOrg" ).on( "click", sfRandomOrg );
$( ".sfNumeroAleatorio" ).on( "click", sfNumeroAleatorio );

// Faros
$( ".sfFaroExt" ).on( "click", sfFaroExt);
$( ".sfFaroInt" ).on( "click", sfFaroInt );
$( ".sfAntiFaroExt" ).on( "click", sfAntiFaroExt );
$( ".sfAntiFaroIn" ).on( "click", sfAntiFaroInt );
$( "#modalFaro .btnAplicar" ).on( "click", faroAplicar );
$( ".sfFaroAv" ).on( "click", faroShow );

// otras mezclas
$( ".sfMilk" ).on("click", sfMilk);
$( ".sfMongeDown" ).on("click", sfMongeDown);
$( ".sfCato" ).on( "click", catoShow );
$( ".sfDud" ).on( "click", sfDud );
$( ".sfAntiDud" ).on( "click", sfAntiDud );
$( ".sfUdd" ).on( "click", sfUdd );
$( ".sfAntiUdd" ).on( "click", sfAntiUdd );

$( "#modalCato .btnAplicar" ).on( "click", catoAplicar );

// Otras cosas
$( ".vrOrden").on("click", obtenerOrden);
//$( "#click-to-copy").on("click", copiarOrden);

// Inversores
$( ".saberMas" ).on( "click", saberMas );

// Menu: Ver Check / UnCheck
$( "#vrRefresh" ).on( "click", refresh );
$( "#vrFullScreen" ).on( "click", vrFullScreen );
$( "#vrMatriz" ).on( "click", {name: "Matriz"}, verModulos );
$( "#vrBotonera" ).on( "click", {name: "Botonera"}, verModulos );
$( "#mostrarConsola" ).on('switchChange.bootstrapSwitch', {name: "Consola"}, verModulos );
$( "#vrStats" ).on( "click", verStats );
$( ".printStats" ).on( "click", printStats );
$( ".helpStats" ).on( "click", helpStats );
$('#modalStats').on('hidden.bs.modal', function () {closeHelpStats();})
$( "#modalStats td" ).on( "click", clickTdStats );

// Editar carta
$( "#modalEditarCarta .editarCodigoCara" ).on( "keyup", mostrarPreviewCarta );
$( "#modalEditarCarta .editarCodigoDorso" ).on( "keyup", mostrarPreviewCarta );
$( "#modalEditarCarta .editarVer" ).on('switchChange.bootstrapSwitch', mostrarPreviewCarta);
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
    // Carga variables según el navegador
    
    // Chrome Chrome 1+
    if (!!window.chrome){
        txtDescargas = ' Presiona <b>Ctrl + J</b> para acceder a las Descargas.';
    }
    
    // Firefox Firefox 1+
    if (typeof InstallTrigger !== 'undefined'){
        txtDescargas = ' Presiona <b>Ctrl + Mayús + Y</b> para acceder a las Descargas.';
    }
    
    // Internet Explorer 6+
    if (/*@cc_on!@*/false || !!document.documentMode){
        txtDescargas = ' Presiona <b>Ctrl + J</b> para acceder a las Descargas.'
    }
    // Safari 3+
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
        txtDescargas = ' Presiona <b>Ctrl + J</b> para acceder a las Descargas.'
    }
    
    // Opera 8+
    if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
        txtDescargas = ' Presiona <b>⌘ + Alt + L</b> para acceder a las Descargas.'
    }
    
    
    // Desactivar el menú contextual del navegador
    document.oncontextmenu = function(){return false;}
    
    
    // ¿Había una baraja abierta en la sesión?
    if ( sessionStorage.getItem("baraja_autosave") ) {
        barajaActual = new EyDeck(abrirSesion("baraja_autosave"));
        var posicionesActuales = abrirSesion("baraja_posiciones_autosave").split(",");
        
        for (var i=0;i<barajaActual.deck.length;i++){
        
            barajaActual.deck[i].id = parseInt(posicionesActuales[i]);
            
        }
        
        abreBaraja();
        
    }else{
    
        abreDefault();
    }
    
    // Carga las preferencias guardadas
    if ( localStorage.getItem("tapete_fondo") ) {
        var tapete_fondo = abrirLocal("tapete_fondo");
        $('#colorTapete').val(tapete_fondo);
        $('body').css('background-color',tapete_fondo);
    }
    
    if ( localStorage.getItem("tapete_textura") ) {
        var tapete_textura = abrirLocal("tapete_textura");
        $('#texturaTapete').val(tapete_textura);
        $('body').css('background-image',"url('img/table/"+ tapete_textura + ".png')");
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
    
    // iniciar los BootstrapSwitch
    $(function(argument) {
      $.fn.bootstrapSwitch.defaults.onText = 'SI';
      $.fn.bootstrapSwitch.defaults.offText = 'NO'; 
      $.fn.bootstrapSwitch.defaults.size = 'mini';
      $.fn.bootstrapSwitch.defaults.handleWidth = 49;
      $('[type="checkbox"]').bootstrapSwitch();
      
    })
    
     // Crea los elementos bselect
    $("#ordenBaraja").bselect();
    $("#ordenPalos select").bselect({ searchInput : false });
    
    // Habilita la función de copiado al portapapeles
    zeroClip();
    
    // Show the full screen button
    if($.support.fullscreen){
        $("#liFullScreen").show();
    }
    
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    
}

iniciar();

// Ordenar personalizadamente
function ordenarPersonal(){
    
    var oP = $("#ordenPersonal").val().trim();
    
    if (oP == ""){
        
        notificar("La baraja debe tener al menos una carta.","warning","#modalOrdenPersonal");
        return false;
    }
    barajaActual = new EyDeck(oP); 
    abreBaraja();
}

function reiniciarPosiciones(){
    barajaActual.refreshOrder();
    consola('reiniciar');
    abreBaraja();
}

// Función de Renderización
function abreBaraja(){
     
    var contenido = '<ul class="baraja" id="naipes">';
    var rotulos = '';

    for (var i = 0;i < barajaActual.deck.length ;i++){
        contenido = contenido + '<li id="'+i+'"><a class="naipe" id="naipe' + i + '" onmousedown="javascript:cartaActual('+i+')"><div class="rotulo">'+(barajaActual.deck[i].id+1)+'</div></a></li>';
        
    }
    contenido = contenido + '</ul>';
    
    $("#tapete").html(contenido);
    
    // Simulador de corte
    contenido = '<ul class="paqueteBaraja" id="paqueteNaipes">';
    var naipeeBorde;
    
    for (var i = 0;i < barajaActual.deck.length ;i++){
        
        if (i % 2 == 0){
            naipeBorde = "borBlanco"
        }else{
            naipeBorde = "borGris"
        }
        
        contenido = contenido + '<li id="naipe' + i + '"><a class="paqueteNaipe ' + naipeBorde + '" onmousedown="javascript:mostrarCorte('+(barajaActual.deck.length-i)+');"></a></li>';
        
    }
    contenido = contenido + '</ul>';
    
    if ($("#mostrarRotulos").bootstrapSwitch('state')){
        $(".rotulo").css('display', 'table-caption');
    }else{
        $(".rotulo").css('display', 'none');
    };
    
    $("#moduloPaquetes").html(contenido);
    renderizar();
    
}

function sfFisherYates() {
   
    var salida = barajaActual.fisherYates();
    renderizar();
    consola(salida);
}

// Algoritmo de Durstenfeld
function sfDurstenfeld() {

    var salida = barajaActual.durstenfeld();
    renderizar();
    consola(salida);
    
}

// Algoritmo Sattolo
function sfSattolo() {
    
    var salida = barajaActual.sattolo();
    renderizar();
    consola(salida);
}

// RANDOM.ORG
$("#customApiKeyRandom").val("2dbcb5c9-d4f8-4d19-b1f1-cd5cf3980e97");
comprobarApiRandom();

function sfRandomOrg(){
disButtons(true);
var barajaTemp = barajaActual.deck.slice();

    var result = JsonApi
    .apikey($("#customApiKeyRandom").val())
    .method('generateIntegers')
    .params({
        "n": barajaActual.deck.length,
        "min": 0,
        "max": (barajaActual.deck.length-1),
        "replacement": false,
    })
    .post(function(xhrOrError, stream, body) {
        
        for (var i = 0; i < barajaActual.deck.length ; i++){
            barajaActual.deck[i] = barajaTemp[body.result.random.data[i]]
        }
        
        comprobarApiRandom(body.result.requestsLeft, body.result.bitsLeft);
        renderizar();
        consola("radomOrg");
        disButtons(false);
        
    });
}

function sfNumeroAleatorio(){
var barajaTemp = barajaActual.deck.slice();
    
    var apiUrl = "http://numero-aleatorio.com/generadores/servicio-json/?desde=0&hasta=" + (barajaActual.deck.length-1) + "&numero=" + barajaActual.deck.length + "&repeticion=0&json=0"
        
    $.getJSON(apiUrl, function(contenido){
        consola(contenido)
    
      //  for (var i = 0; i < barajaActual.deck.length ; i++){
    //        barajaActual.deck[i] = barajaTemp[body.result.random.data[i]]
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
    
        var salida = barajaActual.invertir(cantidad);
        renderizar();
        consola(salida);
    
}

// MEZCLA = OVERHAND
function sfOverhand(){
 //   alert("MEZCLA EN LAS MANOS")
}

// MEZCLA =  FARO EXT
function sfFaroExt(cantidad){
    
    var salida = barajaActual.faroExt(cantidad);
    renderizar();
    consola(salida);

}

// MEZCLA =  FARO INT
function sfFaroInt(cantidad){

    var salida = barajaActual.faroInt(cantidad);
    renderizar();
    consola(salida);
    
}

// MEZCLA =  ANTIFARO EXT
function sfAntiFaroExt(cantidad){
 
    var salida = barajaActual.antiFaroExt(cantidad);
    renderizar();
    consola(salida);
    
}

// MEZCLA =  ANTIFARO INT
function sfAntiFaroInt(cantidad){

    var salida = barajaActual.antiFaroInt(cantidad);
    renderizar();
    consola(salida);  
}

// Renderiza la baraja
function renderizar(){
     // Calcular órden
        ordenI = [];
        var carlos;
        try{
            
            for (var i = 0;i < barajaActual.deck.length ;i++){
                ordenI[barajaActual.deck[i].id] = i+1;
            } 
            
        } catch( err ) {
            notificar("Se ha producido un Error inesperado. <a href='javascript:location.reload();' class='alert-link'>Recargue</a> para poder continuar usando el programa con normalidad. <code>"+ err+"</code>","fire");
            disButtons(true);
        }finally {
        
        }
        
        $("#vrGraph").attr("href","graficador?orden="+ordenI);
    
    // Renderiza la Matriz v Ascii
    if (true == false){
        
        var contenido = '';
        for (var i = 0; i < barajaActual.deck.length;i++){

            switch(barajaActual.deck[i].charAt(barajaActual.deck[i].length-1)){
                case 'C':
                    contenido = contenido + barajaActual.deck[i].substring(0,barajaActual.deck[i].length-1) + '<big>&spades;</big> ';
                    break;
                case 'H':
                    contenido = contenido + '<font color="#dd0000">' + barajaActual.deck[i].substring(0,barajaActual.deck[i].length-1) + '<big>&hearts;</big></font> ';
                    break
                case 'S':
                    contenido = contenido + barajaActual.deck[i].substring(0,barajaActual.deck[i].length-1) + '<big>&clubs;</big> ';
                    break;
                case 'D':
                    contenido = contenido + '<font color="#dd0000">' + barajaActual.deck[i].substring(0,barajaActual.deck[i].length-1) + '<big>&diams;</big></font> ';
                    break;
                default:
                    contenido = contenido + barajaActual.deck[i]        
            }

        } 
        document.getElementById("matrizAscii").innerHTML = contenido;

    
    }
    
    // Renderiza la Matriz
    var matrizFace = barajaActual.getMatriz("face",",");
    $("#matriz").attr("value", matrizFace);
    $("#ordenPersonal").val(matrizFace);
    

    // Renderiza el tapete
    for (var i = 0;i < barajaActual.deck.length;i++){
        $("#naipe"+i).css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(i) + '.png)');
    }
    
    mostrarRotulos();
    
    guardarSesion("baraja_autosave",matrizFace);
    guardarSesion("baraja_posiciones_autosave",barajaActual.getMatriz("id",","));
    reordenable();
        
}

function reordenable(){

$("#naipes").sortable({
                opacity: 1,
                revert: 700,
                placeholder: "naipe-vacio",
                scroll: false,
                grid: [ 17, 1 ],
                cursorAt: { left: 8, top:8},
			    update: function(){
				var ordenElementos = $("#naipes").sortable("toArray");
                var numero;
                for (var i = 0; i < barajaActual.deck.length; i++){
                    numero = parseInt(ordenElementos[i]);
                    if (i !== numero && (i+1) !== numero){
                        barajaActual.move(numero,i);
                        consola("#"+(numero+1)+" > #"+(i+1))
                        abreBaraja();
                        break;
                    }
                }
                
			    }
			});
}

// Ver Modulos
function verModulos(event){
    
    mModulo = "txtVer" + event.data.name;
    xModulo = "#modulo" + event.data.name;
    
        if (event.data.name == "Consola"){
    
            if ($("#mostrarConsola").bootstrapSwitch('state')){
                $("#consolaInput").focus();
                $(xModulo).collapse("show");
                $(".setConsola").collapse("show");
            } else {
                $(xModulo).collapse("hide");
                $(".setConsola").collapse("hide");
            }
            return;
        }
    // Muestra el módulo seleccionado
    if( document.getElementById(mModulo).className == vrChck0 ){
         
        document.getElementById(mModulo).className = vrChck1;
        $(xModulo).collapse("show");
        
    // Oculta el módulo seleccionado
    }else{
        
        document.getElementById(mModulo).className = vrChck0;
        $(xModulo).collapse("hide");
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

                    repetirComando(txtComando[0].trim(),txtComando[1]);
                    
                }
            }else if (txtComando.length = 1){
                
                ejecutarComando(txtComando[0].trim());
            }
    }
}

// repite el comando según el multiplicador
function repetirComando(comando, multipicador){

    for (var i = 0; i < multipicador ;i++){
        ejecutarComando(comando);
    }
    
}

function ejecutarComando(texto){

    var argAbre = texto.indexOf("(");
    var argCierra = texto.indexOf(")");
    var argumento = "";

    if (argAbre != -1 ){
        
        if (argAbre == 0) {consola("Sintáxis no válida")}
        argumento = texto.substring(argAbre+1,argCierra);
        texto = texto.substring(0,argAbre);
    }
    
    switch (texto) {
            case "help":
            case "ayuda":
                consola('Haga <a href="docs" target="_blank">click aquí</a> acceder a la ayuda.');
                return;
            case "version":
                consola('Barajador v0.1 (beta)');
                return;
            case "nueva":
            case "new":
                abreDefault();
                return;
            case "clear":
            case "clr":
                $("#consolaOutput").text("");
                return;
            case "recargar":
            case "refresh":
                refresh();
                return;
            case "orden":
                obtenerOrden();
                return;
            case "reiniciar":
                reiniciarPosiciones();
                return;
            case "historial":
            case "hist":
                historial();
                return;
            case "cortar":
            case "cut":
                sfCortar(argumento);
                return;
            case "voltear":
            case "turn":
                sfVoltearEstas(argumento);
                consola("turn("+argumento+")");
                renderizar();
                return;
            case "invertir":
            case "inv":
                sfInvertir(argumento);
                return;
            case "eliminar":
            case "del":
                eliminarCartaX(argumento);
                return;
            case "fisheryates":
                sfFisherYates();
                return;
            case "durstenfeld":
                sfDurstenfeld();
                return;
            case "sattolo":
                sfSattolo();
                return;
            case "randomorg":
                sfRandomOrg();
                return;
            case "milk":
            case "alfa":
            case "klondike":
                sfMilk();
                return;
            case "mongueDown":
                sfMongeDown();
                return;
            case "australiana":
            case "downunderdeal":
            case "dud":
                sfDud();
                return;
            case "antiaustraliana":
            case "antidownunderdeal":
            case "-dud":
                sfAntiDud();
                return;
            case "faroext":
            case "fo":
                sfFaroExt(argumento);
                return;
            case "faroint":
            case "fi":
                sfFaroInt(argumento);
                return;
            case "antifaroext":
            case "-fo":
                sfAntiFaroExt(argumento);
                return;
            case "antifaroint":
            case "-fi":
                sfAntiFaroInt(argumento);
                return;
            case "generarqr":
            case "qr":
                generarQrConsola();
                return;
            case "screenshot":
            case "shot":
                screenshotConsola;
                return;
            case "":
                return;
            default:
                consola(texto + ": No se encontró la orden");
                return;
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
    var strBaraja = barajaActual.getMatriz("face",",");
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
    consola("Código QR generado, descárguelo haciendo <a href='" + urlApi + barajaActual.getMatriz("face",",") +"' download='barajaQr.png'>click aquí</a>.")
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
            consola("Imagen generada. Haga <a href='" + screenS + "' download='" + $("#modalScreen input").val()+".png" + "' target='_blank'>click aquí</a> para descargar");

        }
    });
}

function cambiarColorTapete(){
    var color = $('#colorTapete').val();
    $('body').css('background-color',color);
    guardarLocal("tapete_fondo",color);
}

function cambiarTexturaTapete(){
    var tapete_textura = $('#texturaTapete').val();
    $('body').css('background-image',"url('img/table/"+ tapete_textura + ".png')");
    guardarLocal("tapete_textura",tapete_textura);
}

$( "#mostrarAyudas" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $('.botonera [data-toggle="popover"]').popover({
        placement: "top",
        html: true,
        container: 'body'});
   }else{
       $('.botonera [data-toggle="popover"]').popover('destroy');
   }
});

// Crea los elementos popover
    
    
    
function mostrarRotulos(){

var relativo;
var inicia;
    
    mostrarRotulos
    if($("#unoceroRotulos").bootstrapSwitch('state')){
        inicia = 1;
    } else {
        inicia = 0;
    }
        
    if($("#mostrarRotulos").bootstrapSwitch('state')){
        
        $(".setRotulos").collapse("show");
        
        for (var i = 0;i < barajaActual.deck.length;i++){

            relativo = (barajaActual.deck[i].id+inicia);

            // ¿Decimal o Binario?
            if(!$("#relativasTipo").bootstrapSwitch('state')){

                relativo = (relativo.toString(2)); 
                relativo = relativo.split("");
                relativo = "<table><tr><td>" + relativo.join("<br>") + "</td></tr></table>";

            }

            $("#naipe"+i + " .rotulo").html((i+inicia)+"<hr>"+relativo);
        }
     
        $(".rotulo").css('display', 'table-caption');
        
    } else {
    
        $(".rotulo").css('display', 'none');
        $(".setRotulos").collapse("hide");
    }
}

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
    notificar("Se han restaurado los valores por defecto. <a href='javascript:location.reload();' class='alert-link'>Recargue</a> para aplicar los cambios","success","#modalPreferencias")
}

// Menú contextual sobre naipe
function cartaActual(carta){
    
        posCartaActual = carta;
   
}

function eliminarCarta(){
    barajaActual.deck.splice(posCartaActual,1);
    abreBaraja();
    consola("eliminar("+parseInt(posCartaActual+1)+")");
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
                cual = barajaActual.deck.length + parseInt(cual);
            } else {
                consola(cual + " no es un argumento válido.");
                return;
            }
        }
        barajaActual.deck.splice(cual,1);
        abreBaraja();
    }
}

function editarCarta(){
    $("#modalEditarCarta .posicion").html(" #" + (barajaActual.deck[posCartaActual].id+1));
    $("#modalEditarCarta .editarCodigoCara").val(barajaActual.deck[posCartaActual].face);
    $("#modalEditarCarta .editarCodigoDorso").val(barajaActual.deck[posCartaActual].back);
    $("#modalEditarCarta .editarVer").bootstrapSwitch('state', barajaActual.deck[posCartaActual].canSee);
    $("#modalEditarCarta .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(posCartaActual) + '.png)');
    $("#modalEditarCarta .editarPosicion").val(posCartaActual+1);
    $("#modalEditarCarta .editarPosicion").attr("max",barajaActual.deck.length+1);
    $("#modalEditarCarta .editarCrimp").bootstrapSwitch('state', barajaActual.deck[posCartaActual].crimp);
    $("#modalEditarCarta .editarCrimpTopBottom").bootstrapSwitch('state', !barajaActual.deck[posCartaActual].crimpB);
    
    if (barajaActual.deck[posCartaActual].crimpTag == ""){
        
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $("#modalEditarCarta .editarCrimpTag").val(letras.split("")[barajaActual.getCrimps().length]);
        
    } else {
    
        $("#modalEditarCarta .editarCrimpTag").val(barajaActual.deck[posCartaActual].crimpTag);
    }
    
    $("#modalEditarCarta").modal();
}

function mostrarPreviewCarta(){
    if ($( "#modalEditarCarta .editarVer" ).bootstrapSwitch('state')){
        var preview = $("#modalEditarCarta .editarCodigoCara").val();
    }else {
        var preview = $("#modalEditarCarta .editarCodigoDorso").val();
    }
    $("#modalEditarCarta .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + preview + '.png)');

}

$( "#modalEditarCarta .editarCrimp" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
       $( "#modalEditarCarta .editarCrimpTipo" ).collapse('show');
       
       
   }else{
       $( "#modalEditarCarta .editarCrimpTipo" ).collapse('hide');
   }
});


function editarCartaAplicar(){
    
    barajaActual.deck[posCartaActual].face = $(".editarCodigoCara").val();
    barajaActual.deck[posCartaActual].back = $(".editarCodigoDorso").val();
    barajaActual.deck[posCartaActual].canSee = $(".editarVer").bootstrapSwitch('state');
    barajaActual.deck[posCartaActual].crimp = $(".editarCrimp").bootstrapSwitch('state');
    barajaActual.deck[posCartaActual].crimpB = !$(".editarCrimpTopBottom").bootstrapSwitch('state');
    barajaActual.deck[posCartaActual].crimpTag = $(".editarCrimpTag").val();
    
    var posNueva = ($("#modalEditarCarta .editarPosicion").val()-1);
    
    if (posCartaActual != posNueva){

        consola(barajaActual.deck[posCartaActual].face + " > " + posNueva);
        barajaActual.move(posCartaActual,posNueva);
        
    }
    
    renderizar();
    $("#modalEditarCarta").modal('hide');
}

function sfModalCortar(){
    
    $("#alNumero").attr('min',-barajaActual.deck.length+1);
    $("#alNumero").attr('max',barajaActual.deck.length-1);
    $("#alNumero").val(0);
    
    var crimps = barajaActual.getCrimps();
    var opciones = "";
    for (var i = 0; i < crimps.length; i++){
    
        var posicion = crimps[i];
        if (barajaActual.deck[crimps[i]].crimpB){
            posicion++;
        }
        opciones += "<option value="+posicion+">" + barajaActual.deck[crimps[i]].crimpTag + "</option>";
        
    }
    $(".alCrimp select").html(opciones);
    $("#modalCortar .alNumeroCrimp").bootstrapSwitch('state', true);
    
    $("#moduloPaquetes #naipe"+lugarAnt).css('margin-top',"-188px");
    $("#modalCortar").modal();
}

$( "#modalCortar .alNumeroCrimp" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
       $( "#modalCortar .alCrimp" ).collapse('hide');
       $( "#modalCortar .alNumeroError" ).collapse('show');
       
   }else{
       mostrarCorte($(".alCrimp select").val());
       $( "#modalCortar .alCrimp" ).collapse('show');
       $( "#modalCortar .alNumeroError" ).collapse('hide');
   }
});

function actualizarCorte(){

    mostrarCorte($("#alNumero").val());

}

function actualizarCorteCrimp(){
    
    
    mostrarCorte($(".alCrimp select").val());
    
}

function mostrarCorte(lugar){
    
    $("#alNumero").val(lugar);
    lugar = barajaActual.deck.length - lugar;
    
    if (lugar > barajaActual.deck.length){
        lugar = lugar - barajaActual.deck.length;
    }
    
    $("#moduloPaquetes #naipe"+lugar).css('margin-top',"-205px");
    
    if (typeof(lugarAnt) != "undefined"){
        if (lugarAnt != lugar){
            
            $("#moduloPaquetes #naipe"+lugarAnt).css('margin-top',"-188px");
        }
    }
    lugarAnt = lugar;
}

function sfCortar(numero){
    var salida = barajaActual.cortar(numero);
    renderizar();
    consola(salida);
    
}

function sfCortarMontar(){
    
    if($( "#modalCortar .alNumeroCrimp" ).bootstrapSwitch('state') && parseInt($(".alNumeroError input").val()) !== 0){
    
    $("#modalDesarrollarFeature").modal();
    return;
    }
    
    var salida = barajaActual.cortar($("#alNumero").val());
    $("#modalCortar").modal('hide');
    renderizar();
    consola(salida);
}

function cortarPorAca(){
    var salida = barajaActual.cortar(posCartaActual);
    renderizar();
    consola(salida);
}

function voltearEsta(){
    barajaActual.turnOver(posCartaActual);
    consola("turn("+(posCartaActual+1)+")");
    renderizar();
}

function sfVoltearEstas(argumento){
    
    var nums = argumento.split(",");
    
    if (nums.length != 1){
     
        for (var i=0; i < parseInt(nums[1]); i++){
            
            barajaActual.turnOver(parseInt(nums[0])-1+i);
            
        }
        
    }else{
        barajaActual.turnOver(parseInt(nums[0])-1);
    }
    
}

function moverATop(){
    consola(barajaActual.deck[posCartaActual].face + " > Top");
    barajaActual.toTop(posCartaActual);
    renderizar();
}

function moverABottom(){
    consola(barajaActual.deck[posCartaActual].face + " > Bottom");
    barajaActual.toBotom(posCartaActual);
    renderizar();  
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

function catoShow(){
    
    var cantPar = Math.floor(barajaActual.deck.length/2)*2;
    
    $("#catoCutCant").attr("max", barajaActual.deck.length );
    $("#catoCutCant").val(cantPar/2);
    $(".turnNum").attr("max",  cantPar);
    $("#catoTurnDesde").attr("max", cantPar );
    $("#catoTurnHasta").attr("max", cantPar );
    $("#catoTurnHasta").val(Math.floor(cantPar/8)*2);
    
    $("#modalCato").modal();
    
}

$( "#catoCut" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $("#modalCato .cantidadOpciones").collapse('hide');
   }else{
        $("#modalCato .cantidadOpciones").collapse('show');
   }
});

$( "#catoTurn" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $("#modalCato .turnOpciones").collapse('hide');
        $(".turnNum").removeAttr("disabled");
   }else{
       $(".turnNum").attr("disabled","disabled");
       $("#modalCato .turnOpciones").collapse('show');
   }
});

function catoAplicar(){
    var j = $("#modalCato .multiplicador").val();
    var cortarX;
    var voltearX;
    var txtMezcla
    for (var i=0;i<j;i++){
        
        // CUT
        txtMezcla = "Se ha hecho una Mezcla Cato cortando ";
        if( $("#catoCut").bootstrapSwitch('state') ) {
            
            cortarX = Math.floor(Math.random()*(barajaActual.deck.length));
            txtMezcla += "librente";
            
        } else {

            if ($("#catoTopBotom").bootstrapSwitch('state')){
            
                cortarX = $("#catoCutCant").val();
                txtMezcla += cortarX + " cartas desde TOP";
                
            } else {
            
                cortarX = $("#catoCutCant").val();
                txtMezcla += cortarX + " cartas desde BOTTOM";
                cortarX = "-" + cortarX;
                
            }
            
        }
        
        // AND TURN
        txtMezcla += " y dando vuelta ";
        if( $("#catoTurn").bootstrapSwitch('state') ) {
            
            voltearX = $("#modalCato .turnNum").val();
            txtMezcla += voltearX + " cartas ";
            
        } else {
            var desde = parseInt($("#catoTurnDesde").val());
            var hasta = parseInt($("#catoTurnHasta").val())+2;
            voltearX = (Math.floor(Math.random()* ((hasta - desde)/2))*2)+desde;
            txtMezcla += "de " + desde + " a " + hasta + " cartas ";
        }
        
        barajaActual.cortar(cortarX);
        barajaActual.invertir(voltearX);
        sfVoltearEstas("1,"+voltearX);
        consola("cato("+cortarX+","+voltearX+")");
    }
    
    if (j == 1 || isNaN(j)){
        txtMezcla += "una vez.";
    } else {
        txtMezcla += j + " veces.";
    }
    
    notificar(txtMezcla,"success");
    renderizar();
    $("#modalCato").modal('hide');
}

function faroShow(){
    
    $("#faroParcial").attr("max", barajaActual.deck.length );
    $("#faroParcial").val(barajaActual.deck.length);
    $("#modalFaro").modal('show');
    
}

$( "#faroCantidad" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $("#modalFaro .cantidadOpciones").collapse('hide');
   }else{
        $("#modalFaro .cantidadOpciones").collapse('show');
   }
});

$( "#faroCalidad" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $(".calidadOpciones").collapse('hide');
   }else{
        $(".calidadOpciones").collapse('show');
   }
});

function faroAplicar(){
    
    // ¿Faro o AntiFaro?
    if ( $("#faroAntiFaro").bootstrapSwitch('state') ) {
    
        var mezcla = "faro";
        var txtMezcla = "Faro";
        
    } else {
        
        var mezcla = "antifaro";
        var txtMezcla = "Antifaro";
        
    }
    
    // ¿Exterior o Interior?
    if ( $("#faroExtInt").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + "ext(";
        txtMezcla += " Exterior";
        
    } else {
    
        mezcla = mezcla + "int(";
        txtMezcla += " Interior";
        
    }
    
    // ¿Total o parcial?
    if ( $("#faroCantidad").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + barajaActual.deck.length;
        txtMezcla += ".";

    } else {
        var valor = $('#faroParcial').val();
        
        // ¿Desde top o desde bottom?
        if ($("#faroTopBotom").bootstrapSwitch('state') ){
            txtMezcla += " de las primeras ";
        } else {
            mezcla = mezcla + "-";
            txtMezcla += " de las últimas ";
        }
        
        txtMezcla += valor + " cartas."
        mezcla = mezcla + valor + ")";
    }
    
    // ¿Hay multiplicador?
        var veces = $("#modalFaro .multiplicador").val();
    if ( veces == 1 || !isNaN(valor) ) {
        
        ejecutarComando(mezcla);
        txtMezcla = "Se ha hecho una mezcla " + txtMezcla;
    } else {
        
        repetirComando(mezcla,veces);
        txtMezcla = "Se ha hecho " + veces + " mezclas " + txtMezcla;
    }
    
    notificar(txtMezcla,'success');
    $("#modalFaro").modal('hide');
    
}

function verStats(){
    
    var redond =  7;
    // Permutaciones posibles
    var permutaciones = 1;
    for (var i = 1; i <= barajaActual.deck.length; i++) {
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
    var mezclasNecesarias = (Math.log(barajaActual.deck.length) / Math.log(2))*1.5;
    mezclasNecesarias = redondeo(mezclasNecesarias,redond);
    
    // Adivinaciones probables
    var adivinacionesProbables = 0;
    for (var i = 1; i<=barajaActual.deck.length;i++){
    
        adivinacionesProbables = adivinacionesProbables + 1 / i;
    }
    
    var adivinacionesPorcentaje = adivinacionesProbables * 100 / barajaActual.deck.length;
    adivinacionesPorcentaje = redondeo(adivinacionesPorcentaje,2);
    adivinacionesProbables = redondeo(adivinacionesProbables,redond);
    
    var faroTotal = barajaActual.deck.length;
    
    if (isOdd(barajaActual.deck.length)){
        faroTotal++;
    }
    var j = productoCiclos(ordenI);
    var s = [];
    // Crea el producto de los ciclos de las permutaciones
    var prodCiclos = "";
    for (i=0;i<j.length;i++){
        prodCiclos += "(" + j[i].join(" ") + ")";
        
        s[i] = j[i].length
        
    }
    
    var ordenCiclos = "λ₍<sub>n</sub>₎=(" + partition(s,true).join("+") + ")";
    
    $("#modalStats .barajaMatriz").html("["+barajaActual.getMatriz("face",", ")+"]");
    $("#modalStats .cantidad").html("n = " + barajaActual.deck.length+"<sub>10</sub> = "+barajaActual.deck.length.toString(2)+"<sub>2</sub>");
    $("#modalStats .permutaciones").html("n! = " + permutaciones);
    $("#modalStats .mezclasNecesarias").html("= " + mezclasNecesarias);
    $("#modalStats .adivinacionesProbables").html("= " + adivinacionesProbables);
    $("#modalStats .adivinacionesPorcentaje").html(adivinacionesPorcentaje + "%");
    $("#modalStats .farosOutOrdenan").html("= "+mOrder(2,faroTotal-1));
    $("#modalStats .farosIntOrdenan").html("= "+mOrder(2,faroTotal+1));
    $("#modalStats .barajaPermutaciones").html("P = ("+ordenI.join(" ")+")");
    $("#modalStats .descompCiclica").html("C<sub>P</sub> = "+prodCiclos);
    $("#modalStats .ordenCiclos").html(ordenCiclos);
    $("#modalStats .periodoPermutacion").html("m.c.m("+delDuplicates(s,true).join(",")+") = " + lcm(s));
    
}

function printStats(){

    $(".printable").print();
    
}

function helpStats(){

    $('#modalStats [data-toggle="popover"]').popover({
        placement: "auto",
        html: true,
        container: 'body',
        trigger: 'click'
    });
    
    $('#modalStats td').addClass("statAyuda");
    
   
}

function clickTdStats(){

    if($('#modalStats td').hasClass("statAyuda")){
        closeHelpStats();
        helpStats();  
        $(this).popover('show')
    }
    
}

function closeHelpStats(){
    
    $('#modalStats [data-toggle="popover"]').popover('destroy');    
    $('#modalStats td').removeClass("statAyuda");
    
}

function redondeo(numero,decimales){

    var numeroRedondo = Math.round(numero * Math.pow(10,decimales)) / Math.pow(10,decimales);
    
    if (numero != numeroRedondo){
        numeroRedondo = numeroRedondo + "..."
    }    
    return numeroRedondo;
    
}

// Mezcla Alfa
function sfMilk(){

    var salida = barajaActual.milk();
    renderizar();
    consola(salida);
    
}

// Mezcla Monge
function sfMongeDown(){

    var salida = barajaActual.mongeDown();
    renderizar();
    consola(salida);
}

function sfDud(){

    var salida = barajaActual.downUnderDeal();
    renderizar();
    consola(salida);
}

function sfAntiDud(){

    var salida = barajaActual.antiDownUnderDeal();
    renderizar();
    consola(salida);
}

function sfUdd(){

    var salida = barajaActual.underDownDeal();
    renderizar();
    consola(salida);
}

function sfAntiUdd(){

    var salida = barajaActual.antiUnderDownDeal();
    renderizar();
    consola(salida);
}

function obtenerOrden(){

    consola(ordenI);
}

function saberMas(){

}

// Actualiza la descripción de
function infoBaraja(){
   var stack = $("#ordenBaraja").val();
   $.getJSON("stacks/"+stack+".json", function(datos) {
       $("#barajaDesc div").html( datos["description"] );
    
        stkName =  datos["name"];
        stkImg = datos["image"];
        stkFaces = datos["faces"];
        stkNumbers = datos["numbers"];
    
        if (typeof stkImg === 'undefined'){
            
            $("#barajaImg").css("display","none");
            
        } else {
            
            $("#barajaImg").css('background-image',"url('stacks/"+ stkImg["path"]+"')");
            $("#barajaImg").css("width", stkImg["width"] + "px");
            $("#barajaImg").css("height", stkImg["height"] + "px");
            $("#barajaImg").css("background-size", stkImg["width"] + "px " + stkImg["height"] + "px");
            $("#barajaImg").css("display","block");
        }
       
       if (typeof stkFaces !== 'undefined'){
           $("#ordenPalos").css("display","none");
           $("#barajaPref #orden").val(stkFaces);
           
       } else {
           if (typeof stkNumbers !== 'undefined'){
               ordenPalos;
               $("#ordenPalos").css("display","block");
               $("#barajaPref #orden").val(stkNumbers);
           }
       }

    });
    
}

function ordenPalos(){
    var ordPalos = $("#ordenPalos .bselect").val();
    var ordTemp = stkNumbers.split(",");
    
    if(stkName == "Four Kings"){
        
        var j=0
        for (var i=0;i<ordTemp.length;i++){
            ordTemp[i]=ordTemp[i]+ordPalos.charAt(j);
            if (i%13 == 12){
            j++
            }
        }
        
    } else {
    
        for (var i=0;i<ordTemp.length;i++){
            ordTemp[i]=ordTemp[i]+ordPalos.charAt(i%4);
        }
    }
    
    
    $("#barajaPref #orden").val(ordTemp);
}

function abrirStack(){
    
    if ($("#barajaPref #orden").val() == '') {
    
        notificar("¡No se ha seleccionado ninguna ordenación!","warning","#modalAbrirOrdenacion");
        
    } else {
        
        if(typeof stkNumbers !== 'undefined' && $("#ordenPalos .bselect").val() == '') {
            
            notificar("¡No se ha seleccionado ninguna rotación de palos!","warning","#modalAbrirOrdenacion");
            
        } else {
            $("#modalAbrirOrdenacion .alert").collapse("hide");
            $("#modalAbrirOrdenacion").modal('hide');
            barajaActual = new EyDeck($("#barajaPref #orden").val());
            abreBaraja();
        }
                  
    }
}

// Abre una baraja desde el stack JSON
function abreDefault() {
        
barajaActual = new EyDeck("AT,2T,3T,4T,5T,6T,7T,8T,9T,10T,JT,QT,KT,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AP,2P,3P,4P,5P,6P,7P,8P,9P,10P,JP,QP,KP,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD"); 
    abreBaraja(); 
    consola('nueva');
        
}

function notificar(texto,tipo,lugar){
    
    if (typeof lugar === "undefined"){
        lugar = "#barraTop";
    }
    
    $(lugar+" .notificaciones .alert").removeClass("alert-success alert-warning alert-info alert-danger");
    $(lugar+" .notificaciones .glyphicon").removeClass("glyphicon-ok-sign glyphicon-info-sign glyphicon-exclamation-sign glyphicon-remove-sign glyphicon-fire")
    
    switch (tipo){
            case "success":
                $(lugar+" .notificaciones .alert").addClass("alert-success");
                $(lugar+" .notificaciones .glyphicon").addClass("glyphicon-ok-sign");
            break;
            case "warning":
                $(lugar+" .notificaciones .alert").addClass("alert-warning");
                $(lugar+" .notificaciones .glyphicon").addClass("glyphicon-exclamation-sign");
            break;
            case "danger":
                $(lugar+" .notificaciones .alert").addClass("alert-danger");
                $(lugar+" .notificaciones .glyphicon").addClass("glyphicon-remove-sign");
            break;
             case "fire":
                $(lugar+" .notificaciones .alert").addClass("alert-danger");
                $(lugar+" .notificaciones .glyphicon").addClass("glyphicon-fire");
            break;
            
            case "info":
            default:
                $(lugar+" .notificaciones .alert").addClass("alert-info");
                $(lugar+" .notificaciones .glyphicon").addClass("glyphicon-info-sign");
    }
    $(lugar+" .notificaciones").collapse('show');
    $(lugar+" .notificaciones .texto").html(texto);
    
    var tiempoNot = $("#notificationTime").val()*1000;
    if (tiempoNot != 0){
        setTimeout(function(){ $(lugar+" .notificaciones").collapse('hide'); }, tiempoNot);
    }
   
}

function modalGuardar(){
   
   $.getJSON("decks/index.json", function(datos) {
    
   var htmlSlots = "<option value=''></option>"
   
   for (var i=0; i<4;i++){
   
       htmlSlots += "<option value='" + i + "'>"+(i+1)+") ";
       
       if (datos[i]["name"] == ""){
       
           htmlSlots += " vacío...";
           
       } else {
       
           htmlSlots += datos[i]["name"];
               
       }
       
       htmlSlots += "</option>";
       datosSlots = datos;
   }
   
   $("#slots").html(htmlSlots)
   $("#slots").bselect({ searchInput : false });
       
   });
    
   $("#modalGuardar").modal("show");
}

function infoSlot(){

  var i = parseInt($('#slots :selected').val());
  
  $("#deckName input").val(datosSlots[i]["name"]);
    
  $("#deckName").collapse("show");
}

function guardarBaraja(){
    var nombreProp = $("#deckName input").val().trim();
    
    if (nombreProp == "" ){
    
    alert("no puede ser vacío");
        
    return false;
        
    }
    
    if (datosSlots[i]["name"] != ""){
    
    alert("¿Estás seguro?");
    return false;
    
    }
    
    var i = parseInt($('#slots :selected').val());
    datosSlots[i]["name"] = $("#deckName input").val();
        
    // Guarda el index: Decks
    var fileNombre = "index";
    var myString = 'data='+JSON.stringify(datosSlots)+"&name="+fileNombre;  //converts json to string and prepends the POST variable name
    $.ajax({
       type: "POST",
       url: "save.php", //the name and location of your php file
       data: myString,      //add the converted json string to a document.
       success: function() {} //just to make sure it got to this point.
    });
    
    fileNombre = "deck"+i;
    myString = 'data='+JSON.stringify(barajaActual)+"&name="+fileNombre;  //converts json to string and prepends the POST variable name
    $.ajax({
       type: "POST",
       url: "save.php", //the name and location of your php file
       data: myString,      //add the converted json string to a document.
       success: function() {
           notificar('¡Se ha guardado "' + datosSlots[i]["name"] + '" exitosamente!','success');
       } //just to make sure it got to this point.
    });
    
    
    return false;  //prevents the page from reloading. this helps if you want to bind this whole process to a click event.
    
}

function disButtons(estado){

    $(".btn.btn-primary").prop("disabled",estado);
    
}

// ZeroClipboard
function zeroClip() {
    clip = new ZeroClipboard.Client();
    clip.setHandCursor( true );
    clip.addEventListener('load', function (client) {
        //notificar("Flash movie loaded and ready.");
    });

    clip.addEventListener('mouseOver', function (client) {
        
        clip.setText( $('#matriz').val() );
        //notificar("Clip set: "+ $('#matriz').val());
    });

    clip.addEventListener('complete', function (client, text) {
        //notificar("Matriz copiada al portapepeles","success");
    });

    clip.glue( 'click-to-copy', 'copy-container' );
}