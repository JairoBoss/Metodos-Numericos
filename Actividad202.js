function funcionF(valorX, valorY) {
    return (Math.exp(valorY) - (valorX) - (1));
}

function funcionG(valorX, valorY) {
    return (Math.pow(valorX, 2) - valorY);
}

function inversa(matriz) {
    var temp,
        N = matriz.length,
        E = [];

    for (var i = 0; i < N; i++)
        E[i] = [];

    for (i = 0; i < N; i++)
        for (var j = 0; j < N; j++) {
            E[i][j] = 0;
            if (i == j)
                E[i][j] = 1;
        }

    for (var k = 0; k < N; k++) {
        temp = matriz[k][k];

        for (var j = 0; j < N; j++) {
            matriz[k][j] /= temp;
            E[k][j] /= temp;
        }

        for (var i = k + 1; i < N; i++) {
            temp = matriz[i][k];

            for (var j = 0; j < N; j++) {
                matriz[i][j] -= matriz[k][j] * temp;
                E[i][j] -= E[k][j] * temp;
            }
        }
    }

    for (var k = N - 1; k > 0; k--) {
        for (var i = k - 1; i >= 0; i--) {
            temp = matriz[i][k];

            for (var j = 0; j < N; j++) {
                matriz[i][j] -= matriz[k][j] * temp;
                E[i][j] -= E[k][j] * temp;
            }
        }
    }

    for (var i = 0; i < N; i++)
        for (var j = 0; j < N; j++)
            matriz[i][j] = E[i][j];
    return matriz;
}


function restaDeMatrices(mat1, mat2) {
    var result = [
        [],
        []
    ];
    let size1 = 2;
    let size2 = 2;
    for (let i = 0; i < size1; i++) {
        for (let j = 0; j < size2; j++) {
            result[i][j] = mat1[i][j] - mat2[i][j];
        }
    }
    return result;
}

function multiplicacionDeMatrices(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}



function solve(xI, yI, n_Max, tol) {
    let numeroDePasos = 1;
    let e = Math.exp(1);
    let matrizResultado = [];

    console.log('n-------------- xn -------------- yn');
    while (numeroDePasos <= n_Max) {
        let derivadaParcialFx = -1;
        let derivadaParcialFy = Math.pow(e, yI);
        let derivadaParcialGx = 2 * xI;
        let derivadaParcialGy = -1;
        let matrizDerivadas = [
            [derivadaParcialFx, derivadaParcialFy],
            [derivadaParcialGx, derivadaParcialGy]
        ];

        let matrizInversaDerivadas = inversa(matrizDerivadas);
        let temp = [
            [xI],
            [yI]
        ];

        let matrizFunciones = [
            [funcionF(xI, yI)],
            [funcionG(xI, yI)]
        ];

        let matrizMultiplicacionInversaFunciones = multiplicacionDeMatrices(matrizInversaDerivadas, matrizFunciones);

        let tempR = restaDeMatrices(temp, matrizMultiplicacionInversaFunciones);

        console.log(numeroDePasos+'-------------- '+xI+' -------------- ' + yI);
        if((Math.abs( 0.746882 - xI) < tol) && (Math.abs(0.557832 -yI ) < tol)){
            return ((tempR[0] +','+ tempR[1] + ' ' + numeroDePasos));
        }else{
            xI = tempR[0][0];
            yI = tempR[1][0];
            numeroDePasos += 1;
        }
                
    }
    
    //return ((r[0]  + ',' + r[1] + ' ' + n));
    return (`${toString(matrizResultado[0])} , ${toString(matrizResultado[1])}  ${toString(numeroDePasos)}.`);
    
}


console.log(solve(1/2,1/2,10000,0.000001));
