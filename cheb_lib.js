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
        //console.log(resul)
        resul = soma_escada(resul, range_val_1[a], range_val_2[a])
    }

    return resul
}

function diagonalLength2D(diagonalIndex ,rows, cols) {

    // faz o calulo de quantos elementos tem em uma diagonal de uma tabela
    const startRow = Math.max(0, diagonalIndex - (cols - 1));
    const endRow = Math.min(rows - 1, diagonalIndex);
    
    return endRow - startRow + 1;
}

function soma_escada(valores, passo, limite){

    // organiza os dados
    const chaves = Object.keys(valores);
    const novo_tamanho = chaves.length + limite-1
    const primeiro_val = Number(chaves[0])
    let index = primeiro_val+passo

    // faz a soma dos elementos no formato de uma diagonal
    let resul = {}
    for(let a=0;a<novo_tamanho;a++){
        let soma = 0

        for(let b=0;b<=limite-1;b++){
            let valor = valores[a-b+primeiro_val]

            // iguinora valores indefinidos 
            if ((!isNaN(valor))&&(valor !== undefined)){
                soma = soma + valor
            }
        }

        resul[index] = soma
        index = index+1
    }

    return resul

}

//console.log(Soma_range('1-10','1-10','1-10','1-10'))