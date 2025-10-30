function Calculo_em_Range(...range){
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
        resul = calulo_escada(resul, range_val_1[a], range_val_2[a])
    }

    return resul
}

// faz a soma de elementos em um formato de escada 
// valores = objeto com as possibilidades de cada valor
// passo = valor minimo do range
// limite = valor maximo do range
function calulo_escada(valores, range_min, range_max) {
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
    let acrescimo = 0

    for(let a=0;a<novo_tamanho;a++){
        let soma = 0

        const val_limite_1 = (resul.length+1)>=range_val_2? range_val_2 : resul.length+1
        const val_limite_2 = (valores.length-resul.length)> 0 ? 0 : resul.length-valores.length+1
        const limite = val_limite_1 - val_limite_2 // o limite é o maximo de somas por valor
        //console.log(limite)

        if(a>range_val_2-1){
            acrescimo += 1
        }else if(acrescimo>0){
            acrescimo -= 1
        }

        for(let b=0;b<limite;b++){
            soma += valores[b+acrescimo][1]
            //console.log(b+acrescimo)
        }

        resul.push([index,soma])
        index = index+1
    }

    return resul
}

// busca dado dos array =======================================================================================

// faz soma de todos os valores do objeto valores que são menores ou iguais que o comparador
// o objeto deve ser formado por numero:numero
function Soma_maiores_iguais(valores, comparador){ 
    let resul = 0

    for(let a=0;a<valores.length;a++){

        if(valores[a][0] <= comparador){
            resul = resul + valores[a][1]
        }else{
            return resul
        }
    
    }

    return resul
}

// faz as somas dos valores dependendo do sinal atribuido para a posibilidade
function Soma_Sinais_Iguais(valores=[[]]){

    let resul = {
        negativos:0,
        positivos:0,
        zeros:0,
        total:0
    }

    for(let a=0;a<valores.length;a++){
        if(valores[a][0]<0){
            resul.negativos += valores[a][1]

        }else if(valores[a][0]==0){
            resul.zeros += valores[a][1]

        }else{
            resul.positivos += valores[a][1]

        }
    }

    resul.total = resul.negativos + resul.zeros + resul.positivos

    return resul
}

// edita os dados dos arrays =======================================================================================

// executa um calculo os valores de dois arrays 
function Resul_X_Resul(resul_1 = [[]], sinal="+",resul_2 = [[]]){

    // valida se os dados recebidos estão corretos, se não retorna um erro
    if( (Array.isArray(resul_1) || (Array.isArray(resul_2))) == false ){
        console.log("erro")
        return null
    }

    // variavel que armazenara o resultado final
    let resul_final = [[]]
    
    // verifica se existe a necessidade fazer o calculo para cada celula
    // se não ouver necesidade os dados são unidos na sequencia do menor para o maior
    if(resul_1[0][0] > resul_2[resul_2.length-1][0]){
        resul_final = resul_2.concat(resul_1)
        return resul_final
        
    }else if(resul_2[0][0] > resul_1[resul_1.length-1][0]){
        resul_final = resul_1.concat(resul_2)
        return resul_final
    }else{

        // código que faz o calculo nas partes necessarias
        let limi1 = resul_1.length-1
        let limi2 = resul_2.length-1
        let menor_val = (resul_1[0][0] < resul_2[0][0]) ? resul_1[0][0] : resul_2[0][0]
        let maior_val = (resul_1[limi1][0] > resul_2[limi2][0]) ? resul_1[limi1][0] : resul_2[limi2][0]

        let index_resul = 0
        let index_resul_1 = 0
        let index_resul_2 = 0

        for(let a=menor_val; a<=maior_val; a++){

            let valor = 0

            let test_resul_1 = index_resul_1<(limi1+1) ? (resul_1[index_resul_1][0] == a) : false
            let test_resul_2 = index_resul_2<(limi2+1) ? (resul_2[index_resul_2][0] == a) : false

            //console.log(index_resul_1+" - "+index_resul_2)
            //console.log((index_resul_1<(limi1+1)) +" - "+ (index_resul_2<(limi2+1)))
            //console.log(resul_1[index_resul_1][0] +" - "+ resul_2[index_resul_2][0])

            if(test_resul_1 == true){
                if(test_resul_2 == true){
                    valor = eval(resul_1[index_resul_1][1]+sinal+resul_2[index_resul_2][1])
                    resul_final[index_resul] = [a,valor]

                    index_resul_1 += 1
                    index_resul_2 += 1
                    index_resul += 1

                }else{
                    valor = resul_1[index_resul_1][1]
                    resul_final[index_resul] = [a,valor]

                    index_resul_1 += 1
                    index_resul += 1
                }
            }else{
                if(test_resul_2 == true){
                    valor = resul_2[index_resul_2][1]
                    resul_final[index_resul] = [a,valor]

                    index_resul_2 += 1
                    index_resul += 1
                }
            }
            //console.log(a+") "+test_resul_1 +" - "+ test_resul_2)
        }
        return resul_final
    }
}

console.log( Resul_X_Resul(Calculo_em_Range("1d10_1"),"+",Calculo_em_Range("3d5_3")) )



//console.log(Separa_sinal(Calculo_em_Range('1d20_1', '1d4/1', '1d-20/-1')))
//console.log(Soma_maiores_iguais(Calculo_em_Range('2d1_20'),2))
//console.log(calulo_escada('1_20','1_4','1_4'))
//console.log(calulo_escada('20/1','4/1','4/1'))
//console.log(calulo_escada('1_20','2d1_4'))