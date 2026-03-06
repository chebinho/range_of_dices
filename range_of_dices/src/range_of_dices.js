import {find_parentheses, isNumber, isTextRange, isArrayRange} from './other_functions.js'

// create ranges =======================================================================================

// creates a simple range with the value of possibilities set to one value for all possibilities
export function range_simple(biggest_val=20, smaller_val=1, gap=1, possibility=1){

    // ensures that all values are numbers
    // if not, returns null 
    biggest_val = Number(biggest_val)
    smaller_val = Number(smaller_val)
    gap = Number(gap)

    if (!isNumber(biggest_val)) return null
    if (!isNumber(smaller_val)) return null
    if (!isNumber(gap)) return null

    let possi_num = true

    if (!isNumber(possibility)){
        if(!Array.isArray(possibility)) return null
        possi_num = false
    }

    // and ensures that biggest_val and smaller_val are correct
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
    let resul = []

    if(possi_num){

        let b = 0
        for(let a=smaller_val;a<=biggest_val;a+=gap){
            resul[b] = [a,possibility]
            b+=1
        }
    }else{

        let b = 0
        let c = 0
        for(let a=smaller_val;a<=biggest_val;a+=gap){
            if(possibility[c] === undefined){ c=0 }

            resul[b] = [a,possibility[c]]
            c+=1
            b+=1
        }
    }
    

    return resul
}

