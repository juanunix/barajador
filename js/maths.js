// ¿Es par? 
isPair = function(n){

    return (n % 2 == 0);

}

// ¿Es impar? 
isOdd = function(n){

    return (n % 2 == 1);

}

// Minimo común múltiplo
lcm = function(o){
    for(var i, j, n, d, r = 1; (n = o.pop()) != undefined;)
        while(n > 1){
            if(n % 2){
                for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
                d = i <= j ? i : n;
            }
            else
                d = 2;
            for(n /= d, r *= d, i = o.length; i; !(o[--i] % d) && (o[i] /= d) == 1 && o.splice(i, 1));
        }
    return r;
};


// Máximo común divisor
gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

// Orden multiplicativo
mOrder = function (a, n){
    if (gcd(a, n) > 1){
        return 0;
    }else{
        var order = 1;
        var mod_exp = a;
        while(mod_exp != 1){
            order++;
            mod_exp = (mod_exp * a) % n;
        }
        return order;
    }
}

// Obtiene el producto de los ciclos de la permutación
function productoCiclos(orden){

tempO = orden.slice();
var e = 1;
var ciclos = [];
var producto = [];
    
do{

    // Rastrea un ciclo
    var ciclo = [e];
    var v = e;
    var max = 0;
    while (parseInt(orden[v-1]) != e || max > orden.length ){

     ciclo.push(orden[v-1]);
     tempO[v-1] = 0;
     v = orden[v-1];
     max++;

    }
    tempO[v-1] =  0;

    ciclos.push(ciclo.toString());
    producto.push(ciclo);

    do{e++} while(tempO[e-1] == 0);
        
} while (e <= orden.length);

    return producto;
}

// Eliminar elementos repetidos y unos
function delDuplicates(arr,unos) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
    
  if(unos && out[0] == 1){
    out.shift();
  }
  
  if(out.length == 0){
      out.push(1);
  }
  return out;
}

// Crea la partición a partir del array de sumandos. mult = true para representación multiplicativa
function partition(arr,mult){

    arr.sort(function(a, b){return b - a;});
    
    if(mult){
        var j = 1;
        out = [];
        for(var i=1;i<=arr.length;i++){

            if (arr[i] == arr[i-1]){

                j++;

            } else {

                if (j == 1) {

                    out.push(arr[i-1]);

                } else {

                    out.push(arr[i-1]+"·"+j);
                }

                j = 1;
            }
        }
    }
    
    return out;
    
}

// Left Circular Shift con registro variable
function leftCircularShift(num,bits){
    num = num.toString(2);
    num = parseInt(num.substr(1,num.length-1)+num.substr(0,1),2);
    num = parseInt(num,2);
    return num;
}