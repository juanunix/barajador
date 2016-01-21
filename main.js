//Inicializa las variables globales
var imgDeck = "bicycle";
var imgType = "png";
var imgDorso = "DA";
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
var stkPrev;
var stkFaces;
var stkNumbers;
var datosSlots;
var repasoSeg = 3000;

// Barra de notificaciones
$( "#barraTop .notificaciones .close" ).on( "click", function(){$("#barraTop .notificaciones").collapse('hide'); });
$( "#modalAbrirStack .notificaciones .close" ).on( "click", function(){$("#modalAbrirStack .notificaciones").collapse('hide'); });
$( "#modalOrdenPersonal .notificaciones .close" ).on( "click", function(){$("#modalOrdenPersonal .notificaciones").collapse('hide'); });
$( "#modalPreferencias .notificaciones .close" ).on( "click", function(){$("#modalPreferencias .notificaciones").collapse('hide'); });
// Menu: Baraja
$( "#orden4Kings" ).on( "click", abreDefault );
$( ".reiniciarPosiciones" ).on( "click", reiniciarPosiciones);
$( "#abrirOrdenPersonal" ).on( "click", ordenarPersonal);
$( ".mnuGenerarQr" ).on( "click", generarQr );
$( "#mnuGuardarImagen" ).on( "click", screenshot );
//$( "#descargar" ).on( "click", function(){ notificar('Ya se está descargando el archivo "' + $("#descargar").attr("download") + '". ' + txtDescargas,"success") } );
// Abrir bajara
$( "#modalAbrirDeck .selectBaraja" ).on( "change", infoBaraja );
$( "#modalAbrirDeck .btnAbrir" ).on( "click", abrirBaraja );
// Abrir ordenación
$( "#modalAbrirStack .selectBaraja" ).on( "change", infoStack );
$( "#modalAbrirStack .ordenPalos .bselect" ).on( "change", ordenPalos );
$( "#modalAbrirStack .btnAbrir" ).on( "click", abrirStack );

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
$( "#setVolumen" ).on('slide', setVolumen);
$( "#setSeparac" ).on('slide', setSeparac);

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
$( ".sfOmega" ).on("click", sfOmega);
$( ".sfMongeDown" ).on("click", sfMongeDown);
$( ".sfMongeUp" ).on("click", sfMongeUp);
$( ".sfCato" ).on( "click", catoShow );
$( ".sfDud" ).on( "click", sfDud );
$( ".sfAntiDud" ).on( "click", sfAntiDud );
$( ".sfUdd" ).on( "click", sfUdd );
$( ".sfAntiUdd" ).on( "click", sfAntiUdd );
$( ".sfRiffle" ).on( "click", sfRiffle );
$( ".sfAntiRiffle" ).on( "click", sfAntiRiffle );

