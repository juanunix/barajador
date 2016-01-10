//Inicializa las variables globales
var imgDeck = "wiki";
var imgBack = "bicycle-red";
var vrChck0 = "glyphicon glyphicon-unchecked";
var vrChck1 = "glyphicon glyphicon-check";
var posCartaActual;
var lugarAnt;
var JsonApi = new RandomJs();
var comandosHistorial = [];
var comandoHistorialN = 0;
var ordenI;
var stkImg;
var stkFaces;
var stkNumbers;
// Inicia el menu de herramientas

// Menu HELP

// Menu: Baraja
$( "#orden4Kings" ).on( "click", function(){ abreStack("fourKings") });
$( ".reiniciarPosiciones" ).on( "click", reiniciarPosiciones);
$( "#abrirOrdenPersonal" ).on( "click", ordenarPersonal);
$( ".mnuGenerarQr" ).on( "click", generarQr );
$( "#mnuGuardarImagen" ).on( "click", screenshot );
$( "#ordenBaraja" ).on( "change", infoBaraja );
$( "#ordenPalos .bselect" ).on( "change", ordenPalos );
$( "#abrirStack" ).on( "click", abrirStack );
$( "#modalAbrir .alert .close" ).on( "click", function(){$("#modalAbrir .alert").css("display","none"); });

$( "#abrirOrdenPersonal" ).on( "click", ordenarPersonal);
$( ".reiniciarPosiciones" ).on( "click", reiniciarPosiciones);

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
$( ".alCrimp select" ).on( "change", actualizarCorteCrimp );

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

// otras mezclas
$( ".sfMilk" ).on("click", sfMilk);
$( ".sfMonge" ).on("click", sfMonge);
$( ".sfCato" ).on( "click", catoShow );
$( "#modalCato .btnAplicar" ).on( "click", catoAplicar );

// Otras cosas
$( ".vrOrden").on("click", obtenerOrden);

// Inversores
$( ".saberMas" ).on( "click", saberMas );

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

    // Desactivar el menú contextual del navegador
    document.oncontextmenu = function(){return false;}
    
    
    // ¿Había una baraja abierta en la sesión?
    if ( sessionStorage.getItem("baraja_autosave") ) {
        barajaActual = new EyDeck(abrirSesion("baraja_autosave"));
        var posicionesActuales = abrirSesion("baraja_posiciones_autosave").split(",");
        
        for (var i=0;i<barajaActual.naipe.length;i++){
        
            barajaActual.naipe[i].id = parseInt(posicionesActuales[i]);
            
        }
        
        abreBaraja();
    }else{
    
        abre_stack("fourKings");
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
    
    if($.support.fullscreen){
        // Show the full screen button
        $("#liFullScreen").show();
    }
    
    // crea element bselect
    $("#ordenBaraja").bselect();
    $("#ordenPalos select").bselect({ searchInput : false });
}

iniciar();

