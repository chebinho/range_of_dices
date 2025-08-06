function Soma_Range(...range){
    // recebe os valores em pares ou trios que são separados em duas variaveis
    const Regex = /(-?[0-9]+)[^0-9\n-]+(-?[0-9]+)([^0-9\n-]+(-?[0-9]+))?/

    // $1 = valor um do range ou quantidade de dados que seram jogados
    // $2 = valor dois ou um dependendo se o $4 existir
    // $4 = valor dois

    let range_val_1 = []
    let range_val_2 = []
    let dimensoes = []

    let extra = 0 //número de espaços extra necessário

    for(let a=0;a<range.length;a++){

        let Regex_$4 = Number(range[a].replace(Regex, "$4"));
        let Regex_$1 = Number(range[a].replace(Regex, "$1"));
        let Regex_$2 = Number(range[a].replace(Regex, "$2"));

        if(Regex_$4 == 0){

            if(Regex_$1 < Regex_$2){
                range_val_1[a+extra] = Regex_$1
                range_val_2[a+extra] = Regex_$2
            }else{
                range_val_1[a+extra] = Regex_$2
                range_val_2[a+extra] = Regex_$1
            }
            dimensoes[a+extra] = range_val_2[a+extra] - range_val_1[a+extra]+1

        }else{
            let b
            for(b=0;b<Regex_$1;b++){

                if(Regex_$2 < Regex_$4){
                    range_val_1[a+extra+b] = Regex_$2
                    range_val_2[a+extra+b] = Regex_$4
                }else{
                    range_val_1[a+extra+b] = Regex_$4
                    range_val_2[a+extra+b] = Regex_$2
                }

                dimensoes[a+extra+b] = range_val_2[a+extra+b] - range_val_1[a+extra+b]+1
            }
            extra = extra+b-1
        }
    }

    // cria o primeiro range de possibilidades 
    let resul = []
    for(let a=range_val_1[0];a<=range_val_2[0];a++){
        resul.push([a, 1]);
    }
    
    // acresenta as outras dimenções para o range se precisar
    for(let a=1;a<dimensoes.length;a++){
        //console.log(resul)
        resul = calulo_escada2(resul, range_val_1[a], range_val_2[a])
    }

    return resul

}

// faz a soma de elementos em um formato de escada 
// valores = objeto com as possibilidades de cada valor
// passo = valor minimo do range
// limite = valor maximo do range
function soma_escada(valores, range_min, range_max){

    // organiza os dados
    const chaves = Object.keys(valores);
    const novo_tamanho = chaves.length + range_max-1
    const primeiro_val = Number(chaves[0])
    let index = primeiro_val+range_min

    // faz a soma dos elementos no formato de uma diagonal
    let resul = {}
    for(let a=0;a<novo_tamanho;a++){
        let soma = 0

        for(let b=0;b<=range_max-1;b++){
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

// faz soma de todos os valores do objeto valores que são menores ou iguais que o comparador
// o objeto deve ser formado por numero:numero
function Soma_maiores_iguais(valores, comparador){ 

    const chaves = Object.keys(valores);
    let resul = 0

    for(let a=0;a<chaves.length;a++){

        if(Number(chaves[a]) <= comparador){
            resul = resul + valores[chaves[a]]
        }else{
            return resul
        }
    
    }

    return resul
}

//console.log(Soma_maiores_iguais(Soma_range('1-20','2d1-4'),3))
//console.log(Soma_range('1-20','1-4','1-4'))
//console.log(Soma_range('20/1','4/1','4/1'))
//console.log(Soma_range('1-20','2d1-4'))

function calulo_escada(valores, range_min, range_max){

    if(range_min>range_max){
        let a = range_min
        range_min = range_max
        range_max = a
    }

    // organiza os dados
    const range_val_2 = range_max-range_min+1
    const chaves = Object.keys(valores);
    const novo_tamanho = chaves.length + range_val_2-1
    let primeiro_val = Number(chaves[0])
    let index = primeiro_val+range_min

    //console.log(chaves)
    //console.log(novo_tamanho)
    //console.log(primeiro_val)
    //console.log(index)

    // faz a soma dos elementos no formato de uma diagonal
    let resul = {}
    for(let a=0;a<novo_tamanho;a++){
        let soma = 0

        for(let b=0;b<=range_val_2-1;b++){
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

function calulo_escada2(valores, range_min, range_max) {
    if(range_min>range_max){
        let a = range_min
        range_min = range_max
        range_max = a
    }

    // separa os dados prinipais
    const range_val_2 = range_max-range_min+1
    const novo_tamanho = valores.length + range_val_2-1
    let primeiro_val = valores[0][0]
    let index = primeiro_val+range_min

    // faz a soma dos elementos no formato de uma diagonal
    let resul = []

    for(let a=0;a<novo_tamanho;a++){
        let soma = 0

        const val_limite_1 = (resul.length+1)>=range_val_2? range_val_2 : resul.length+1
        const val_limite_2 = (valores.length-resul.length)> 0 ? 0 : resul.length-valores.length+1
        const limite = val_limite_1 - val_limite_2 

        console.log(limite)

        for(let b=0;b<limite;b++){
            soma += valores[b][1]
            //console.log(soma)
        }
        //console.log("===================================================")

        resul.push([index,soma])
        index = index+1
    }
    console.log("===================================================")

    return resul
}

let test = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1],
    [10, 1],
    [11, 1],
    [12, 1],
    [13, 1],
    [14, 1],
    [15, 1],
    [16, 1],
    [17, 1],
    [18, 1],
    [19, 1],
    [20, 1]
];

let test2 = calulo_escada2(test, -1, -10)
console.log(" - - - - - - - - - - - - - ")
let test3 = calulo_escada2(test2, -1, -10)
console.log(" - - - - - - - - - - - - - ")

console.log(test2)
console.log(" - - - - - - - - - - - - - ")
console.log(test3)
console.log(" - - - - - - - - - - - - - ")
console.log(calulo_escada2(calulo_escada2(test, 1, 10),1,10))