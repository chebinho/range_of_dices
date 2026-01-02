// cria um renge simples com o valor das possibilidades em um para todos os valores possiveis
export function simple_range(biggest_val=20, smaller_val=1, gap=1){

    if(biggest_val < smaller_val){
        let temp = biggest_val
        biggest_val = smaller_val
        smaller_val = temp
    }

    let resul = [[]]

    let b = 0
    for(let a=smaller_val;a<=biggest_val;a+=gap){
        resul[b] = [a,1]
        b+=1
    }

    return resul
}

// this function creates an array with the number of possibilities for each possible value
// the first value represents the “face” of a dice and the second value represents how many times that value appears
// and if there is more than one dice within the function, the values will all be added together
// ex: range("1d4") -> [[1,1], [2,1], [3,1], [4,1]]
export function range(...range){

    // This function is used to search for the sequence of ranges that, when added together, will return a sum of specific ranges
    // ex: smallest_sequence(1000) -> [4, 6, 7, 8, 9, 10]
    function smallest_sequence(valor = 0){
        if (valor < 1) return 0 // blocks negative values

        // obtain the smallest value closest to the sequence 2^0, 2^1, 2^2, 2^3, ...
        let min = Math.floor(Math.log2(valor))

        let resul = []
        resul[resul.length] = min+1

        // search for the previous remainder and repeat the previous calculation until the remainder becomes 0
        let resto = valor - (2**min)

        while(resto > 0){
            min = Math.floor(Math.log2(resto))
            resul[resul.length] = min+1

            resto = resto - (2**min)
        }

        return resul.reverse()
    }

    // separates the values received into three other numeric variables
    const Regex = /((-?\d+)d)?(-?\d+)(_(-?\d+))?/gm

    let resul = [[]]

    for(let a=0;a<range.length;a++){

        let amount = range[a].replace(Regex, "$2")
        let greater_val = Number(range[a].replace(Regex, "$3"))
        let lowest_val = range[a].replace(Regex, "$5")

        if(greater_val < lowest_val){
            let temp = greater_val
            greater_val = lowest_val
            lowest_val = temp
        }

        // correct the values obtained if necessary
        if((amount == "") || (amount <= 0)){
            amount = 1
        }else{
            amount = Number(amount)
        }
        if((lowest_val == "")){
            lowest_val = 1
        }else{
            lowest_val = Number(lowest_val)
        }

        // calculates the range in the correct format 
        if(amount == 1){
            // creates a simple temporary range and joins it with the result
            let range_temp = [[]]
            let c = 0
            for(let b=lowest_val;b<=greater_val;b++){
                range_temp[c] = [b,1]
                c+=1
            }

            resul = join_ranges(resul,range_temp)

        }else{
            // creates a simple temporary range
            let range_temp = [[]]
            let c = 0
            for(let b=lowest_val;b<=greater_val;b++){
                range_temp[c] = [b,1]
                c+=1
            }
            c = 0

            // search for the smallest sequence to make the range
            let sequence = smallest_sequence(amount)

            // adds up the equal multiples in the most efficient way possible
            if(sequence[0] == 1){
                resul = join_ranges(resul,range_temp)
                c = 1
            }

            for(let a=2;a<=sequence[sequence.length-1];a++){
                range_temp = join_ranges(range_temp,range_temp)
                
                if(a == sequence[c]){
                    resul = join_ranges(resul,range_temp)
                    c += 1
                }
            }
        }
    }

    return resul
}

export function join_ranges(range_1 = [[]], range_2 = [[]]) {

    // valida se os dados recebidos estão corretos, se não retorna um erro ou um resultado
    if (!Array.isArray(range_1[0]) || !Array.isArray(range_2[0])) return null;

    if( (!Array.isArray(range_1) && (!Array.isArray(range_2))) ){
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

    let sequence_r1 = []
    let sequence_r2 = []
    let resul = [[]]

    let lest_val = 0

    // define os valores possiveis para as faces
    let a 
    for(a=0;a<range_1.length;a++){
        resul[a] = [range_1[a][0] + range_2[0][0],0]

        // determina a diferença entre os valores
        sequence_r1[a] = range_1[a][0] - lest_val
        lest_val = range_1[a][0]
    }
    a -= 1
    lest_val = 0
    for(let b=0;b<range_2.length;b++){
        resul[b+a] = [range_1[a][0] + range_2[b][0],0]

        // determina a diferença entre os valores
        sequence_r2[b] = range_2[b][0] - lest_val
        lest_val = range_2[b][0]
    }

    // remove o primeiro valor invalido
    sequence_r1.shift()
    sequence_r2.shift()

    let temp_range_2 = []
    let espace_2 = 0
    for(let c=0;c<range_2.length;c++){

        // cria um array importate para o calculo
        let temp_range_1 = []

        let staps = 0
        for(let a=0;a<range_1.length;a++){

            temp_range_1[a + staps] = range_1[a][1] * range_2[c][1]

            if(sequence_r1[a] != undefined){
                for(let e=0;e<sequence_r1[a]-1;e++){
                    staps += 1
                    temp_range_1[a + staps] = 0
                }
            }
        }

        // faz a segunda parte do calculo
        for(let b=0;b<temp_range_1.length;b++){
            if(temp_range_2[b+espace_2] != undefined){
                temp_range_2[b+espace_2] += temp_range_1[b]
            }else{
                temp_range_2[b+espace_2] = temp_range_1[b]
            }
        }
        espace_2 += sequence_r2[c]
    }

    // remove os valores iguais a 0
    let count = 0
    for(let a=0;a<temp_range_2.length;a++){
        if(temp_range_2[a] != 0){
            resul[count][1] = temp_range_2[a]
            count += 1
        }
    }

    return resul
}

// faz a soma das possibilidades de dois ranges
// feito pelo chatgpt mas posteriormente adaptado
export function join_ranges_old(range_1 = [[]], range_2 = [[]]) {

    // valida se os dados recebidos estão corretos, se não retorna um erro ou um resultado
    if( (Array.isArray(range_1) && (Array.isArray(range_2))) == false){
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

// executes the functions of a string that are part of this library
export function exec_lib_string(text = ""){

    const allowedFunctions = {
        range,
        join_ranges
    };

    // Find any function in a string
    const Regex = /(\w*)\(([^()]*)\)/g;

    return text.replace(Regex, (match, fname, args) => {

        // Checks if the function exists in the list of allowed functions
        if (!allowedFunctions[fname]) {
            return match;
        }

        // Converts arguments separated by commas
        let argArray = args.split(",");

        resul = join_ranges(resul , allowedFunctions[fname](...argArray))
        //console.log(resul)


        // Execute the actual function
        return allowedFunctions[fname](...argArray)
    });

}