// Ordenar personalizadamente
function ordenarPersonal(){
    barajaActual = new EyDeck($("#ordenPersonal").val()); 
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

    for (var i = 0;i < barajaActual.naipe.length ;i++){
        contenido = contenido + '<li id="'+i+'"><a class="naipe" id="naipe' + i + '" onmousedown="javascript:cartaActual('+i+')"><div class="rotulo">'+(barajaActual.naipe[i].id+1)+'</div></a></li>';
        
    }
    contenido = contenido + '</ul>';
    
    $("#tapete").html(contenido);
    
    contenido = '<ul class="paqueteBaraja" id="paqueteNaipes">';
    var naipeeBorde;
    
    for (var i = 0;i < barajaActual.naipe.length ;i++){
        
        if (i % 2 == 0){
            naipeBorde = "borBlanco"
        }else{
            naipeBorde = "borGris"
        }
        
        contenido = contenido + '<li id="naipe' + i + '"><a class="paqueteNaipe ' + naipeBorde + '" onmousedown="javascript:mostrarCorte('+(barajaActual.naipe.length-i)+');"></a></li>';
        
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
var barajaTemp = barajaActual.naipe.slice();

    var result = JsonApi
    .apikey($("#customApiKeyRandom").val())
    .method('generateIntegers')
    .params({
        "n": barajaActual.naipe.length,
        "min": 0,
        "max": (barajaActual.naipe.length-1),
        "replacement": false,
    })
    .post(function(xhrOrError, stream, body) {
        
        for (var i = 0; i < barajaActual.naipe.length ; i++){
            barajaActual.naipe[i] = barajaTemp[body.result.random.data[i]]
        }
        
        comprobarApiRandom(body.result.requestsLeft, body.result.bitsLeft);
        renderizar();
        consola("radomOrg");
        
    });
}

function sfNumeroAleatorio(){
var barajaTemp = barajaActual.naipe.slice();
    
    var apiUrl = "http://numero-aleatorio.com/generadores/servicio-json/?desde=0&hasta=" + (barajaActual.naipe.length-1) + "&numero=" + barajaActual.naipe.length + "&repeticion=0&json=0"
        
    $.getJSON(apiUrl, function(contenido){
        consola(contenido)
    
      //  for (var i = 0; i < barajaActual.naipe.length ; i++){
    //        barajaActual.naipe[i] = barajaTemp[body.result.random.data[i]]
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
        for (var i = 0;i < barajaActual.naipe.length ;i++){
            ordenI[barajaActual.naipe[i].id] = i+1;
        }
        $("#vrGraph").attr("href","graficador?orden="+ordenI);
    
    // Renderiza la Matriz v Ascii
    if (true == false){
        
        var contenido = '';
        for (var i = 0; i < barajaActual.naipe.length;i++){

            switch(barajaActual.naipe[i].charAt(barajaActual.naipe[i].length-1)){
                case 'C':
                    contenido = contenido + barajaActual.naipe[i].substring(0,barajaActual.naipe[i].length-1) + '<big>&spades;</big> ';
                    break;
                case 'H':
                    contenido = contenido + '<font color="#dd0000">' + barajaActual.naipe[i].substring(0,barajaActual.naipe[i].length-1) + '<big>&hearts;</big></font> ';
                    break
                case 'S':
                    contenido = contenido + barajaActual.naipe[i].substring(0,barajaActual.naipe[i].length-1) + '<big>&clubs;</big> ';
                    break;
                case 'D':
                    contenido = contenido + '<font color="#dd0000">' + barajaActual.naipe[i].substring(0,barajaActual.naipe[i].length-1) + '<big>&diams;</big></font> ';
                    break;
                default:
                    contenido = contenido + barajaActual.naipe[i]        
            }

        } 
        document.getElementById("matrizAscii").innerHTML = contenido;

    
    }
    
    // Renderiza la Matriz
    var matrizFace = barajaActual.getMatriz("face",",");
    $("#matriz").attr("value", matrizFace);
    $("#ordenPersonal").val(matrizFace);
    

    // Renderiza el tapete
    for (var i = 0;i < barajaActual.naipe.length;i++){
        $("#naipe"+i).css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(i) + '.png)');
        $("#naipe"+i + " .rotulo").html((i+1)+"<hr>"+(barajaActual.naipe[i].id+1));
        
        
    }

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
                for (var i = 0; i < barajaActual.naipe.length; i++){
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
            case "limpiar":
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
            case "nevar":
                fsNevar()
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
            case "mongue":
                sfMonge();
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
            consola("Imagen generada. Haga <a href=" + screenS + " download='" + $("#modalScreen input").val()+".png" + "'>click aquí</a> para descargar");

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

$( "#mostrarRotulos" ).on('switchChange.bootstrapSwitch', function(event, state) {
   if (state){
        $(".rotulo").css('display', 'table-caption');
   }else{
       $(".rotulo").css('display', 'none');
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
    
        posCartaActual = carta;
   
}

function eliminarCarta(){
    barajaActual.naipe.splice(posCartaActual,1);
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
                cual = barajaActual.naipe.length + parseInt(cual);
            } else {
                consola(cual + " no es un argumento válido.");
                return;
            }
        }
        barajaActual.naipe.splice(cual,1);
        abreBaraja();
    }
}

function editarCarta(){
    $("#modalEditarCarta .posicion").html(" #" + (barajaActual.naipe[posCartaActual].id+1));
    $("#modalEditarCarta .editarCodigoCara").val(barajaActual.naipe[posCartaActual].face);
    $("#modalEditarCarta .editarCodigoDorso").val(barajaActual.naipe[posCartaActual].back);
    $("#modalEditarCarta .editarVer").bootstrapSwitch('state', barajaActual.naipe[posCartaActual].canSee);
    $("#modalEditarCarta .naipe").css('backgroundImage', 'url(img/decks/' + imgDeck + '/' + barajaActual.getValue(posCartaActual) + '.png)');
    $("#modalEditarCarta .editarPosicion").val(posCartaActual+1);
    $("#modalEditarCarta .editarPosicion").attr("max",barajaActual.naipe.length+1);
    $("#modalEditarCarta .editarCrimp").bootstrapSwitch('state', barajaActual.naipe[posCartaActual].crimp);
    $("#modalEditarCarta .editarCrimpTopBottom").bootstrapSwitch('state', !barajaActual.naipe[posCartaActual].crimpB);
    
    if (barajaActual.naipe[posCartaActual].crimpTag == ""){
        
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $("#modalEditarCarta .editarCrimpTag").val(letras.split("")[barajaActual.getCrimps().length]);
        
    } else {
    
        $("#modalEditarCarta .editarCrimpTag").val(barajaActual.naipe[posCartaActual].crimpTag);
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
    
    barajaActual.naipe[posCartaActual].face = $(".editarCodigoCara").val();
    barajaActual.naipe[posCartaActual].back = $(".editarCodigoDorso").val();
    barajaActual.naipe[posCartaActual].canSee = $(".editarVer").bootstrapSwitch('state');
    barajaActual.naipe[posCartaActual].crimp = $(".editarCrimp").bootstrapSwitch('state');
    barajaActual.naipe[posCartaActual].crimpB = !$(".editarCrimpTopBottom").bootstrapSwitch('state');
    barajaActual.naipe[posCartaActual].crimpTag = $(".editarCrimpTag").val();
    
    var posNueva = ($("#modalEditarCarta .editarPosicion").val()-1);
    
    if (posCartaActual != posNueva){

        consola(barajaActual.naipe[posCartaActual].face + " > " + posNueva);
        barajaActual.move(posCartaActual,posNueva);
        
    }
    
    renderizar();
    $("#modalEditarCarta").modal('hide');
}

function sfModalCortar(){
    
    $("#alNumero").attr('min',-barajaActual.naipe.length+1);
    $("#alNumero").attr('max',barajaActual.naipe.length-1);
    $("#alNumero").val(0);
    
    var crimps = barajaActual.getCrimps();
    var opciones = "";
    for (var i = 0; i < crimps.length; i++){
    
        var posicion = crimps[i];
        if (barajaActual.naipe[crimps[i]].crimpB){
            posicion++;
        }
        opciones += "<option value="+posicion+">" + barajaActual.naipe[crimps[i]].crimpTag + "</option>";
        
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
    lugar = barajaActual.naipe.length - lugar;
    
    if (lugar > barajaActual.naipe.length){
        lugar = lugar - barajaActual.naipe.length;
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
    consola(barajaActual.naipe[posCartaActual].face + " > Top");
    barajaActual.toTop(posCartaActual);
    renderizar();
}

function moverABottom(){
    consola(barajaActual.naipe[posCartaActual].face + " > Bottom");
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
    
    var cantPar = Math.floor(barajaActual.naipe.length/2)*2;
    
    $("#catoCutCant").attr("max", barajaActual.naipe.length );
    $("#catoCutCant").val(cantPar/2);
    $(".turnNum").attr("max",  cantPar);
    $("#catoTurnDesde").attr("max", cantPar );
    $("#catoTurnHasta").attr("max", cantPar );
    $("#catoTurnHasta").val(cantPar);
    
    $("#modalCato").modal('show');
    
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
    for (var i=0;i<j;i++){
        
        // CUT
        if( $("#catoCut").bootstrapSwitch('state') ) {
            
            cortarX = Math.floor(Math.random()*(barajaActual.naipe.length));
            
        } else {

            if ($("#catoTopBotom").bootstrapSwitch('state')){
            
                cortarX = $("#catoCutCant").val();
                
            } else {
            
                cortarX = "-" + $("#catoCutCant").val();
                
            }
            
        }
        
        // AND TURN
        if( $("#catoTurn").bootstrapSwitch('state') ) {
            
            voltearX = $("#modalCato .turnNum").val();
            
        } else {
            var desde = parseInt($("#catoTurnDesde").val());
            var hasta = parseInt($("#catoTurnHasta").val())+2;
            voltearX = (Math.floor(Math.random()* ((hasta - desde)/2))*2)+desde;
        }
        
        barajaActual.cortar(cortarX);
        barajaActual.invertir(voltearX);
        sfVoltearEstas("1,"+voltearX);
        consola("cato("+cortarX+","+voltearX+")");
    }
    
    renderizar();
    $("#modalCato").modal('hide');
}

function faroShow(){
    
    $("#faroParcial").attr("max", barajaActual.naipe.length );
    $("#faroParcial").val(barajaActual.naipe.length);
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
    
    } else {
        
        var mezcla = "antifaro";
        
    }
    
    // ¿Exterior o Interior?
    if ( $("#faroExtInt").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + "ext(";
    
    } else {
    
        mezcla = mezcla + "int(";
        
    }
    
    // ¿Total o parcial?
    if ( $("#faroCantidad").bootstrapSwitch('state') ) {
        
        mezcla = mezcla + barajaActual.naipe.length;
        
    } else {
        var valor = $('#faroParcial').val();
        
        // ¿Desde top o desde bottom?
        if ( !$("#faroTopBotom").bootstrapSwitch('state') ){
            mezcla = mezcla + "-";
        }
        
        mezcla = mezcla + valor + ")";
    }
    
    // ¿Hay multiplicador?
        var veces = $("#modalFaro .multiplicador").val();
    if ( veces == 1 || !isNaN(valor) ) {
        
        ejecutarComando(mezcla);
        
    } else {
        
        repetirComando(mezcla,veces)
    }
    
    
    // Aplica la mezcla
    $("#modalFaro").modal('hide');
    eval(mezcla);
    
}

function verStats(){
    
    var redond =  7;
    // Permutaciones posibles
    var permutaciones = 1;
    for (var i = 1; i <= barajaActual.naipe.length; i++) {
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
    var mezclasNecesarias = (Math.log(barajaActual.naipe.length) / Math.log(2))*1.5;
    mezclasNecesarias = redondeo(mezclasNecesarias,redond);
    
    // Adivinaciones probables
    var adivinacionesProbables = 0;
    for (var i = 1; i<=barajaActual.naipe.length;i++){
    
        adivinacionesProbables = adivinacionesProbables + 1 / i;
    }
    
    var adivinacionesPorcentaje = adivinacionesProbables * 100 / barajaActual.naipe.length;
    adivinacionesPorcentaje = redondeo(adivinacionesPorcentaje,2);
    adivinacionesProbables = redondeo(adivinacionesProbables,redond);
    
    $("#modalStats .barajaMatriz").html("["+barajaActual.getMatriz("face",",")+"]");
    $("#modalStats .cantidad").html(barajaActual.naipe.length);
    $("#modalStats .permutaciones").html(barajaActual.naipe.length + "! = " + permutaciones);
    $("#modalStats .mezclasNecesarias").html("<sup>3</sup>&frasl;<sub>2</sub> log<sub>2</sub>" + barajaActual.naipe.length + " = " + mezclasNecesarias);
    $("#modalStats .adivinacionesProbables").html("<sup>1</sup>&frasl;<sub>" + barajaActual.naipe.length + "</sub> + ... + <sup>1</sup>&frasl;<sub>2</sub> + <sup>1</sup>&frasl;<sub>1</sub> = " + adivinacionesProbables);
    $("#modalStats .adivinacionesPorcentaje").html(adivinacionesPorcentaje + "%");
    $("#modalStats .farosOutOrdenan").html("ord<sub>" + barajaActual.naipe.length + "-1</sub>(2) = ");
    $("#modalStats .farosIntOrdenan").html("ord<sub>" + barajaActual.naipe.length + "+1</sub>(2) = ");
    
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

// Mezcla Alfa
function sfMilk(){

    var salida = barajaActual.milkSuffle();
    renderizar();
    consola(salida);
    
}

// Mezcla Monge
function sfMonge(){

    var salida = barajaActual.mongeSuffle();
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
    
    for (var i=0;i<ordTemp.length;i++){
        ordTemp[i]=ordTemp[i]+ordPalos.charAt(i%4);
    }
    $("#barajaPref #orden").val(ordTemp);
}

function abrirStack(){
    
    if ($("#barajaPref #orden").val() == '') {
    
        $("#modalAbrir .alert .texto").html("¡No se ha seleccionado ninguna ordenación!");
        $("#modalAbrir .alert").css("display","block");
        
    } else {
        
        if(typeof stkNumbers !== 'undefined' && $("#ordenPalos .bselect").val() == '') {
            $("#modalAbrir .alert .texto").html("¡No se ha seleccionado ninguna rotación de palos!");
            $("#modalAbrir .alert").css("display","block");
            
        } else {
            $("#modalAbrir .alert").css("display","none");
            $("#modalAbrir").modal('hide');
            barajaActual = new EyDeck($("#barajaPref #orden").val());
            abreBaraja();
        }
                  
    }
}

// Abre una baraja desde el stack JSON
function abreStack() {
        
        
        
}