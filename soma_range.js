// faz um array com todas as possibilidades de um range de valores
// se existir mais de um range fornecido a função faz a soma das possibilidades
function Calculo_em_Range(...range){

    function menor_sequencia(valor = 0){
        if (valor < 1) return 0 // remove valores negativos

        // obtem o menor valor mais proximo dentro da sequencia 2^0,2^1,2^2,2^3,...
        let min = Math.floor(Math.log2(valor))

        let resul = []
        resul[resul.length] = min+1

        // busca o resto anterior e repete o calculo anterior até que o resto vire 0
        let resto = valor - (2**min)

        while(resto > 0){
            min = Math.floor(Math.log2(resto))
            resul[resul.length] = min+1

            resto = resto - (2**min)
        }

        return resul.reverse()
    }

    // recebe os valores em pares ou trios que são separados em duas variaveis
    const Regex = /(-?[0-9]+)[^0-9\n-]+(-?[0-9]+)([^0-9\n-]+(-?[0-9]+))?/

    // $1 = valor um do range ou quantidade de dados que seram jogados
    // $2 = valor dois ou um dependendo se o $4 existir
    // $4 = valor dois

    let resul = [[]]

    for(let a=0;a<range.length;a++){

        let Regex_$4 = range[a].replace(Regex, "$4");
        let Regex_$1 = Number(range[a].replace(Regex, "$1"));
        let Regex_$2 = Number(range[a].replace(Regex, "$2"));

        if(Regex_$4 == ""){

            let menor_val = 0
            let maior_val = 0

            // verifica qual é o maior e menor valor
            if(Regex_$1 < Regex_$2){
                menor_val = Regex_$1
                maior_val = Regex_$2
            }else{
                menor_val = Regex_$2
                maior_val = Regex_$1
            }
            
            // cria uma range temporario simples e une ele com o resul
            let range_temp = [[]]
            let c = 0
            for(let b=menor_val;b<=maior_val;b++){
                range_temp[c] = [b,1]
                c+=1
            }

            resul = Soma_Ranges(resul,range_temp)

        }else{
            Regex_$4 = Number(Regex_$4)

            let menor_val = 0
            let maior_val = 0
            let sequencia = menor_sequencia(Regex_$1)

            // verifica qual é o maior e menor valor
            if(Regex_$2 < Regex_$4){
                menor_val = Regex_$2
                maior_val = Regex_$4
            }else{
                menor_val = Regex_$4
                maior_val = Regex_$2
            }

            // cria uma range temporario simples
            let range_temp = [[]]
            let c = 0
            for(let b=menor_val;b<=maior_val;b++){
                range_temp[c] = [b,1]
                c+=1
            }
            c = 0

            // faz a soma dos multiplos rangens da forma mais eficiente possivel
            if(sequencia[0] == 1){
                resul = Soma_Ranges(resul,range_temp)
                c = 1
            }

            for(let a=2;a<=sequencia[sequencia.length-1];a++){
                range_temp = Soma_Ranges(range_temp,range_temp)
                
                if(a == sequencia[c]){
                    resul = Soma_Ranges(resul,range_temp)
                    c += 1
                }
            }

            return resul

        }

    }

    return resul
}

// faz a soma das possibilidades de dois ranges
// feito pelo chatgpt mas posteriormente adaptado
function Soma_Ranges(range_1 = [[]], range_2=[[]]) {

    // valida se os dados recebidos estão corretos, se não retorna um erro ou um resultado
    if( (Array.isArray(range_1) && (Array.isArray(range_2))) == false ){
        return null
    }else if(Number.isInteger(range_1[0][0]) == false){
        if(Number.isInteger(range_2[0][0]) == false){
            return null
        }else{
            return range_2
        }
    }else if(Number.isInteger(range_2[0][0]) == false){
        if(Number.isInteger(range_1[0][0]) == false){
            return null
        }else{
            return range_1
        }
    }

    const n = range_1.length;  // número de linhas
    const m = range_2.length;  // número de colunas
    let resul = [[]]

    const valor_min = range_1[0][0] + range_2[0][0] // menor valor base do resultado
    let contador = 0
    // 1 Diagonais que começam na primeira coluna (de baixo para cima)
    for (let startRow = n - 1; startRow >= 0; startRow--) {
        let soma = 0;
        let i = startRow, j = 0;
        while (i < n && j < m) {
            soma += range_1[i][1] * range_2[j][1];
            i++;
            j++;
        }
        
        resul[contador] = [valor_min+contador,soma]
        contador+=1
    }

    // 2 Diagonais que começam na primeira linha (da segunda coluna em diante)
    for (let startCol = 1; startCol < m; startCol++) {
        let soma = 0;
        let i = 0, j = startCol;
        while (i < n && j < m) {
            soma += range_1[i][1] * range_2[j][1];
            i++;
            j++;
        }
        resul[contador] = [valor_min+contador,soma]
        contador+=1
    }

    return resul;
}

// busca dado dos array =======================================================================================

