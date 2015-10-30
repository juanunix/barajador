// Consctructor de la clase eyDeck!
// Autor: Ey Pacha! 
// 
function eyDeck(nombre,cantidad){
    
    this.nombre = nombre;
    this.cantidad = cantidad;
    
    for (var i = 0; i < cantidad; i++){
        
        this.naipe[i] = new naipe(i);
        
    }

}

function naipe(i){

    this.id = i;
    this.face = i;
    this.back = "dorso";
    this.crimp = false;
}

barajaActual = new eyDeck("actual",52);

alert(barajaActual.nombre); 