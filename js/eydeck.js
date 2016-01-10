// Constructor de la clase EyDeck!
// Autor: Ey Pacha! 
// Web: github.com/eypacha/barajador/blob/master/js/eydeck.js

// Crea el objeto de la baraja
function EyDeck(cartas){
    var deck = cartas.split(",");
    
    // Construye los naipes individuales
    this.deck = [];
    for (var i = 0; i < deck.length; i++){
        
        this.deck[i] = new naipe(i,deck[i]);
    }
    
    // Definiendo funciones
    this.getMatriz = getMatriz;
    this.setOrder = setOrder;
    this.refreshOrder = refreshOrder;
    this.move = move;
    this.toTop = toTop;
    this.toBottom = toBottom;
    this.getCardById = getCardById;
    this.getCrimps = getCrimps;
    this.getValue = getValue;
    this.turnOver = turnOver;
    this.cortar = cortar;
    this.invertir = invertir;
    this.faroExt = faroExt;
    this.faroInt = faroInt;
    this.antiFaroExt = antiFaroExt;
    this.antiFaroInt = antiFaroInt;
    this.milkSuffle = milkShuffle;
    this.mongeSuffle = mongeShuffle;
    this.australianShuffle = australianShuffle;
    this.antiAustralianShuffle = antiAustralianShuffle;
    this.fisherYates = fisherYates;
    this.durstenfeld = durstenfeld;
    this.sattolo = sattolo;
    
}

// Crea el objeto del naipe individual
function naipe(i,cara){
    
    // Definiendo aributos por default
    this.id = i;
    this.face = cara;
    this.back = "DA";
    this.canSee = true;
    this.crimp = false;
    this.crimpB = false;
    this.crimpTag = "";
    
}

// Genera un string con las propiedades separadas por comas
function getMatriz(propiedad,delimitador){
    
    var cadena = "";
    
    for (var i = 0; i < this.deck.length - 1; i++){
    
        cadena += eval("this.deck[i]."+propiedad) + delimitador ;
        
    }
    
    cadena +=  eval("this.deck[this.deck.length-1]."+propiedad);
    
    return cadena
}

// Actualiza los Ids (Posiciones relativas)
function refreshOrder(){
    
    for (var i = 0; i < this.deck.length; i++){
        this.deck[i].id = i;
    }
}

// Genera un array con las posiciones de las cartas crimpeadas
function getCrimps(){

    var ides = [];
    
    for (var i = 0; i < this.deck.length; i++){
        
        if (this.deck[i].crimp){
         
            ides.push(i);
            
        }
    
    }
    
    return ides;
    
}

// Devuelve la carta partiendo de su Id
function getCardById(idParam){

    var result;
    for(i in this.deck){
        if(this.deck[i].id === idParam){
            result = this.deck[i];
            break;
        }
    }
    
    return result;
}

// Ordenar según strings con los Ids separados por comas
function setOrder(cadena){

    var ides = cadena.split(",");
    var barajaTemp = this.deck.splice();
    for (var i = 0; i < ides.length; i++){
    
        barajaActual.deck[i] = barajaTemp.getCardById[i];
    
    }
}

// Devuelve la cara visible de la carta
function getValue(carta) {
    
    if (this.deck[carta].canSee){
    
        return this.deck[carta].face;
        
    } else {
    
        return this.deck[carta].back;
        
    }

}

// Voltea la carta
function turnOver(carta){
    
    if (isNaN(carta) || carta >= this.deck.length){
    
        for (var i=0; i < this.deck.length; i++){
        
            this.deck[i].canSee = !this.deck[i].canSee;
            
        }
    } else {
    
        this.deck[carta].canSee = !this.deck[carta].canSee;
    }
    
}

// Cortar
function cortar(cantidad){
    
    var paqueteA = this.deck.slice(0,cantidad);
    var paqueteB = this.deck.slice(cantidad);
    this.deck = paqueteB.concat(paqueteA); 
    return "cortar("+cantidad+")";
    
}

// Invierte total o parcialmente la baraja
function invertir(cantidad){
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || cantidad >= this.deck.length){

        this.deck.reverse();
        return "invertir";
        
    } else {
        if (cantidad > 0){
        
        var paqueteA = this.deck.slice(0,cantidad);
        var paqueteB = this.deck.slice(cantidad); 
        paqueteA = paqueteA.reverse()
        this.deck = paqueteA.concat(paqueteB);
            
    } else {
        if (cantidad < 0){
            
            cantidad = this.deck.length + parseInt(cantidad);
            var paqueteA = this.deck.slice(0,cantidad);
            var paqueteB = this.deck.slice(cantidad);
            paqueteB = paqueteB.reverse();
            this.deck = paqueteA.concat(paqueteB);
            
        }
    }
        return "invertir(" + cantidad + ")";
        
    }
}

// Faro Exterior
function faroExt(cantidad){
    var desde = 0;
    var barajaTemp = this.deck.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.deck.length || !cantidad){
        cantidad = this.deck.length;
        total = true;
        
    } else {
        total = false;
    
    }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.deck.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezccla
    for (var i = 0; i < cantidad ;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                this.deck[(2*i) % (cantidad-1) + desde] = barajaTemp[i + desde]
            }       
        }else{
            this.deck[(2*i) % cantidad + desde] = barajaTemp[i + desde]
        }
    }
    
    if (total){
        return "faroExt";
    } else {
        return "faroExt("+cantidad+")";
    }
}

