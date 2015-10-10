//Inicializa las variables globales
var imgDeck = "wiki";
var imgBack = "bicycle-red";
var vrChck0 = "glyphicon glyphicon-unchecked";
var vrChck1 = "glyphicon glyphicon-check"


var JsonApi = new RandomJs();

// Inicia el menu de herramientas

// Menu HELP

// Menu: Baraja
//$( "#bjAbrir" ).on( "click", bjAbrir );
$( "#generarQr" ).on( "click", generarQr );
//$( "#bjAjustes" ).on( "click", bjAjustes );

$( "#colorTapete" ).on( "change", cambiarColorTapete );
$( "#colorConsola" ).on( "change", cambiarColorConsola );
$( "#colorConsolaTexto" ).on( "change", cambiarColorConsolaTexto );

// Menu: Mezclar
//$( "#sfRepetir" ).on( "click", sfRepetir );
$( "#sfInvertir" ).on( "click", sfInvertir );
$( "#sfFisherYates" ).on( "click", sfFisherYates );
$( "#sfSattolo" ).on( "click", sfSattolo );
$( "#sfRandomOrg" ).on( "click", sfRandomOrg );
$( "#sfCortar" ).on( "click", sfCortar );
$( "#sfOverhand" ).on( "click", sfOverhand );
$( "#sfFaroExt" ).on( "click", sfFaroExt );
$( "#sfFaroIn" ).on( "click", sfFaroInt );
$( "#sfAntiFaroExt" ).on( "click", sfAntiFaroExt );
$( "#sfAntiFaroIn" ).on( "click", sfAntiFaroInt );
//$( "#sfAlfa" ).on( "click", sfAlfa );

// Menu: Ver Check / UnCheck
$( "#vrMatriz" ).on( "click", {name: "Matriz"}, verModulos );
$( "#vrTapete" ).on( "click", {name: "Tapete"}, verModulos );
$( "#vrConsola" ).on( "click", {name: "Consola"}, verModulos );

var baraja = "AS,2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,10D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,10H,JH,QH,KH";
baraja = baraja.split(",");

// Función de Renderización
function abreBaraja(){
    var contenido = '<ul class="baraja" id="naipes">';

    for (i = 0;i < baraja.length;i++){

       contenido = contenido + '<li><a href="#" class="naipe" id="naipe' + i + '"></a></li>';

    }

    contenido = contenido + '</ul>';
    $("#tapete").html(contenido);
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
    consola("durst()");
}

// Algoritmo Sattolo
function sfSattolo() {
    alert("SATOLO");
    for (i = 0; i < baraja.length - 1; i++) {
        var j = i + 1 + Math.floor(Math.random() * (baraja.length - i - 1));

        var temp = baraja[j];
        baraja[j] = baraja[i];
        baraja[i] = temp;
    }
    renderizar();
    consola("satol()");
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
        
        for (i = 0; i < baraja.length ; i++){
            baraja[i] = barajaTemp[body.result.random.data[i]]
        }
        
        comprobarApiRandom(body.result.requestsLeft, body.result.bitsLeft);
        renderizar();
        consola("radomOrg()");
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
    consola("inv()");
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
    for (i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i] = barajaTemp[i/2];
        }else{
            baraja[i] = barajaTemp[(i+baraja.length-1)/2];
        }
    }
    consola("faroO()");
    renderizar();
}

// MEZCLA =  FARO INT
function sfFaroInt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i+1] = barajaTemp[i/2];
        }else{
            baraja[i-1] = barajaTemp[(i+baraja.length-1)/2];
        }
    }
    consola("faroI()");
    renderizar();
}

// MEZCLA =  ANTIFARO EXT
function sfAntiFaroExt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i/2] = barajaTemp[i];
        }else{
            baraja[(i+baraja.length-1)/2] = barajaTemp[i];
        }
    }
    consola("-faroO()");
    renderizar();
}

// MEZCLA =  ANTIFARO INT
function sfAntiFaroInt(){
    var barajaTemp = baraja.slice();
    
    // Realiza la mezcla
    for (i = 0; i < baraja.length;i++){
        if ( i % 2 == 0 ){
            baraja[i/2] = barajaTemp[i+1];
        }else{
            baraja[(i+baraja.length-1)/2] = barajaTemp[i-1];
        }
    } 
    consola("-faroI()");
    renderizar();
}

// Renderiza la baraja
function renderizar(){
    // Renderiza la Matriz
    document.getElementById("matriz").value = baraja;
    
    // Renderiza el tapete
    for (i = 0;i < baraja.length;i++){
        $("#naipe"+i).css('background', 'url(img/decks/' + imgDeck + '/' + baraja[i] + '.png)');
        $("#naipe"+i).css('backgroundColor', 'white');
        $("#naipe"+i).css('backgroundSize', '100px 140px');
        $("#naipe"+i).css('backgroundPositionX','-1px');  
    }
}

abreBaraja()
renderizar();

// Ver Modulos
function verModulos(event){
    
    mModulo = "txtVer" + event.data.name;
    xModulo = "modulo" + event.data.name;
    
    // Muestra el módulo seleccionado
    if( document.getElementById(mModulo).className == vrChck0 ){
    
        document.getElementById(mModulo).className = vrChck1;
        $('#xModulo').css('display', 'block');
        
    // Oculta el módulo seleccionado
    }else{
        
        document.getElementById(mModulo).className = vrChck0;
        $('#xModulo').css('display', 'none');
    }
}

// Output a consola
function consola(texto){
    
    document.getElementById("consolaOutput").innerHTML = document.getElementById("consolaOutput").innerHTML + texto + ";\n";
    
}

// Generar QR
function generarQr(){
    qrSize = 250;
    urlApi = "https://api.qrserver.com/v1/create-qr-code/?size="+qrSize+"x"+qrSize+"&data=";
    $("#imagenQr").attr('src',urlApi + baraja);
    $('#modalQr').modal();
}

function cambiarColorTapete(){
    $('.contenedor').css('background-color',$('#colorTapete').val())
}

function cambiarColorConsola(){
    $('#consola').css('background',$('#colorConsola').val())
}

function cambiarColorConsolaTexto(){
    $('#consola').css('color',$('#colorConsolaTexto').val())
}