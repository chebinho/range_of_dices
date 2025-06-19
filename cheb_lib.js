function Soma_range(...range){
    // recebe os valores em pares que são separados em duas variaveis
    const Regex = /([0-9]+)[^0-9]([0-9]+)/

    let range_val_1 = []
    let range_val_2 = []
    let dimensoes = []

    for(let a=0;a<range.length;a++){
        range_val_1[a] = Number(range[a].replace(Regex, "$1"));
        range_val_2[a] = Number(range[a].replace(Regex, "$2"));
        dimensoes[a] = range_val_2[a] - range_val_1[a]+1
    }

    // retorna caso só seja passado um par de valores
    if(range.length == 1){
        let resul = {}
        for(let a=range_val_1[0];a<=range_val_2[0];a++){
            resul[a] = 1
        }
        return resul
    }

    // forma o resultado com duas dimenções
    let min_valor = range_val_1[0] + range_val_1[1]
    let max_valor = range_val_2[0] + range_val_2[1]

    let resul = {}
    for(let a=min_valor;a<max_valor+1;a++){
        resul[a] = diagonalLength2D(a-min_valor, dimensoes[0], dimensoes[1])
    }

    // faz a soma das outras dimenções se precisar
    for(let a=2;a<dimensoes.length;a++){
        resul = soma_escada(resul, range_val_1[a], range_val_2[a])
    }

    return resul
}

function diagonalLength2D(diagonalIndex ,rows, cols) {

    const startRow = Math.max(0, diagonalIndex - (cols - 1));
    const endRow = Math.min(rows - 1, diagonalIndex);
    
    return endRow - startRow + 1;
}

function soma_escada(valores, passo, limite){

    const chaves = Object.keys(valores);
    const novo_tamanho = chaves.length + limite-1
    let index = Number(chaves[0])+passo

    //console.log(chaves)

    let resul = {}
    for(let a=0;a<novo_tamanho;a++){
        let soma = 0


        resul[index] = 0
        index = index+1
    }

    console.log(resul)

    return valores

}


function getDiceSums(dice) {
    let results = { 0: 1 }; // Começamos com soma 0 com 1 forma

    for (let sides of dice) {
        let newResults = {};
        for (let sum in results) {
            for (let i = 1; i <= sides; i++) {
                let newSum = parseInt(sum) + i;
                newResults[newSum] = (newResults[newSum] || 0) + results[sum];
                //console.log("test")
            }
        }
        results = newResults;
    }

    return results;
}

console.log(getDiceSums([20,4,4]))
console.log(Soma_range('1-20','1-4','1-4'))
