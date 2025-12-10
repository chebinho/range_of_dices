// faz um array com todas as possibilidades de um range de valores
// se existir mais de um range fornecido a função faz a soma das possibilidades
export function Calculo_em_Range(...range){

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
    const Regex = /(-?[0-9]+)[^0-9\n\-]+(-?[0-9]+)([^0-9\n\-]+(-?[0-9]+))?/

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
export function Soma_Ranges(range_1 = [[]], range_2=[[]]) {

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