// Faro Interior
function faroInt(cantidad){
    var desde = 0;
    var barajaTemp = this.deck.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.deck.length || !cantidad){
        cantidad = this.deck.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.deck.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            this.deck[(2*i+1) % (cantidad+1) + desde] = barajaTemp[i + desde]
        }else{
            this.deck[(2*i+1) % (cantidad) + desde] = barajaTemp[i + desde]
        }
    }
    
    if (total){
        return "faroInt";
    } else {
        return "faroInt("+cantidad+")";
    }
}

// Antifaro Exterior
function antiFaroExt(cantidad){

    var desde = 0;
    var barajaTemp = this.deck.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.deck.length || !cantidad){
        cantidad = this.deck.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.deck.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                this.deck[i + desde] = barajaTemp[(2*i) % (cantidad-1) + desde]
            }       
        }else{
            this.deck[i + desde] = barajaTemp[(2*i) % cantidad + desde]
        }
    }
    
    if (total){
        return "antiFaroExt";
    } else {
        return "antiFaroExt("+cantidad+")";
    }
    
}

// Antifaro Interior
function antiFaroInt(cantidad){

    var desde = 0;
    var barajaTemp = this.deck.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.deck.length || !cantidad){
        cantidad = this.deck.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.deck.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            this.deck[i + desde] = barajaTemp[(2*i+1) % (cantidad+1) + desde]
        }else{
            this.deck[i + desde] = barajaTemp[(2*i+1) % (cantidad) + desde]
        }
    }
    
    if (total){
        return "antiFaroInt";
    } else {
        return "antiFaroExt("+cantidad+")";
    }    
    
}

// Mezcla Alfa / Klondike / Milk
function milkShuffle(){
    var barajaTemp = this.deck.slice();    
    cantidad = this.deck.length;
    // AT,2T,3T,4T,5T,6T,7T,8T,9T,10T
    for (var i = 0; i < cantidad; i++){
        if ( i % 2 == 0 ){
            this.deck[i+1] = barajaTemp[((cantidad - i) / 2) - 1];
        } else {
            if ( cantidad % 2 == 0 || i < cantidad - 1){
                this.deck[i-1] = barajaTemp[(cantidad  + i - 1)/2];
            }
        }
    }
    return "milk";
}

// Mezcla Monge
function mongeShuffle(){
    var barajaTemp = this.deck.slice();    
    cantidad = this.deck.length;
    
    for (var i = 0; i < cantidad; i++){
        if ( i % 2 == 0 ){
            this.deck[((cantidad - i) / 2) - 1] = barajaTemp[i+1];
        } else {
            this.deck[(cantidad  + i - 1)/2] = barajaTemp[i-1];
        }
    }
    return "monge";
}

// Mezcla Austrialana
function australianShuffle(){
    var barajaTemp = this.deck.slice();
    cantidad = this.deck.length;
    var cardTemp;
    
    for(var i = 0; i < cantidad ; i++) {
        
        cardTemp = barajaTemp.shift();
        barajaTemp.push(cardTemp);
        cardTemp = barajaTemp.shift();
        this.deck[cantidad-i-1] = cardTemp;
        
    }
    
    return "australian";
}

// Mezcla AntiAustrialana
function antiAustralianShuffle(){
    var barajaTemp = [];
    cantidad = this.deck.length;
    var cardTemp;
    
    for(var i = 0; i < cantidad ; i++) {

        cardTemp = this.deck.shift();
        barajaTemp.unshift(cardTemp);
        cardTemp = barajaTemp.pop();
        barajaTemp.unshift(cardTemp);
    }
    
    this.deck = barajaTemp.slice();
    return "antiAustralian";
}

// Mezcla pseudoaleatoria Fisher-Yates
function fisherYates(){

    var barajaTemp = this.deck.slice();
    var n = this.deck.length;
    var i;
    this.deck = [];
    // Mientras queden cartas por mezclar...
    while (n) {
        // Elije una carta del remanente...
        i = Math.floor(Math.random() * n--);

        // Y la agrega al nuevo array
        this.deck.push(barajaTemp.splice(i, 1)[0]);
    }
    
    return ("fisherYates");
    
}

// Mezcla pseudoaleatoria Durstenfeld
function durstenfeld(){
    
    var counter = this.deck.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = this.deck[counter];
        this.deck[counter] = this.deck[index];
        this.deck[index] = temp;
    }
    
    return "durstenfeld";
}

// Mezcla speudoaleatoria Sattolo
function sattolo(){

     for (var i = 0; i < this.deck.length - 1; i++) {
        var j = i + 1 + Math.floor(Math.random() * (this.deck.length - i - 1));

        var temp = this.deck[j];
        this.deck[j] = this.deck[i];
        this.deck[i] = temp;
    }
    
    return "sattolo";
}

// Mover una carta a Top 
function toTop(posCarta){
    var barajaTemp =  this.deck.slice();
    this.deck.splice(posCarta,1);
    this.deck.unshift(barajaTemp[posCarta]);
}

// Mover una carta a Bottom
function toBottom(posCarta){
    var barajaTemp = this.deck.slice();
    this.deck.splice(posCarta,1);
    this.deck.push(barajaTemp[posCarta]);
}

// Mover una carta
function move(de,hasta){
        
    var barajaTemp =  this.deck.slice();
    this.deck.splice(de,1);
    var paqueteA = this.deck.slice(0,hasta);
    var paqueteB = this.deck.slice(hasta);
    paqueteA.push(barajaTemp[de]);
    this.deck = paqueteA.concat(paqueteB); ;
    
}