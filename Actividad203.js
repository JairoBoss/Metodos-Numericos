
function solveF(valordt,valorX, temp){  //Estas dos  funciones se ocupan para resolver las funciones matematica
    return (-valordt * Math.exp(-valorX) + valorX - temp); 
}

function solveFP(valordt, valorX){    
    return (valordt * Math.exp(-valorX) + 1);
}

function newton(valordt, segundo, inicio, toleranciaMaxima, pasosMaximos){
    let contador = 1;
    let aproximacion = 0;
    let inicioa = inicio;
        
    while (contador <= pasosMaximos){
        contador++;
        aproximacion = inicioa -solveF(valordt, inicioa, segundo) / solveFP(valordt, inicioa);        
        if(Math.abs(inicioa - aproximacion) < toleranciaMaxima){
            return aproximacion; //Si el error es menor a la tolerancia se retorna la aproximacion
        }else{
            inicioa = aproximacion; //El inicio lo igualomos con la aproximacion para que no se cicle en la siguiente vuelta
            contador++;            
        }
    }    
    return null;        
}

function act203(inicio, toleranciaMaxima, pasosMaximos){
    let dt = 1/pasosMaximos;
    let valores = [inicio];    
    let i = 1;
    while(i < pasosMaximos){
        valores[i+1] = (newton(dt, valores[i] ,valores[i],toleranciaMaxima,pasosMaximos));        
        i ++;
    }
    return valores;
}


let x = act203(0,0.000001,100);

console.log(x[100]);
