// Nombre: Ey Deck!
// Autor: Ey Pacha! 
// Descripción: Librería para manejo de barajade cartas.
//              Caras, dorsos, volteos, cortes, mezclas, cartas marcadas, y más...
// Web: github.com/eypacha/barajador/blob/master/js/eydeck.js*/

// Consctructor del objeto de la baraja
function EyDeck(cartas,dorsos){
    var deck = cartas.split(",");
    
    if (typeof dorsos === 'undefined'){
        dorsos = "DA";
    }
    
    // Construye los naipes individuales
    this.deck = [];
    for (var i = 0; i < deck.length; i++){
        
        this.deck[i] = new naipe(i,deck[i],dorsos);
    }
    
    // Definiendo funciones
    this.getMatriz = getMatriz;
    this.get2Bfaces = get2Bfaces;
    this.getReds = getReds;
    this.getBlacks = getBlacks;
    this.setOrder = setOrder;
    this.refreshOrder = refreshOrder;
    this.add = add;
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
    this.milk = milk;
    this.omega = omega;
    this.mongeDown = mongeDown;
    this.mongeUp = mongeUp;
    this.downUnderDeal = downUnderDeal;
    this.antiDownUnderDeal = antiDownUnderDeal;
    this.underDownDeal = underDownDeal;
    this.antiUnderDownDeal = antiUnderDownDeal
    this.riffle = riffle;
    this.antiRiffle = antiRiffle;
    this.fisherYates = fisherYates;
    this.durstenfeld = durstenfeld;
    this.sattolo = sattolo;
    
}

// Crea el objeto del naipe individual
function naipe(i,cara,dorso){
    
    // Definiendo aributos por default
    this.id = i;
    this.face = cara;
    this.back = dorso;
    this.canSee = true;
    this.crimp = false;
    this.crimpB = false;
    this.crimpTag = "";
    
}

// Genera un string con las propiedades separadas por comas
function get2Bfaces(){
    
    var cadena = "";
    
    for (var i = 0; i < this.deck.length; i++){
        cadena += ("00"+(i+1)).slice(-2) + this.deck[i].face.slice(-2) + "  ";
    }
    
    return cadena
}

function getMatriz(propiedad,delimitador){
    
    var cadena = "";
    
    for (var i = 0; i < this.deck.length - 1; i++){
        cadena += intentar(this.deck[i],propiedad) + delimitador;
    }
    
    cadena +=  intentar(this.deck[this.deck.length-1],propiedad);
    
    return cadena
}

