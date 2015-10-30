// Consctructor de la clase eyDeck!
// Autor: Ey Pacha! 
//


// Crea el objeto de la baraja
function EyDeck(cartas){
    
    var deck = cartas.split(",");
    
    // Construye el naipe individual
    this.naipe = [];
    for (var i = 0; i < deck.length; i++){
        
        this.naipe[i] = new naipe(i,deck[i]);
    }
    
    // Definiendo funciones
    this.getMatriz = getMatriz;
    this.setOrder = setOrder;
    this.cortar = cortar;
    this.invertir = invertir;
    this.faroExt = faroExt;
    this.faroInt = faroInt;
    this.antiFaroExt = antiFaroExt;
    this.antiFaroInt = antiFaroInt;
    this.fisherYates = fisherYates;
    this.durstenfeld = durstenfeld;
    this.sattolo = sattolo;
    
}


// Crea el objeto del naipe individual
function naipe(i,cara){
    
    // Definiendo aributos por default
    this.id = i;
    this.face = cara;
    this.back = "dorso";
    this.crimp = false; 
    
}

// Genera un string con las propiedades separadas por comas
function getMatriz(propiedad,delimitador){
    
    var cadena = "";
    
    for (var i = 0; i < this.naipe.length - 1; i++){
    
        cadena += eval("this.naipe[i]."+propiedad) + delimitador ;
        
    }
    
    cadena +=  eval("this.naipe[this.naipe.length-1]."+propiedad);
    
    
    return cadena
}

// Ordenar según strings con los Ids separados por comas
function setOrder(cadena){

    var ides = cadena.split(",");
    
    for (var i = 0; i < ides.length; i++){
    document.getElementById
    
    }
}

// Cortar
function cortar(cantidad){
    var paqueteA = this.naipe.slice(0,cantidad);
    var paqueteB = this.naipe.slice(cantidad);
    this.naipe = paqueteB.concat(paqueteA); 
    return "cortar("+cantidad+")";
    
}

// Invierte total o parcialmente la baraja
function invertir(cantidad){
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || cantidad >= this.naipe.length){

        this.naipe.reverse();
        return "invertir";
        
    } else {
        if (cantidad > 0){
        
        var paqueteA = this.naipe.slice(0,cantidad);
        var paqueteB = this.naipe.slice(cantidad); 
        paqueteA = paqueteA.reverse()
        this.naipe = paqueteA.concat(paqueteB);
            
    } else {
        if (cantidad < 0){
            
            cantidad = this.naipe.length + parseInt(cantidad);
            var paqueteA = this.naipe.slice(0,cantidad);
            var paqueteB = this.naipe.slice(cantidad);
            paqueteB = paqueteB.reverse();
            this.naipe = paqueteA.concat(paqueteB);
            
        }
    }
        return "invertir(" + cantidad + ")";
        
    }
}

// Faro Exterior
function faroExt(cantidad){
    var desde = 0;
    var barajaTemp = this.naipe.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.naipe.length || !cantidad){
        cantidad = this.naipe.length;
        total = true;
        
    } else {
        total = false;
    
    }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.naipe.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezccla
    for (var i = 0; i < cantidad ;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                this.naipe[(2*i) % (cantidad-1) + desde] = barajaTemp[i + desde]
            }       
        }else{
            this.naipe[(2*i) % cantidad + desde] = barajaTemp[i + desde]
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
    var barajaTemp = this.naipe.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.naipe.length || !cantidad){
        cantidad = this.naipe.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.naipe.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            this.naipe[(2*i+1) % (cantidad+1) + desde] = barajaTemp[i + desde]
        }else{
            this.naipe[(2*i+1) % (cantidad) + desde] = barajaTemp[i + desde]
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
    var barajaTemp = this.naipe.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.naipe.length || !cantidad){
        cantidad = this.naipe.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.naipe.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            if ( i < cantidad - 1 ){
                this.naipe[i + desde] = barajaTemp[(2*i) % (cantidad-1) + desde]
            }       
        }else{
            this.naipe[i + desde] = barajaTemp[(2*i) % cantidad + desde]
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
    var barajaTemp = this.naipe.slice();
    var total;
    
    // ¿Total o parcial?
    if (isNaN(cantidad) || Math.abs(cantidad) >= this.naipe.length || !cantidad){
        cantidad = this.naipe.length;
        total = true;
    } else {
        total = false;
        }
    
    // Si es negativo cuenta X cartas hasta Bottom
    if (cantidad < 0) {
        desde = this.naipe.length + cantidad -1;
        cantidad = Math.abs(cantidad);
    }
    
    // Realiza la mezcla
    for (var i = 0; i < cantidad;i++){
        if ( cantidad % 2 == 0 ){
            this.naipe[i + desde] = barajaTemp[(2*i+1) % (cantidad+1) + desde]
        }else{
            this.naipe[i + desde] = barajaTemp[(2*i+1) % (cantidad) + desde]
        }
    }
    
    if (total){
        return "antiFaroInt";
    } else {
        return "antiFaroExt("+cantidad+")";
    }    
    
}

// Mezcla pseudoaleatoria Fisher-Yates
function fisherYates(){

    var barajaTemp = this.naipe.slice();
    var n = this.naipe.length;
    var i;
    this.naipe = [];
    // While there remain elements to shuffle…
    while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);

        // And move it to the new array.
        this.naipe.push(barajaTemp.splice(i, 1)[0]);
    }
    
    return ("fisherYates");
    
}

// Mezcla pseudoaleatoria Durstenfeld
function durstenfeld(){
    
    var counter = this.naipe.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = this.naipe[counter];
        this.naipe[counter] = this.naipe[index];
        this.naipe[index] = temp;
    }
    
    return "durstenfeld";
}

// Mezcla speudoaleatoria Sattolo
function sattolo(){

     for (var i = 0; i < this.naipe.length - 1; i++) {
        var j = i + 1 + Math.floor(Math.random() * (this.naipe.length - i - 1));

        var temp = this.naipe[j];
        this.naipe[j] = this.naipe[i];
        this.naipe[i] = temp;
    }
    
    return "sattolo";
}