// fastest way for this library to make all combinations of several equal ranges
export function range_combine(amount=1,biggest_val, smaller_val=1, gap=1){

    // ensures that all values are numbers
    // if not, returns null 
    biggest_val = Number(biggest_val)
    smaller_val = Number(smaller_val)
    gap = Number(gap)
    amount = Number(amount)

    if (!isNumber(biggest_val)) return null
    if (!isNumber(smaller_val)) return null
    if (!isNumber(gap)) return null
    if (!isNumber(amount)) return null

    if(amount<0){
        amount = 0 - amount
    }

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

    // ensures that biggest_val and smaller_val are correct
    if(biggest_val < smaller_val){
        let temp = biggest_val
        biggest_val = smaller_val
        smaller_val = temp
    }

    let resul = []
    if(amount == 1){
        // make the range and joins it with the result
        resul = range_simple(biggest_val, smaller_val, gap)
    }else{

        let range_temp = range_simple(biggest_val,smaller_val,gap)
            
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

    return resul
}

// creates a simple range with the number of possibilities for an “advantage or disadvantage roll”
// basically calculates the number of possibilities for a person to roll one or more dice and
// take the highest value of the dice in the case of advantage or the lowest value in the case of disadvantage
export function range_van_or_dis(amount=1,biggest_val=20, smaller_val=1, gap=1, disadvantage=false){

    // ensures that all values are numbers
    // if not, returns null 
    amount = Number(amount)
    biggest_val = Number(biggest_val)
    smaller_val = Number(smaller_val)
    gap = Number(gap)

    if (!isNumber(amount)) return null;
    if (!isNumber(biggest_val)) return null;
    if (!isNumber(smaller_val)) return null;
    if (!isNumber(gap)) return null;

    // and ensures that biggest_val and smaller_val are correct
    if(biggest_val < smaller_val){
        let temp = biggest_val
        biggest_val = smaller_val
        smaller_val = temp
    }

    if(amount<0){
        amount = 0 - amount
    }

    // prevents the gap between values from being negative or 0
    if(gap==0){
        return Infinity
    }else if(gap<0){
        gap = 0 - gap
    }

    // performs the calculation that results in the possibilities of the advantage
    let num_values = biggest_val - smaller_val +1

    let temp_resul = [1]
    let values = [1]
    for(let a=1;a<num_values;a++){

        temp_resul[a] = (a+1)**(amount+1)
        values[a] = temp_resul[a] - temp_resul[a - 1];
    }

    // converts the advantage into a disadvantage if necessary 
    if(disadvantage === true){
        values.reverse()
    }
    
    // creates the range
    let resul = [[]]
    let b = 0
    for(let a=smaller_val;a<=biggest_val;a+=gap){
        resul[b] = [a,values[b]]
        b+=1
    }

    return resul
}
// Abbreviations for the previous function
export function range_vantage(amount=1,biggest_val=20, smaller_val=1, gap=1){
    return range_van_or_dis(amount,biggest_val, smaller_val, gap, false)
}
export function range_disvantage(amount=1,biggest_val=20, smaller_val=1, gap=1){
    return range_van_or_dis(amount,biggest_val, smaller_val, gap, true)
}

// converts a string with a range into an array of the range
export function string_to_range(string = ""){

    if (typeof string !== 'string') return string

    // Captures commands beginning with “dis” (disvantage), extracting the numbers involved.
    // Ex: dis 1d20 | dis 3d10_1 
    const Regex_dis = /dis *(\d+)d(-?\d+)(_(-?\d+))?(_(-?\d+))?/
    // Capture commands beginning with “van” (vantage), extracting the numbers.
    // Ex: van 1d20 | van 3d10_1 
    const Regex_van = /van *(\d+)d(-?\d+)(_(-?\d+))?(_(-?\d+))?/
    // Captures the same numeric pattern, but without “van” or “dis” at the beginning.
    // Ex: 1d20 | 3d10_1 | 2d-20_-1
    const Regex_combi = /(\d+)d(-?\d+)(_(-?\d+))?(_(-?\d+))?/

    let resul
    let resul_regex
    let not_van_or_dis = true

    resul_regex = string.match(Regex_van)
    if(resul_regex !== null){
        resul = range_vantage(
            resul_regex[1],
            resul_regex[2],
            resul_regex[4],
            resul_regex[6]
        )
        not_van_or_dis = false
    }

    resul_regex = string.match(Regex_dis)
    if(resul_regex !== null){
        resul = range_disvantage(
            resul_regex[1],
            resul_regex[2],
            resul_regex[4],
            resul_regex[6]
        )
        not_van_or_dis = false
    }

    if(not_van_or_dis){
        resul_regex = string.match(Regex_combi)
        if(resul_regex !== null){
            resul = range_combine(
                resul_regex[1],
                resul_regex[2],
                resul_regex[4],
                resul_regex[6]
            )
        }
    }

    return resul
}

// basically performs all calculations present in a string, including range simplificationss
export function range(...text){

    // solves equations containing simplified ranges or array ranges, but ignores parentheses
    function solve_range_equation(array){
        if(!Array.isArray(array)) return null

        // creates the op function to perform the calculation when necessary
        const op = {
            "+": (a, b) => join_ranges(a, b),
            "-": (a, b) => join_ranges(a, flip_range(b)),
            "*": (a, b) => join_ranges_all(a, b, "*"),
            "**": (a, b) => join_ranges_all(a, b, "**"),
            "/": (a, b) => join_ranges_all(a, b, "/"),
            "%": (a, b) => join_ranges_all(a, b, "%"),

            "+!": (a, b) => merge_ranges(a, b, "+"),
            "-!": (a, b) => merge_ranges(a, b, "-"),
            "*!": (a, b) => merge_ranges(a, b, "*"),
            "**!": (a, b) => merge_ranges(a, b, "**"),
            "/!": (a, b) => merge_ranges(a, b, "/"),
            "%!": (a, b) => merge_ranges(a, b, "%")
        }

        // defines the priority of executions
        const priority = {
            "+": 0,
            "-": 0,
            "*": 1,
            "**": 2,
            "/": 1,
            "%": 1,
            
            "+!": 0,
            "-!": 0,
            "*!": 1,
            "**!": 2,
            "/!": 1,
            "%!": 1
        }

        // validates whether the received array follows the correct pattern; if not, corrects it in the best possible way
        let alternate_rule = 1
        for(let a=0;a<array.length;a++){

            if(alternate_rule === 1){
                let test = false

                if(isNumber(array[a])){
                    test = true
                }else if(isTextRange(array[a])){
                    test = true
                }else if(isArrayRange(array[a])){
                    test = true
                }

                if(test === true){
                    alternate_rule = 2
                }else{
                    array.splice(a,1)
                    a-=1
                }

            }else{
                let test = false
                
                if(priority[array[a]] !== undefined){
                    test = true
                }

                if(test === true){
                    alternate_rule = 1
                }else{
                    array.splice(a,1)
                    a-=1
                }

            }
        }
        if(alternate_rule === 1){
            array.pop()
        }

        if(array.length == 1){
            if(isTextRange(array[0])) {
                return string_to_range(array[0])
            }else{
                return array[0]
            }
        }
        
        for(let b=2;b>=0;b--){ // repeat once for each priority
            for(let a=1;a<array.length;a+=2){ // checks when the calculation can be done
                if(priority[array[a]] === b){
                    array.splice(a-1, 3, op[array[a]](array[a-1], array[a+1]))
                    a -= 2
                }
            }
        }

        return array[0]
    }

    // searches for valid values and places each value in an array
    const Regex = /((van *|dis *)?(\d+)d(-?\d+)(_(-?\d+))?(_(-?\d+))?)|(\*\*|[\+\-\*\/\%]\!?)|(\()|(\))|(\d+(\.\d+)?(\e\d+)?)/g
    let resul = []

    for(let a=0;a<text.length;a++){
        if(typeof text[a] === 'string'){
            resul = resul.concat(text[a].match(Regex))

        }else if(isArrayRange(text[a])){
            resul = resul.concat([text[a]])
        }
    }

    // search for values between pairs of parentheses, after which the values are executed by the “solve_range_equation” function
    let no_parent = true
    let par = find_parentheses(resul)
    if(par.start == null) {
        no_parent = false
    }
    if(par.end == null) {
        no_parent = false
    }

    let guard = 0;
    while ((no_parent) && (guard++ < 1000)) {

        let temp_resul = solve_range_equation( resul.slice(par.start+1,par.end) )
        resul.splice(par.start,par.end+1, temp_resul)
        
        par = find_parentheses(resul)
        if(par.start == null) {
            no_parent = false
            par.start = 0
        }
        if(par.end == null) {
            no_parent = false
            par.end = resul.length
        }
    }

    return solve_range_equation(resul)
}

// edit ranges =======================================================================================

// all join_ranges functions... sum the possibilities of 2 ranges
// checks which is the best and fastest “join_ranges” function to solve the problem
export function join_ranges(range_1 = [[]], range_2 = [[]]){

    if(isTextRange(range_1)) {range_1 = string_to_range(range_1)}
    if(isTextRange(range_2)) {range_2 = string_to_range(range_2)}

    // checks if both ranges are indeed ranges
    let value_check = false
    if(!isArrayRange(range_1)){
        if(isNumber(range_1)){
            value_check = true
        }else{
            if(isArrayRange(range_2) || isNumber(range_2)){
                return range_2
            }else{
                return null
            }
        }
    }
    if(!isArrayRange(range_2)){
        if(isNumber(range_2)){
            if(value_check){
                return range_1 + range_2
            }else{
                return merge_range_and_number(range_1,range_2)
            }
        }else{
            return range_1
        }

    }
    if(value_check){
        return merge_range_and_number(range_2,range_1)
    }

    // checks if all values in a range have the same gap
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
export function join_ranges_all(range_1 = [[]], range_2 = [[]], operator = "+"){

    if(isTextRange(range_1)) {range_1 = string_to_range(range_1)}
    if(isTextRange(range_2)) {range_2 = string_to_range(range_2)}

    // creates the op function to perform the calculation when necessary
    const op = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "**": (a,b) => a ** b,
        "%": (a,b) => a % b,
        "/": (a,b) => a / b
    }[operator];
    if (!op) throw new Error("Invalid operator");

    // sempre itera no menor range
    if (range_1.length > range_2.length) {
        [range_1, range_2] = [range_2, range_1];
    }

    const obj_resul = Object.create(null);

    for(let b=0;b<range_2.length;b++){
        const vb = range_2[b][0];
        const cb = range_2[b][1];

        for(let a=0;a<range_1.length;a++){
            const sum = op(range_1[a][0], vb);
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

    if(isTextRange(range_1)) {range_1 = string_to_range(range_1)}
    if(isTextRange(range_2)) {range_2 = string_to_range(range_2)}

    // prevents the gap between values from being negative or 0
    if(gap==0){
        return Infinity
    }else if(gap<0){
        gap = 0 - gap
    }

    let r1_length = range_1.length
    let r2_length = range_2.length

    const r1 = range_1.map(v => v[1])
    const r2 = range_2.map(v => v[1])

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

// combines all values from two ranges into a single range,
// if there are values in the base, an operation will be performed. (default sum)
export function merge_ranges(range_1 = [[]], range_2 = [[]], operator="+"){

    if(isTextRange(range_1)) {range_1 = string_to_range(range_1)}
    if(isTextRange(range_2)) {range_2 = string_to_range(range_2)}

    if(isNumber(range_1)) {range_1 = Number(range_1)}
    if(isNumber(range_2)) {range_2 = Number(range_2)}

    // creates the op function to perform the calculation when necessary
    const op = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "**": (a,b) => a ** b,
        "x": (a,b) => a * b,
        "X": (a,b) => a * b,
        "%": (a,b) => a % b,
        "/": (a,b) => a / b
    }[operator];
    if (!op) throw new Error("Invalid operator");

    // checks if both ranges are indeed ranges
    let test = false
    if(!isArrayRange(range_1)){
        if(isNumber(range_1)){
            test = true
        }else{
            return null
        }
    }
    if(!isArrayRange(range_2)){
        if(isNumber(range_2)){
            if(test){
                return op(range_1,range_2)
            }else{
                return merge_range_and_number(range_1,range_2,operator)
            }
        }else{
            return null
        }

    }
    if(test){
        return merge_range_and_number(range_2,range_1,operator)
    }

    // forms the result following the following logic
    // when the “faces” of the range are equal, the op function is executed
    // if not, the value is simply added to the result 
    let index_range_1 = 0
    let index_range_2 = 0

    const max_range_1 = range_1.length
    const max_range_2 = range_2.length

    const resul = []

    while( (index_range_1<max_range_1)||(index_range_2<max_range_2) ){
        const [x1, v1] = (range_1[index_range_1] != undefined) ? range_1[index_range_1] : [Infinity]
        const [x2, v2] = (range_2[index_range_2] != undefined) ? range_2[index_range_2] : [Infinity]   

        if (x1 === x2) {
            resul.push([x1, op(v1, v2)])

            index_range_1++
            index_range_2++
        } else if (x1 < x2) {
            resul.push([x1, v1])

            index_range_1++
        } else {
            resul.push([x2, v2])

            index_range_2++
        }
    }
    return resul
}
// function that performs an operation on all values
export function merge_range_and_number(range = [[]], number = 1, operator="+"){

    if(isTextRange(range)) {range = string_to_range(range)}
    if(!isArrayRange(range)) {return null}

    if(isNumber(number)) {
        number = Number(number)
    }else{
        return range
    }

    // creates the op function to perform the calculation when necessary
    const op = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "**": (a,b) => a ** b,
        "x": (a,b) => a * b,
        "X": (a,b) => a * b,
        "%": (a,b) => a % b,
        "/": (a,b) => a / b
    }[operator];
    if (!op) throw new Error("Invalid operator");

    let resul = []
    for(let a=0;a<range.length;a++){
        resul[a] = [ op(range[a][0],number), range[a][1] ]
    }
    return resul
}

// flips the values in a range
export function flip_range(range = [[]]){

    if(isTextRange(range)) {range = string_to_range(range)}
    if(!isArrayRange(range)) {return range}

    range.reverse()

    for(let a=0;a<range.length;a++){
        range[a] = [ - range[a][0],range[a][1]]
    }

    return range

}

// convert data =======================================================================================

// Converts the values ​​in a range to percentages
export function range_to_percentage(Range = [[]]){
    if(isTextRange(Range)) {Range = string_to_range(Range)}

    let resul = [[]]

    // add up all possibilities to get the total
    let total_possib = 0 
    for(let a=0; a<Range.length; a++){
        total_possib = Range[a][1] + total_possib
    }

    // creates the response and converts it to a percentage
    for(let a=0; a<Range.length; a++){
        resul[a] = [Range[a][0], (Range[a][1]/total_possib)]
    }

    return resul
}

// creates an object with the sum of the possibilities that are negative, positive, zero, and the total
export function count_type_values(range = [[]]){

    if(isTextRange(range)) {range = string_to_range(range)}

    let resul = {
        negatives:0,
        positives:0,
        zeros:0,
        total:0
    }

    for(let a=0;a<range.length;a++){
        if(range[a][0]<0){
            resul.negatives += range[a][1]

        }else if(range[a][0]==0){
            resul.zeros += range[a][1]

        }else{
            resul.positives += range[a][1]

        }
    }

    resul.total = resul.negatives + resul.zeros + resul.positives

    return resul
}