// faz soma de todos os range do objeto range que são menores ou iguais que o comparador
// o objeto deve ser formado por numero:numero
function Soma_maiores_iguais(range, comparador){ 
    let resul = 0

    for(let a=0;a<range.length;a++){

        if(range[a][0] <= comparador){
            resul = resul + range[a][1]
        }else{
            return resul
        }
    
    }

    return resul
}

// faz as somas dos ranges dependendo do sinal atribuido para a posibilidade
function Soma_Sinais_Iguais(range=[[]]){

    let resul = {
        negativos:0,
        positivos:0,
        zeros:0,
        total:0
    }

    for(let a=0;a<range.length;a++){
        if(range[a][0]<0){
            resul.negativos += range[a][1]

        }else if(range[a][0]==0){
            resul.zeros += range[a][1]

        }else{
            resul.positivos += range[a][1]

        }
    }

    resul.total = resul.negativos + resul.zeros + resul.positivos

    return resul
}

// converte os valores de um range em porcentagens
function Converte_em_Porcentagem(Range){
    let resul = [[]]

    // busca o total de possibilidades
    let soma_possibi = 0 
    for(let a=0; a<Range.length; a++){
        soma_possibi = Range[a][1] + soma_possibi
    }

    // cria a resposta e faz o calcula da porcentagem
    for(let a=0; a<Range.length; a++){
        let porcentagem = (Range[a][1]/soma_possibi)*100
        resul[a] = [Range[a][0], porcentagem]
    }

    return resul
}


// edita os dados dos arrays =======================================================================================

//converte um range para uma convolução
function toConvolutionForm(Range = [[]]){
    let resul = []

    for(let a=0; a<Range.length; a++){
        resul[a] = Range[a][0]*Range[a][1]
    }

    return resul
}

// executa um calculo para cada igualdade entre os ranges
function Range_X_Range(Range_1 = [[]], sinal="+",Range_2 = [[]]){

    // valida se os dados recebidos estão corretos, se não retorna um erro
    if( (Array.isArray(Range_1) && (Array.isArray(Range_2))) == false ){
        console.log("erro")
        return null
    }

    // variavel que armazenara o resultado final
    let resul_final = [[]]
    
    // verifica se existe a necessidade fazer o calculo para cada celula
    // se não ouver necesidade os dados são unidos na sequencia do menor para o maior
    if(Range_1[0][0] > Range_2[Range_2.length-1][0]){
        resul_final = Range_2.concat(Range_1)
        return resul_final
        
    }else if(Range_2[0][0] > Range_1[Range_1.length-1][0]){
        resul_final = Range_1.concat(Range_2)
        return resul_final
    }else{

        // código que faz o calculo nas partes necessarias
        let limi1 = Range_1.length-1
        let limi2 = Range_2.length-1
        let menor_val = (Range_1[0][0] < Range_2[0][0]) ? Range_1[0][0] : Range_2[0][0]
        let maior_val = (Range_1[limi1][0] > Range_2[limi2][0]) ? Range_1[limi1][0] : Range_2[limi2][0]

        let index_resul = 0
        let index_Range_1 = 0
        let index_Range_2 = 0

        for(let a=menor_val; a<=maior_val; a++){

            let valor = 0

            let test_Range_1 = index_Range_1<(limi1+1) ? (Range_1[index_Range_1][0] == a) : false
            let test_Range_2 = index_Range_2<(limi2+1) ? (Range_2[index_Range_2][0] == a) : false

            //console.log(index_Range_1+" - "+index_Range_2)
            //console.log((index_Range_1<(limi1+1)) +" - "+ (index_Range_2<(limi2+1)))
            //console.log(Range_1[index_Range_1][0] +" - "+ Range_2[index_Range_2][0])

            if(test_Range_1 == true){
                if(test_Range_2 == true){
                    valor = eval(Range_1[index_Range_1][1]+sinal+Range_2[index_Range_2][1])
                    resul_final[index_resul] = [a,valor]

                    index_Range_1 += 1
                    index_Range_2 += 1
                    index_resul += 1

                }else{
                    valor = Range_1[index_Range_1][1]
                    resul_final[index_resul] = [a,valor]

                    index_Range_1 += 1
                    index_resul += 1
                }
            }else{
                if(test_Range_2 == true){
                    valor = Range_2[index_Range_2][1]
                    resul_final[index_resul] = [a,valor]

                    index_Range_2 += 1
                    index_resul += 1
                }
            }
            //console.log(a+") "+test_Range_1 +" - "+ test_Range_2)
        }
        return resul_final
    }
}

// testes =======================================================================================

function test(val){
    for(let a=1;a<=val;a++){
        console.log(Calculo_em_Range(a+"d4/1"))
    }
}

//console.log(Converte_em_Porcentagem(Calculo_em_Range("10d20_1")))

//console.log( Range_X_Range(Calculo_em_Range("1d10_1"),"+",Calculo_em_Range("3d3_1")) )

//console.log(Separa_sinal(Calculo_em_Range('1d20_1', '1d4/1', '1d-20/-1')))
//console.log(Soma_maiores_iguais(Calculo_em_Range('2d1_20'),2))
//console.log(calulo_escada('1_20','1_4','1_4'))
//console.log(calulo_escada('20/1','4/1','4/1'))
//console.log(calulo_escada('1_20','2d1_4'))