function intentar(objeto, propiedad) {
    if (objeto) {
        try {
            var resul = objeto[propiedad]; 
            return resul;
        } catch (err) {
            console.error("Intento fallido: " + err.message);
        }
    } else {
        console.error(objeto + " no está definida");
    }
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

// Mezcla Alfa
function milk(){
    var barajaTemp = [];    
    var n = this.deck.length;

    var deck = this.deck;
    
    for (var i = 0; i < n; i++){
        
        if (i % 2 == 0) {
            
            barajaTemp.unshift(deck.pop());
            
        } else {
        
            barajaTemp.unshift(deck.shift());
        }

    }
    
    this.deck = this.deck.concat(barajaTemp);
    return "alfa";
}

// Mezcla Omega
function omega(){
    var barajaTemp = [];    
    var n = this.deck.length;

    var deck = this.deck;
    
    for (var i = 0; i < n; i++){
        
        if (i % 2 == 0) {
            
            barajaTemp.unshift(deck.shift());
            
        } else {
        
            barajaTemp.unshift(deck.pop());
        }

    }
    
    this.deck = barajaTemp;
    return "omega";
}

// Mezcla Monge Down
function mongeDown(){
    
    var barajaTemp = [];    
    var n = this.deck.length;
    var deck = this.deck;
    
    for (var i = 0; i < n; i++){

        if (i % 2 == 0){
        
            barajaTemp.unshift(deck[i]);
            
        } else {
        
            barajaTemp.push(deck[i]);
        }

    }
    
    this.deck = barajaTemp
    return "mongeDown";
}

// Mezcla Monge Up
function mongeUp(){
    
    var barajaTemp = [];    
    var n = this.deck.length;
    var deck = this.deck;
    
    for (var i = 0; i < n; i++){

        if (i % 2 == 0){
        
            barajaTemp.push(deck[i]);
            
        } else {
        
            barajaTemp.unshift(deck[i]);    
        }

    }
    
    this.deck = barajaTemp
    return "mongeUp";
}

// Mezcla DownUnderDeal
function downUnderDeal(){
    var barajaTemp = this.deck.slice();
    cantidad = this.deck.length;
    var cardTemp;
    
    for(var i = 0; i < cantidad ; i++) {
        
        cardTemp = barajaTemp.shift();
        barajaTemp.push(cardTemp);
        
        cardTemp = barajaTemp.shift();
        this.deck[cantidad-i-1] = cardTemp;
        
    }
    
    return "downUnderDeal";
}

// Mezcla antiDownUnderDeal
function antiDownUnderDeal(){
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
    return "antiDownUnderDeal";
}

// Mezcla UnderDownDeal
function underDownDeal(){
    
    var barajaTemp = this.deck.slice();
    cantidad = this.deck.length;
    var cardTemp;
    
    for(var i = 0; i < cantidad ; i++) {
        
        if(i != 0){
            cardTemp = barajaTemp.shift();
            barajaTemp.push(cardTemp);
        }
        cardTemp = barajaTemp.shift();
        this.deck[cantidad-i-1] = cardTemp;
        
    }
    
    return "underDownDeal";
}

// Mezcla antiUnderDownDeal
function antiUnderDownDeal(){
    var barajaTemp = [];
    var n = this.deck.length;
    var cardTemp;
    
    for(var i = 0; i < n ; i++) {

        cardTemp = this.deck.shift();
        barajaTemp.unshift(cardTemp);
        
        if (i != (cantidad-1)){
            cardTemp = barajaTemp.pop();
            barajaTemp.unshift(cardTemp);
        }
    }
    
    this.deck = barajaTemp.slice();
    return "antiUnderDownDeal";
    
}

// Mezcla antiRiffle
function riffle(){
    var c = this.deck.length;
    
    if (c > 170){
        notificar("¡¿Quieres mezclar " + c + " cartas?! ¡Pero qué manos grandes! Disculpas pero aún no hemos implementado el algoritmo para tantas cartas... :S","warning");
        return;
    }
                  
    // Divide la baraja en dos paquetes similares
    var num = rdomBinom(c);
    var a = this.deck.slice(0,num);
    var b = this.deck.slice(num);
    var barajaTemp = [];
    
    // Realiza mezcla
    var r;
    do {
        
        r = Math.random();
        if(r < a.length/(a.length+b.length)){
        
            barajaTemp.unshift(a.pop());
            
        } else {
        
            barajaTemp.unshift(b.pop());
        }
        
    
    } while(a.length != 0);
    
    // Rearma la baraja
    this.deck = b.concat(barajaTemp); 
    return "riffle";
    
}

// Mezcla antiRiffle
function antiRiffle(){

    var barajaTemp = this.deck.slice();
    var n = this.deck.length;
    for (var i=0; i<n;i++){
        
        if(rdomUnif(1)){
            
            this.deck.splice((n-i-1),1);
            
        } else {
            
            barajaTemp.splice((n-i-1),1);
            
        }
 
    }
    this.deck = this.deck.concat(barajaTemp);
    return "antiRiffle";
    
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
        
    var barajaTemp = this.deck.slice();
    this.deck.splice(de,1);
    this.deck.splice(hasta,0,barajaTemp[de]);
    
}

// Agregar una carta
function add(n,a,b,c,d,e,f){

    var barajaTemp = {
        "id": this.deck.length,
        "face": a,
        "back": b,
        "canSee": c,
        "crimp": d,
        "crimpB": e,
        "crimpTag": f
        
    };
    
    this.deck.splice(n,0,barajaTemp);
    
}

// es roja?
function isRed(id){
    var suit = this.deck[id].face.slice(-1);
    return suit == "C" || suit == "D";
}

// es negra?
function isBlack(id){
    var suit = this.deck[id].face.slice(-1);
    return suit == "P" || suit == "T";
}

function getReds(){
    var rojas = [];
    for(var i=0;i<this.deck.length;i++){
        if(isRed(i)){
            rojas.push(this.deck[i])
        }
    }
    return rojas;
}

function getBlacks(){
    var negras = [];
    for(var i=0;i<this.deck.length;i++){
        if(isBlack(i)){
            negras.push(this.deck[i])
        }
    }
    return negras;
}

function aTexto(carta){

    var suit = carta.slice(-1);
    
    switch(suit){
        case "P":
        suit = " de Picas";
        break;
        case "T":
        suit = " de Trébol";
        break;
        case "C":
        suit = " de Corazón";
        break;
        case "D":
        suit = " de Diamantes";
        break;
    }
    
    var numero = carta.substr(0,carta.length-1);
    
    switch(numero){
        case "A":
        numero = "As";
        break;
        case "2":
        numero = "Dos";
        break;
        case "3":
        numero = "Tres";
        break;
        case "4":
        numero = "Cuatro";
        break;
        case "5":
        numero = "Cinco";
        break;
        case "6":
        numero = "Seis";
        break;
        case "7":
        numero = "Siete";
        break;
        case "8":
        numero = "Ocho";
        break;
        case "9":
        numero = "Nueve";
        break;
        case "10":
        numero = "Diez";
        break;
        case "J":
        numero = "Jota";
        break;
        case "Q":
        numero = "Reina";
        break;
        case "K":
        numero = "Rey";
        break;
        
    }
    
    return numero + suit;
}