$( ".sfSeparaRojasNegras" ).on( "click", sfSeparaRojasNegras );
$( ".sfSeparaNegrasRojas" ).on( "click", sfSeparaNegrasRojas );

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
$( "#modalEditarAgregar .editarCodigoCara" ).on( "keyup", mostrarPreviewCarta );
$( "#modalEditarAgregar .editarCodigoDorso" ).on( "keyup", mostrarPreviewCarta );
$( "#modalEditarAgregar .editarVer" ).on('switchChange.bootstrapSwitch', mostrarPreviewCarta);
$( "#modalEditarAgregar .btnAplicar" ).on( "click", editarAgregarAplicar );
// Cambiar nombre del archivo modalScreen
$( "#nombreImagenBaraja" ).on( "change", cambiarNombreArchivo );
$( ".comingSoon" ).on( "click", comingSoon );
$( "#estMemo" ).on( "click", estudiarOrden );
$( "#btnRepasa" ).on( "click", btnRepasar );
$( ".btn.ant" ).on( "click", estudiarAnt );
$( ".btn.sig" ).on( "click", estudiarSig );
$( "#play.btn" ).on( "click", estudiarPlay );
$( "#stop.btn" ).on( "click", estudiarStop );
$( ".volver" ).on( "click", estudiarVolver );
$( ".sonido" ).on( "click", toggleSound );
$( "#btnEjercita" ).on( "click", btnEjercita );

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
function iniciar(){
    
    // Carga las preferencias guardadas
    if ( localStorage.getItem("tapete_fondo") ) {
        var tapete_fondo = abrirLocal("tapete_fondo");
        $('#colorTapete').val(tapete_fondo);
        $('body').css('background-color',tapete_fondo);
    }
    
    if ( localStorage.getItem("tapete_textura") ) {
        var tapete_textura = abrirLocal("tapete_textura");
        $('#texturaTapete').val(tapete_textura);
        $('body').css('background-image',"url('img/backgrounds/"+ tapete_textura + ".png')");
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
    
    if ( localStorage.getItem("imgDeck") ) {
        imgDeck = abrirLocal("imgDeck");
        imgType = abrirLocal("imgType");
    }
    
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
    
    // Desactivar el menú contextual del navegador
    document.oncontextmenu = function(){return false;}
    
    
    // iniciar los Bootstrap
    $(function(argument) {
      $.fn.bootstrapSwitch.defaults.onText = 'SI';
      $.fn.bootstrapSwitch.defaults.offText = 'NO'; 
      $.fn.bootstrapSwitch.defaults.size = 'mini';
      $.fn.bootstrapSwitch.defaults.handleWidth = 49;
      $('[type="checkbox"]').bootstrapSwitch();
      
    })
    
    sndVolume = $('#setVolumen').slider();
    sndSeparac = $('#setSeparac').slider();
     // Crea los elementos bselect
    $(".selectBaraja").bselect();
    $(".selectDorsos").bselect({ searchInput : false });
    $(".selectBaraja").bselect();
    $("#modalAbrirStack .ordenPalos select").bselect({ searchInput : false });
    $(".selectVoz").bselect({ searchInput : false });
    
    // Habilita la función de copiado al portapapeles
    zeroClip();
    
    // Show the full screen button
    if($.support.fullscreen){
        $("#liFullScreen").show();
    }
    
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    
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
    
}
iniciar();

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

$("#customApiKeyRandom").val("2dbcb5c9-d4f8-4d19-b1f1-cd5cf3980e97");
comprobarApiRandom();
function sfFisherYates() {
   
    var salida = barajaActual.fisherYates();
    renderizar();
    consola(salida);
}
function sfDurstenfeld() {

    var salida = barajaActual.durstenfeld();
    renderizar();
    consola(salida);
    
}
function sfSattolo() {
    
    var salida = barajaActual.sattolo();
    renderizar();
    consola(salida);
}
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
    
    notificar("Servicio inactivo por inconvenientes ajenos a nuestra página","warning");
    return;
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

function sfInvertir(cantidad){
    
        var salida = barajaActual.invertir(cantidad);
        renderizar();
        consola(salida);
    
}
function sfOverhand(){
 //   alert("MEZCLA EN LAS MANOS")
}
function sfFaroExt(cantidad){
    
    var salida = barajaActual.faroExt(cantidad);
    renderizar();
    consola(salida);

}
function sfFaroInt(cantidad){

    var salida = barajaActual.faroInt(cantidad);
    renderizar();
    consola(salida);
    
}
function sfAntiFaroExt(cantidad){
 
    var salida = barajaActual.antiFaroExt(cantidad);
    renderizar();
    consola(salida);
    
}
function sfAntiFaroInt(cantidad){

    var salida = barajaActual.antiFaroInt(cantidad);
    renderizar();
    consola(salida);  
}

function renderizar(){
     // Calcular órden
        ordenI = [];
        var carlos;
        try{
            
            for (var i = 0;i < barajaActual.deck.length ;i++){
                ordenI[barajaActual.deck[i].id] = i+1;
            } 
            
        } catch( err ) {
            notificar("Se ha producido un Error inesperado. <a href='javascript:location.reload();' class='alert-link'>Recargue</a> para poder continuar usando el programa con normalidad. <code>"+ err +"</code>","fire");
            alert(barajaActual.getMatriz("face",","));
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
        $("#naipe"+i).css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(i) + '.' + imgType +')');
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
            case "omega":
                sfOmega();
                return;
            case "mongueUp":
                sfMongeUp();
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
            case "riffle":
                sfRiffle();
                return;
            case "antiriffle":
                sfAntiRiffle();
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
            case "separarrojasnegras":
            case "seprb":
            case "seprn":
                sfSeparaRojasNegras();
                return;
            case "separarnegrasrojas":
            case "sepbr":
            case "sepnr":
                sfSeparaRojasNegras();
                return;
            case "leer":
                sonido.playString(barajaActual.get2Bfaces());
                return;
            case "leer stop":
            case "parar lectura":
                sonido.stop();
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
function consola(texto){
    
    document.getElementById("consolaOutput").innerHTML = texto + "\n" + document.getElementById("consolaOutput").innerHTML;
    
}
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
    $('body').css('background-image',"url('img/backgrounds/"+ tapete_textura + ".png')");
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
function agregarCarta(){
    
    $("#modalEditarAgregar h4 .glyphicon").removeClass("glyphicon-edit").addClass("glyphicon-plus");
    $("#modalEditarAgregar h4 .titulo").html(" Agregar carta...");
    $("#modalEditarAgregar .editarCodigoCara").val(barajaActual.deck[posCartaActual].face);
    $("#modalEditarAgregar .editarCodigoDorso").val(barajaActual.deck[posCartaActual].back);
    $("#modalEditarAgregar .editarVer").bootstrapSwitch('state', barajaActual.deck[posCartaActual].canSee);
    $("#modalEditarAgregar .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(posCartaActual) + '.' + imgType+')');
    $("#modalEditarAgregar .editarPosicion").val(posCartaActual+1);
    $("#modalEditarAgregar .editarPosicion").attr("max",barajaActual.deck.length+1);
    $("#modalEditarAgregar .btnAplicar").html('Agregar');
    $("#modalEditarAgregar").modal();
}
function editarCarta(){
    $("#modalEditarAgregar h4 .glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-edit");
    $("#modalEditarAgregar h4 .titulo").html(" Editar carta #" + (barajaActual.deck[posCartaActual].id+1));
    $("#modalEditarAgregar .editarCodigoCara").val(barajaActual.deck[posCartaActual].face);
    $("#modalEditarAgregar .editarCodigoDorso").val(barajaActual.deck[posCartaActual].back);
    $("#modalEditarAgregar .editarVer").bootstrapSwitch('state', barajaActual.deck[posCartaActual].canSee);
    $("#modalEditarAgregar .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(posCartaActual) + '.' + imgType+')');
    $("#modalEditarAgregar .editarPosicion").val(posCartaActual+1);
    $("#modalEditarAgregar .editarPosicion").attr("max",barajaActual.deck.length+1);
    $("#modalEditarAgregar .editarCrimp").bootstrapSwitch('state', barajaActual.deck[posCartaActual].crimp);
    $("#modalEditarAgregar .editarCrimpTopBottom").bootstrapSwitch('state', !barajaActual.deck[posCartaActual].crimpB);
    $("#modalEditarAgregar .btnAplicar").html('Aplicar');
    
    if (barajaActual.deck[posCartaActual].crimpTag == ""){
        
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $("#modalEditarAgregar .editarCrimpTag").val(letras.split("")[barajaActual.getCrimps().length]);
        
    } else {
    
        $("#modalEditarAgregar .editarCrimpTag").val(barajaActual.deck[posCartaActual].crimpTag);
    }
    
    $("#modalEditarAgregar").modal();
}
function mostrarPreviewCarta(){
    if ($( "#modalEditarAgregar .editarVer" ).bootstrapSwitch('state')){
        var preview = $("#modalEditarAgregar .editarCodigoCara").val();
    }else {
        var preview = $("#modalEditarAgregar .editarCodigoDorso").val();
    }
    $("#modalEditarAgregar .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + preview + '.'+imgType+')');

}
$( "#modalEditarAgregar .editarCrimp" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
       $( ".editarCrimpTipo" ).collapse('show');
       
       
   }else{
       $( ".editarCrimpTipo" ).collapse('hide');
   }
});
function editarAgregarAplicar(){
    
    $("#modalEditarAgregar .btnAplicar").prop("disabled",true)
    var cCara = $(".editarCodigoCara").val();
    var cDorso = $(".editarCodigoDorso").val();
    var cCS = $(".editarVer").bootstrapSwitch('state');
    var cCrimpA = $(".editarCrimp").bootstrapSwitch('state');
    var cCrimpB = !$(".editarCrimpTopBottom").bootstrapSwitch('state');
    var cCrimpT = $(".editarCrimpTag").val();
    var posNueva = ($("#modalEditarAgregar .editarPosicion").val()-1);
    
    if( $("#modalEditarAgregar .btnAplicar").html()  == "Aplicar"){
        
        barajaActual.deck[posCartaActual] = {
            "face": cCara,
            "back": cDorso,
            "canSee": cCS,
            "crimp": cCrimpA,
            "crimpB": cCrimpB,
            "crimpTag": cCrimpT
        }
        
        if (posCartaActual != posNueva){

            consola("#"+posCartaActual + " > #" + posNueva);
            barajaActual.move(posCartaActual,posNueva);

        }
        
    } else {
        
        barajaActual.add(posNueva,cCara,cDorso,cCS,cCrimpA,cCrimpB,cCrimpT);
    
    }

    abreBaraja();
    renderizar();
    
    $("#modalEditarAgregar").modal('hide');
    $("#modalEditarAgregar .btnAplicar").prop("disabled",false)
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

function guardarSesion(variable, valor){
    
    var compresion = LZString.compressToUTF16(valor);
    sessionStorage.setItem(variable,compresion);
        
}
function abrirSesion(variable){
    
    var valor = sessionStorage.getItem(variable);
    valor = LZString.decompressFromUTF16(valor);
    return valor;
    
}
function guardarLocal(variable, valor){
    
    var compresion = LZString.compressToUTF16(valor);
    localStorage.setItem(variable,compresion);
        
}
function abrirLocal(variable){
    
    var valor = localStorage.getItem(variable);
    valor = LZString.decompressFromUTF16(valor);
    return valor;
    
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
function faroShow(){
    
    $("#faroParcial").attr("max", barajaActual.deck.length );
    $("#faroParcial").val(barajaActual.deck.length);
    $("#modalFaro").modal('show');
    
}
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
    var factorial = fact(barajaActual.deck.length);
    var ePlus = factorial.toString().indexOf("e+") ;

    if (ePlus != -1){
        
        factorial = factorial.toString();
        var permutacionesBase = factorial.substring(0,ePlus);
        var permutacionesPotencia = factorial.substring(ePlus+2,factorial.length);
        permutacionesBase = redondeo(permutacionesBase,redond);
        factorial = permutacionesBase +  " x10 <sup>" + permutacionesPotencia + "</sup>";
        
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
    $("#modalStats .cantidad").html("n = " + barajaActual.deck.length+"<sub>10</sub> = "+barajaActual.deck.length.toString(2)+"<sub>2</sub> = "+barajaActual.deck.length.toString(4)+"<sub>4</sub>");
    $("#modalStats .permutaciones").html("n! = " + factorial);
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

function sfOmega(){

    var salida = barajaActual.omega();
    renderizar();
    consola(salida);
    
}
function sfMongeDown(){

    var salida = barajaActual.mongeDown();
    renderizar();
    consola(salida);
}
function sfMongeUp(){

    var salida = barajaActual.mongeUp();
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

function sfRiffle(){
    
    var salida = barajaActual.riffle();
    renderizar();
    consola(salida);
}

function sfSeparaRojasNegras(){

    barajaActual.deck = barajaActual.getReds().concat(barajaActual.getBlacks());
    renderizar();
    consola("separaRojasNegras");
    
}

function sfSeparaNegrasRojas(){

    barajaActual.deck = barajaActual.getBlacks().concat(barajaActual.getReds());
    renderizar();
    consola("separaNegrasRojas");
    
}
function sfAntiRiffle(){

    var salida = barajaActual.antiRiffle();
    renderizar();
    consola(salida);
}


function obtenerOrden(){

    consola(ordenI);
}

function saberMas(){

}

// Actualiza la información de la baraja
function infoBaraja(){
    
    
    var deck = $("#modalAbrirDeck .selectBaraja").val();
    $.getJSON("stacks/"+deck+".json", function(datos) {
        
    $("#modalAbrirDeck .barajaDesc div").html( datos["description"] );
    stkPrev = datos["preview"];
    stkImg = datos["images"];
    stkFaces = datos["faces"];
    
    if (typeof stkPrev === 'undefined'){

        $("#modalAbrirDeck .barajaImg").css("display","none");

    } else {

        $("#modalAbrirDeck .barajaImg").css('background-image',"url('stacks/"+ stkPrev["path"]+"')");
        $("#modalAbrirDeck .barajaImg").css("width", stkPrev["width"] + "px");
        $("#modalAbrirDeck .barajaImg").css("height", stkPrev["height"] + "px");
        $("#modalAbrirDeck .barajaImg").css("background-size", stkPrev["width"] + "px " + stkPrev["height"] + "px");
        $("#modalAbrirDeck .barajaImg").css("display","block");
    }
    
    //notificar("ImgDeck: " +stkImg,"warning","#modalAbrirDeck");
    

    });
    
       
}

function abrirBaraja(){

     if ($("#modalAbrirDeck .selectBaraja").val() == '') {
        
        notificar("¡No se ha seleccionado ninguna baraja!","warning","#modalAbrirDeck");
        
    } else {
        
        if (typeof stkImg === 'undefined' || stkImg == 'default'){
            imgDeck = 'cburnett';
            imgType = 'png';
        } else {
            imgDeck = stkImg["path"];
            imgType = stkImg["fileType"];
        }
        
        if($("#modalAbrirDeck .selectDorsos").val() == ''){
            imgDorso = "DA";
        } else {
            imgDorso = $("#modalAbrirDeck .selectDorsos").val();
        }
        
        guardarLocal("imgDeck",imgDeck);
        guardarLocal("imgType",imgType);
        
        $("#modalAbrirDeck .alert").collapse("hide");
        $("#modalAbrirDeck").modal('hide');

        if (!$("#modalAbrirDeck .mantenerOrden").bootstrapSwitch('state')){
            barajaActual = new EyDeck(stkFaces,imgDorso);
            abreBaraja();
        }
        renderizar();
    
    }
}
    
// Actualiza la descripción del Stack
function infoStack(){
    var stack = $("#modalAbrirStack .selectBaraja").val();
    $.getJSON("stacks/"+stack+".json", function(datos) {
       
    $("#modalAbrirStack .barajaDesc div").html( datos["description"] );
    stkName =  datos["name"];
    stkPrev = datos["preview"];
    stkFaces = datos["faces"];
    stkNumbers = datos["numbers"];
       
    if (typeof stkPrev === 'undefined'){

        $("#modalAbrirStack .barajaImg").css("display","none");

    } else {

        $("#modalAbrirStack .barajaImg").css('background-image',"url('stacks/"+ stkPrev["path"]+"')");
        $("#modalAbrirStack .barajaImg").css("width", stkPrev["width"] + "px");
        $("#modalAbrirStack .barajaImg").css("height", stkPrev["height"] + "px");
        $("#modalAbrirStack .barajaImg").css("background-size", stkPrev["width"] + "px " + stkPrev["height"] + "px");
        $("#modalAbrirStack .barajaImg").css("display","block");
    }

   if (typeof stkFaces !== 'undefined'){

       $("#modalAbrirStack .ordenPalos").css("display","none");
       $("#modalAbrirStack .opciones .orden").val(stkFaces);

   } else {

       if (typeof stkNumbers !== 'undefined'){

           $("#modalAbrirStack .ordenPalos").css("display","block");
           $("#modalAbrirStack .opciones .orden").val(stkNumbers);
           ordenPalos();
       }
   }

   });
    
}

function ordenPalos(){
    
    var ordPalos = $("#modalAbrirStack .ordenPalos .bselect").val();
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
    
    
    $("#modalAbrirStack .opciones .orden").val(ordTemp);
}

function abrirStack(){
    
    if ($("#modalAbrirStack .opciones .orden").val() == '') {
        
        notificar("¡No se ha seleccionado ninguna ordenación!","warning","#modalAbrirStack");
        
    } else {
        
        notificar("","","#modalAbrirStack"); // ¿Porqué si comento esta línea se para la ejecución?
        
        if(typeof stkNumbers !== 'undefined' && $("#modalAbrirStack .ordenPalos .bselect").val() == '') {
            
            notificar("¡No se ha seleccionado ninguna rotación de palos!","warning","#modalAbrirStack");
            
        } else {
            $("#modalAbrirStack .alert").collapse("hide");
            $("#modalAbrirStack").modal('hide');
            barajaActual = new EyDeck($("#modalAbrirStack .opciones .orden").val());
            abreBaraja();
        }
                  
    }
}

// Abre una baraja desde el stack JSON
function abreDefault() {
        
barajaActual = new EyDeck("AT,2T,3T,4T,5T,6T,7T,8T,9T,10T,JT,QT,KT,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AP,2P,3P,4P,5P,6P,7P,8P,9P,10P,JP,QP,KP,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD"); 
abreBaraja(); 
        
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

function comingSoon(){
    notificar('Las funciones de "Estudio" estarán disponibles próximamente... habrá que esperar...')
}

function estudiarOrden(){
    estudiarVolver();
    $('#modalEstMemo').modal();
}

function setVolumen(){
    
    var volumen = sndVolume.slider('getValue');
    $('.lblVolumen').html(volumen+"%");
    volumen = Math.log10(sndVolume.slider('getValue')/25);
    sonido.volume(volumen);
}


function setSeparac(){
    
    var separac = sndSeparac.slider('getValue');
    $('.lblSeparac').html(separac+"ms.");
    sonido.sprite()["  "][1] = separac;
}

function btnRepasar(){
    
    var memoOrden;
    var deck = $("#modalEstMemo .selectBaraja").val();
    
    if (deck == ""){
        notificar("¡No puedes estudiar una baraja que no elegiste!","warning","#modalEstMemo");
    }else {
        $("#modalEstMemo .notificaciones").collapse('hide');
        if(deck != "actual"){
            $.getJSON("stacks/"+deck+".json", function(datos) {
            repasaOrden(datos["faces"]);
                });
        } else {

            repasaOrden(barajaActual.getMatriz("face",","));

            }
    }
    
}

function toggleSound(){
    var myButton = $('#modalEstMemo .sonido span');
    
    if(myButton.hasClass("glyphicon-volume-off")){
    
        myButton.removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
        
    }else {
    
        myButton.removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off");
        
    }
}

function estudiarVolver(){
    $('#modalEstMemo .volver').css("display","none");
    $('#modalEstMemo .sonido').css("display","none");
    $("table.memo").css("display","none");
    $(".respasaEjercita").css("display","inline-block");
    
    if (typeof memoRepaso !== 'undefined'){
        clearInterval(memoRepasoLoop);
    }
}

function repasaOrden(baraja){

    barajaMemo = baraja.split(",");
    $("#ordenCara").attr("readonly","readonly");
    $("#ordenNumero").attr("readonly","readonly");
    repasaMostrar(0);
    $(".respasaEjercita").css("display","none");
    $("table.memo").css("display","inline-block");
    $('#modalEstMemo .volver').css("display","inline-block");
    $('#modalEstMemo .sonido').css("display","inline-block");
}

function estudiarAnt(){
    
    estudiarAntPlay();
    if ($("#play").css("display") == "none") {
        clearInterval(memoRepasoLoop);
        memoRepasoLoop = setInterval(estudiarAntPlay,repasoSeg);
    };
}

function estudiarAntPlay(){
    if($("#ordenNumero").val() != 1){

            num = (parseInt($("#ordenNumero").val()) - 2);

        } else {

            num = barajaMemo.length-1;

        }
        repasaMostrar(num);
}

function estudiarSig(){
    
    estudiarSigPlay();
    if ($("#play").css("display") == "none"){
        clearInterval(memoRepasoLoop);
        memoRepasoLoop = setInterval(estudiarSigPlay,repasoSeg);
    }

}

function estudiarSigPlay(){
        var num = parseInt($("#ordenNumero").val()) % barajaMemo.length;
        repasaMostrar(num);
}

function repasaMostrar(id){
    
    if(rdomUnif(1)){
        var bjAzar = "playingarts-1";
        var bjTipo = "png";
    }else{
        var bjAzar = "playingarts-2";
        var bjTipo = "jpg";
    }
    
    $("#ordenNumero").val((id+1));
    $("#ordenCara").val(barajaMemo[id]);
    $(".naipe.big.uno").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaMemo[id] + '.'+imgType+')');
    $(".naipe.big.dos").css('backgroundImage', 'url(img/decks/' + bjAzar + '/' + barajaMemo[id] + '.'+bjTipo+')');
    $(".nombreCarta").html(aTexto(barajaMemo[id]));
    
    if($('#modalEstMemo .sonido span').hasClass("glyphicon-volume-up")){
    
        sonido.playString(("00"+(id+1)).slice(-2) + barajaMemo[id].slice(-2));
    
    }
    
}

function estudiarPlay(){
    
    $("#play").css("display","none");
    estudiarSigPlay();
    memoRepasoLoop = setInterval(estudiarSig,repasoSeg);
    $("#stop").css("display","inline-block");
    
}

function estudiarStop(){
    
    $("#stop").css("display","none");
    clearInterval(memoRepasoLoop);
    $("#play").css("display","inline-block");
    
}

var sonido = new Howl({
  urls: ['audio/miguel.mp3'],
  sprite: {
    'AP': [00000, 1000],'2P': [01289, 1000],'3P': [02703, 1000],'4P': [03980, 1000],
    '5P': [05347, 1100],'6P': [06816, 1000],'7P': [08193, 1200],'8P': [09778, 1000],
    '9P': [11203, 1000],'0P': [12605, 1000],'JP': [14004, 1000],'QP': [15370, 1200],
    'KP': [16875, 1000],'AC': [18179, 1000],'2C': [19541, 1200],'3C': [21043, 1200],
    '4C': [22506, 1200],'5C': [24043, 1200],'6C': [25548, 1200],'7C': [27134, 1300],
    '8C': [28838, 1200],'9C': [30335, 1200],'0C': [31856, 1200],'JC': [33458, 1200],
    'QC': [35001, 1200],'KC': [36671, 1200],'AT': [38187, 1000],'2T': [39290, 1000],
    '3T': [40486, 1000],'4T': [41826, 1000],'5T': [43185, 1000],'6T': [44557, 1000],
    '7T': [45877, 1200],'8T': [47389, 1000],'9T': [48698, 1000],'0T': [50093, 1000],
    'JT': [51476, 1000],'QT': [52769, 1000],'KT': [54176, 1000],'AD': [55281, 1200],
    '2D': [56697, 1200],'3D': [58159, 1200],'4D': [59678, 1300],'5D': [61276, 1200],
    '6D': [62919, 1200],'7D': [64471, 1300],'8D': [66183, 1200],'9D': [67701, 1200],
    '0D': [69288, 1200],'JD': [70954, 1200],'QD': [72495, 1200],'KD': [74093, 1200],
    '01': [75772, 0457],'02': [76296, 0729],'03': [77153, 0700],'04': [77742, 0600],
    '05': [78323, 0700],'06': [78989, 0800],'07': [79734, 0780],'08': [80486, 0760],
    '09': [80986, 0760],'10': [81614, 0700],'11': [82133, 0700],'12': [82680, 0760],
    '13': [83333, 0700],'14': [83967, 0800],'15': [84757, 600],'16': [85300, 1000],
    '17': [86350, 1100],'18': [87412, 900],'19': [88281, 800],'20': [89192, 0700],
    '21': [89823, 850],'22': [90633, 900],'23': [91641, 1000],'24': [92612, 1000],
    '25': [93606, 1100],'26': [94614, 1100],'27': [95836, 1000],'28': [96816, 1000],
    '29': [97673, 1000],'30': [98613, 700],'31': [99278, 800],'32': [100120, 900],
    '33': [101056, 1100],'34': [102134, 1100],'35': [103218, 900],'36': [104242, 1100],
    '37': [105291, 1100],'38': [106374, 900],'39': [107260, 900],'40': [108204, 700],
    '41': [108885, 900],'42': [109767, 1000],'43': [110872, 1100],'44': [112011, 1100],
    '45': [113150, 1100],'46': [114267, 1100],'47': [115475, 1100],'48': [116602, 900],
    '49': [117558, 1100],'50': [118617, 0800],'51': [119379, 1000],'52': [120512, 1200],
    '53': [121669, 1300],'54': [122951, 1200],'J1': [124263, 600],'J2': [124263, 600],
    '  ': [126173, 250]
  }
});