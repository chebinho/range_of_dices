import {isNumber, find_parentheses} from './other_functions.js'

// roll any dice one or more times.
export function roll_dice(biggest_face=20, smaller_face=1, amount=1){

    // ensures that all values are numbers
    // if not, returns null 
    biggest_face = Number(biggest_face)
    smaller_face = Number(smaller_face)
    amount = Number(amount)
    if (!isNumber(biggest_face)) return null
    if (!isNumber(smaller_face)) return null
    if (!isNumber(amount)) return null

    let max = 0
    let min = 0

    // corrects the values ​​that can be obtained
    if(biggest_face>smaller_face){
        max = (biggest_face - smaller_face)+1
        min = smaller_face
    }else{
        max = (smaller_face - biggest_face)+1
        min = biggest_face
    }

    if(amount < 1 ){amount = 1}

    let resul = 0
    for(let a=0;a<amount;a++){
        resul = resul + Math.trunc(Math.random()*max)+min
    }
    return resul 
}

// roll any dice in advantage one or more times.
export function roll_vantage(biggest_face=20, smaller_face=1, amount=1){

    // ensures that all values are numbers
    // if not, returns null 
    biggest_face = Number(biggest_face)
    smaller_face = Number(smaller_face)
    amount = Number(amount)
    if (!isNumber(biggest_face)) return null
    if (!isNumber(smaller_face)) return null
    if (!isNumber(amount)) return null

    let max = 0
    let min = 0

    // corrects the values ​​that can be obtained
    if(biggest_face>smaller_face){
        max = (biggest_face - smaller_face)+1
        min = smaller_face
    }else{
        max = (smaller_face - biggest_face)+1
        min = biggest_face
    }

    if(amount < 1 ){amount = 1}

    let resul = Math.trunc(Math.random()*max)+min
    for(let a=0;a<amount;a++){
        let new_roll = Math.trunc(Math.random()*max)+min
        if(resul < new_roll){
            resul = new_roll
        }
    }
    return resul
}

// roll any dice in disadvantage one or more times.
export function roll_disvantage(biggest_face=20, smaller_face=1, amount=1){

    // ensures that all values are numbers
    // if not, returns null 
    biggest_face = Number(biggest_face)
    smaller_face = Number(smaller_face)
    amount = Number(amount)
    if (!isNumber(biggest_face)) return null
    if (!isNumber(smaller_face)) return null
    if (!isNumber(amount)) return null

    let max = 0
    let min = 0

    // corrects the values ​​that can be obtained
    if(biggest_face>smaller_face){
        max = (biggest_face - smaller_face)+1
        min = smaller_face
    }else{
        max = (smaller_face - biggest_face)+1
        min = biggest_face
    }

    if(amount < 1 ){amount = 1}

    let resul = Math.trunc(Math.random()*max)+min
    for(let a=0;a<amount;a++){
        let new_roll = Math.trunc(Math.random()*max)+min
        if(resul > new_roll){
            resul = new_roll
        }
    }
    return resul
}

// finds simplifications of the dices and converts them into the respective functions
// after that, the functions are executed and the results are replaced by the respective functions
export function roll_exec(...strings){

    const Regex = /(van\s*|dis\s*)?\d+d-?\d+(_-?\d+)?(_-?\d+)?/g

    let resul = []
    for(let a=0;a<strings.length;a++){
        resul[a] = strings[a].replace(Regex, (match) => {
            return string_to_roll(match)
        })
    }

    if(strings.length > 1){
        return resul
    }else{
        return resul[0]
    }
}

// solve any equation with a data rollover together.
// Ex: roll("1d20 + 10 - 1d6") --> 15 + 10 - 3 = 22
export function roll(...strings){

    let resul = []
    for(let a=0;a<strings.length;a++){

        resul[a] = roll_exec(strings[a])
        if(!isNumber(resul[a])){
            resul[a] = resul[a] + " = " + exec_math(resul[a])
        }else{
            resul[a] = Number(resul[a])
        }
    }

    if(strings.length > 1){
        return resul
    }else{
        return resul[0]
    }
}

// solves a string equation into a result when possible.
export function exec_math(text = ""){

    function solve_range_equation(array){
        if(!Array.isArray(array)) return null

        // creates the op function to perform the calculation when necessary
        const op = {
            "+": (a,b) => a + b,
            "-": (a,b) => a - b,
            "*": (a,b) => a * b,
            "**": (a,b) => a ** b,
            "/": (a,b) => a / b,
            "%": (a,b) => a % b
        }

        // defines the priority of executions
        const priority = {
            "+": 0,
            "-": 0,
            "*": 1,
            "**": 2,
            "/": 1,
            "%": 1
        }

        // validates whether the received array follows the correct pattern; if not, corrects it in the best possible way
        let alternate_rule = 1
        for(let a=0;a<array.length;a++){

            if(alternate_rule === 1){
                let test = false

                if(isNumber(array[a])){
                    array[a] = Number(array[a])
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
                }else if(isNumber(array[a])){
                    if(array[a] < 0){
                        array[a] = Number(array[a])
                        array.splice(a,1,-array[a])
                        array.splice(a,0,"-")
                        test = true
                    }
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
            return array[0]
        }
        
        for(let b=2;b>=0;b--){ // repete uma vez para cada prioridade
            for(let a=1;a<array.length;a+=2){ // verifica quando é possivel fazer o calculo
                if(priority[array[a]] === b){
                    array.splice(a-1, 3, op[array[a]](array[a-1], array[a+1]))
                    a -= 2
                }
            }
        }

        return array[0]
    }

    const Regex = /(-?\d+(\.\d+)?(\e\d+)?)|(\*\*|[\+\-\*\/\%])|(\(|\))/g
    let resul = text.match(Regex)
    
    let no_parent = true
    let par = find_parentheses(resul)
    if(par.start == null) {
        no_parent = false
    }
    if(par.end == null) {
        no_parent = false
    }

    let guard = 0;
    while ((no_parent) && (guard++ < 100)) {

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

export function string_to_roll(string = ""){
    if (typeof string !== 'string') return string

    // Captures commands beginning with “dis” (disvantage), extracting the numbers involved.
    // Ex: dis 1d20 | dis 3d10_1 
    const Regex_dis = /dis\s*(\d+)d(-?\d+)(_(-?\d+))?/
    // Capture commands beginning with “van” (vantage), extracting the numbers.
    // Ex: van 1d20 | van 3d10_1 
    const Regex_van = /van\s*(\d+)d(-?\d+)(_(-?\d+))?/
    // Captures the same numeric pattern, but without “van” or “dis” at the beginning.
    // Ex: 1d20 | 3d10_1 | 2d-20_-1
    const Regex_roll = /(\d+)d(-?\d+)(_(-?\d+))?/

    let resul
    let resul_regex
    let not_van_or_dis = true

    resul_regex = string.match(Regex_van)
    if(resul_regex !== null){
        resul = roll_vantage(
            resul_regex[2],
            resul_regex[4],
            resul_regex[1]
        )
        not_van_or_dis = false
    }

    resul_regex = string.match(Regex_dis)
    if(resul_regex !== null){
        resul = roll_disvantage(
            resul_regex[2],
            resul_regex[4],
            resul_regex[1]
        )
        not_van_or_dis = false
    }

    if(not_van_or_dis){
        resul_regex = string.match(Regex_roll)
        if(resul_regex !== null){
            resul = roll_dice(
                resul_regex[2],
                resul_regex[4],
                resul_regex[1]
            )
        }
    }

    return resul
}