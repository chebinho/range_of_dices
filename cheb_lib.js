function Soma_range(...range){
    // recebe os valores em pares que são separa em duas variaveis
    const Regex = /([0-9]+)[^0-9]([0-9]+)/

    let range_val_1 = []
    let range_val_2 = []
    let meio_valor = []

    for(a=0;a<range.length;a++){
        range_val_1[a] = Number(range[a].replace(Regex, "$1"));
        range_val_2[a] = Number(range[a].replace(Regex, "$2"));
        meio_valor[a] = (range_val_2[a] + range_val_1[a])/2
    }

    // função para somar os valores dos arreys 
    function Soma(total, num) {
        return total + num;
    }
    let min_valor = range_val_1.reduce(Soma)
    let max_valor = range_val_2.reduce(Soma)

    let dimensoes = range_val_1.length

    // forma o resultado final
    let resul = []
    for(a=min_valor;a<max_valor+1;a++){

        resul["val_"+a] = "test"
    }

    console.log(range_val_1)
    console.log(range_val_2)
    console.log(meio_valor)

    console.log(min_valor)
    console.log(max_valor)

    console.log(dimensoes)

    console.log(resul)
    return resul
}

function valor_diagonal_2D(linha=1, coluna=1, diagonal=1){

    console.log(diagonal)

    return 1
}

function diagonalLength2D(rows, cols, diagonalIndex) {
    const minSum = 0;
    const maxSum = rows + cols - 2;

    if (diagonalIndex < minSum || diagonalIndex > maxSum) {
        return 0;
    }

    const startRow = Math.max(0, diagonalIndex - (cols - 1));
    const endRow = Math.min(rows - 1, diagonalIndex);
    
    return endRow - startRow + 1;
}



function getDiceSums(dice) {
    let results = { 0: 1 }; // Começamos com soma 0 com 1 forma

    for (let sides of dice) {
        let newResults = {};
        for (let sum in results) {
            for (let i = 1; i <= sides; i++) {
                let newSum = parseInt(sum) + i;
                newResults[newSum] = (newResults[newSum] || 0) + results[sum];
            }
        }
        results = newResults;
    }

    return results;
}

function getSumCombinationsForTwoDice(die1, die2) {
    const minSum = 2;
    const maxSum = die1 + die2;
    const minDie = Math.min(die1, die2);
    const maxDie = Math.max(die1, die2);
    
    const combinations = {};

    for (let sum = minSum; sum <= maxSum; sum++) {
        let count;
        if (sum <= minDie + 1) {
            count = sum - 1;
        } else if (sum <= maxDie + 1) {
            count = minDie;
        } else {
            count = die1 + die2 - sum + 1;
        }

        combinations[sum] = count;
    }

    return combinations;
}


console.log(getSumCombinationsForTwoDice(20, 4))
console.log(getDiceSums([20, 4]))
Soma_range2('1-20','1;4')
