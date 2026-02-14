import {isNumber, exec_string_fun} from './other_functions.js'

// roll any dice one or more times.
export function roll_dice(biggest_face=20, smaller_face=1, amount=1){

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
        resul = resul + Math.trunc((Math.random())*max)+min
    }
    return resul 
}

// roll any dice in advantage one or more times.
export function roll_vantage(biggest_face=20, smaller_face=1, amount=1){

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

    let resul = Math.trunc((Math.random())*max)+min
    for(let a=0;a<amount;a++){
        let new_roll = Math.trunc((Math.random())*max)+min
        if(resul < new_roll){
            resul = new_roll
        }
    }
    return resul
}

// roll any dice in disadvantage one or more times.
export function roll_disvantage(biggest_face=20, smaller_face=1, amount=1){

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

    let resul = Math.trunc((Math.random())*max)+min
    for(let a=0;a<amount;a++){
        let new_roll = Math.trunc((Math.random())*max)+min
        if(resul > new_roll){
            resul = new_roll
        }
    }
    return resul
}

// finds simplifications of the dices and converts them into the respective functions
// after that, the functions are executed and the results are replaced by the respective functions
export function roll_exec(...strings){

    if(Array.isArray(strings)){
        for(let a=0;a<strings.length;a++){
            if (typeof strings[a] !== 'string') return strings
        }
    }else if(typeof strings !== 'string'){
        return strings
    }

    const allowedFunctions = [
        roll_dice,
        roll_vantage,
        roll_disvantage,
    ];

    // Captures commands beginning with “dis” (disvantage), extracting the numbers involved.
    // Ex: dis 1d20 | dis 3d10_1 
    const Regex_dis = /dis *(\d+)d(-?\d+)(_(-?\d+))?/g
    // Capture commands beginning with “van” (vantage), extracting the numbers.
    // Ex: van 1d20 | van 3d10_1 
    const Regex_van = /van *(\d+)d(-?\d+)(_(-?\d+))?/g
    // Captures the same numeric pattern, but without “van” or “dis” at the beginning.
    // Ex: 1d20 | 3d10_1 | 2d-20_-1
    const Regex_roll = /(\d+)d(-?\d+)(_(-?\d+))?/g

    let resul = []
    for(let a=0;a<strings.length;a++){

        // converts the user's command into its respective function
        resul[a] = strings[a].replace(Regex_dis, "roll_disvantage($2,$4,$1)")
        resul[a] = resul[a].replace(Regex_van, "roll_vantage($2,$4,$1)")
        resul[a] = resul[a].replace(Regex_roll, "roll_dice($2,$4,$1)")

        // execute the functions and replaces them with the resul
        resul[a] = exec_string_fun(resul[a], allowedFunctions, 1)
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
            resul[a] = resul[a] + " = " + safe_math_eval(resul[a])
        }
    }

    if(strings.length > 1){
        return resul
    }else{
        return resul[0]
    }
}

// solves a string equation into a result when possible.
export function safe_math_eval(text = ""){

    // Find mathematical expressions in parentheses, such as “(10 + 2 * 3)”. 
    const Regex_1 = /\(( *-?\d+(\.\d+)?(e[\+\-]?\d+)? *( *(\*\*|[\+\-\*\/\%]) *-?\d+(\.\d+)?(e[\+\-]?\d+)?)* *)\)/g
    // Find mathematical expressions outside parentheses, such as “13 + 5 * 2".
    const Regex_2 = /(-?\d+(\.\d+)?(e[\+\-]?\d+)?( *(\*\*|[\+\-\*\/\%]) *-?\d+(\.\d+)?)+(e[\+\-]?\d+)?)/g

    let last_resul = ""
    let resul = text

    // solve all equations in parentheses until there are no more
    let guard = 0;
    while ((last_resul !== resul) && (guard++ < 100)) {
        last_resul = resul

        resul = resul.replace(Regex_1, (match) => {
            return eval(match)
        });
    }

    // take care of the rest
    resul = resul.replace(Regex_2, (match) => {
        return eval(match)
    });

    return resul
}