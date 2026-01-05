// creates a simple range with the value of possibilities set to one value for all possibilities
export function simple_range(biggest_val=20, smaller_val=1, gap=1, possibility=1){

    // ensures that biggest_val and smaller_val are correct
    if(biggest_val < smaller_val){
        let temp = biggest_val
        biggest_val = smaller_val
        smaller_val = temp
    }

    // prevents the gap between values from being negative or 0
    if(gap==0){
        return Infinity
    }else if(gap<0){
        gap = 0 - gap
    }

    // creates the range
    let resul = [[]]
    let b = 0
    for(let a=smaller_val;a<=biggest_val;a+=gap){
        resul[b] = [a,possibility]
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
    // ((-?\d+)d)?(-?\d+)(\.\.\.(-?\d+))?(_(-?\d+))?

    let resul = [[]]

    for(let a=0;a<range.length;a++){

        let amount = range[a].replace(Regex, "$2")
        let greater_val = Number(range[a].replace(Regex, "$3"))
        let lowest_val = range[a].replace(Regex, "$5")

        // ensures that greater_val and lowest_val are correct
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

        if(amount == 1){
            // make the range and joins it with the result
            resul = join_ranges(resul,simple_range(greater_val,lowest_val))

        }else{

            let range_temp = simple_range(greater_val,lowest_val)
            
            // search for the smallest sequence to make the range
            let sequence = smallest_sequence(amount)

            // adds up the equal multiples in the most efficient way possible
            let c = 0
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

export function join_ranges(range_1 = [[]], range_2 = [[]]){
    // validates whether the received data is correct
    // if not, returns an error or one of the valid results
    if (!Array.isArray(range_1[0]) || !Array.isArray(range_2[0])) return null;
    if (!Number.isInteger(range_1[0][0])) return range_2;
    if (!Number.isInteger(range_2[0][0])) return range_1;

    function density(range){
        let first_val = range[1][0] - range[0][0]

        let resul = first_val

        for(let a=2;a<range.length;a++){
            if((range[a][0] - range[a-1][0]) != first_val){
                resul = false
                a = range.length
            }
        }

        return resul
    }

    let test = density(range_1)
    if (test === false) return join_ranges_all(range_1,range_2)

    if(test === density(range_2)){
        return join_ranges_fast(range_1,range_2,test)
    }else{
        return join_ranges_all(range_1,range_2)
    }
}

export function join_ranges_all(range_1 = [[]], range_2 = [[]]){
    // sempre itera no menor range
    if (range_1.length > range_2.length) {
        [range_1, range_2] = [range_2, range_1];
    }

    const obj_resul = Object.create(null);

    for(let b=0;b<range_2.length;b++){
        const vb = range_2[b][0];
        const cb = range_2[b][1];

        for(let a=0;a<range_1.length;a++){
            const sum = range_1[a][0] + vb;
            obj_resul[sum] = (obj_resul[sum] || 0) + range_1[a][1] * cb;

        }
    }

    // converts the result object into the standard range array
    const keys = Object.keys(obj_resul)
    keys.sort(function(a, b) { return a - b; })
    
    let resul = [[]]
    for(let a=0;a<keys.length;a++){
        const k = +keys[a];
        resul[a] = [k, obj_resul[keys[a]]]
    }

    return resul
}

export function join_ranges_fast(range_1 = [[]], range_2 = [[]], gap = 1){

    let r1_length = range_1.length
    let r2_length = range_2.length

    const r1 = range_1.map(v => v[1]);
    const r2 = range_2.map(v => v[1]);

    let new_size = r1_length + r2_length -1
    let smaller_val = range_1[0][0] + range_2[0][0]

    let resul = new Array()

    let b = smaller_val
    for(let a=0;a<new_size;a++){

        const iStart = Math.max(0, a - (r2_length - 1));
        const iEnd = Math.min(r1_length - 1, a);
        let soma = 0

        for (let i = iStart; i <= iEnd; i++) {
            soma += r1[i] * r2[a - i];
        }

        resul[a] = [b,soma]
        b += gap
    }

    return resul
}
console.log(join_ranges(simple_range(20,1),simple_range(10,1)))


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