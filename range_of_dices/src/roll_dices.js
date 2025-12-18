// roll any dice one or more times.
export function roll_dice(amount=1, biggest_face=20, smaller_face=1){

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

    let resul = 0
    for(let a=0;a<amount;a++){
        resul = resul + Math.trunc((Math.random())*max)+min
    }
    return resul 
}

// roll any dice in advantage one or more times.
export function roll_vantage(amount=1, biggest_face=20, smaller_face=1){

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
export function roll_disvantage(amount=1, biggest_face=20, smaller_face=1){

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

    let resul = Math.trunc((Math.random())*max)+min
    for(let a=0;a<amount;a++){
        let new_roll = Math.trunc((Math.random())*max)+min
        if(resul > new_roll){
            resul = new_roll
        }
    }
    return resul
}

// solve any equation with a data rollover together.
// Ex: roll("1d20 + 10 - 1d6") --> 15 + 10 - 3 = 22
export function roll(...dices){

    const allowedFunctions = [
        roll_dice,
        roll_vantage,
        roll_disvantage,
    ];

    function exec_func_string(str){
        // Find any function in a string
        const Regex = /([a-zA-Z]\w*)\(([^()]*)\)/g;

        return str.replace(Regex, (match, fname, args) => {

            // Checks if the function exists in the list of allowed functions
            let find = false
            for(let a=0;a<allowedFunctions.length;a++){
                if(allowedFunctions[a].name === fname){
                    find = a
                }
            }
            if(find === false){
                return match;
            }

            // Converts arguments separated by commas
            let argArray = args.split(",").map(a => a.trim());

            // Replace empty elements with 1
            for(let a=0;a<argArray.length;a++){
                if(argArray[a] == ""){
                    argArray[a] = 1
                }
                argArray[a] = Number(argArray[a])
            }

            // Execute the actual function
            return allowedFunctions[find](...argArray)
        });
    }

    // Captures commands beginning with “dis” (disadvantage), extracting the numbers involved.
    // Ex: dis 1d20 | dis 3d10_1 
    const Regex_dis = /dis ?(\d+)d(-?\d+)(_(-?\d+))?/g
    // Capture commands beginning with “van” (advantage), extracting the numbers.
    // Ex: van 1d20 | van 3d10_1 
    const Regex_van = /van ?(\d+)d(-?\d+)(_(-?\d+))?/g
    // Captures the same numeric pattern, but without “van” or “dis” at the beginning.
    // Ex: 1d20 | 3d10_1 | 2d-20_-1
    const Regex_roll = /(\d+)d(-?\d+)(_(-?\d+))?/g

    let results = []
    for(let a=0;a<dices.length;a++){

        // converts the user's command into its respective function
        results[a] = dices[a].replace(Regex_dis, "roll_disvantage($1,$2,$4)")
        results[a] = results[a].replace(Regex_van, "roll_vantage($1,$2,$4)")
        results[a] = results[a].replace(Regex_roll, "roll_dice($1,$2,$4)")

        // execute the functions and replaces them with the results
        results[a] = exec_func_string(results[a])
        if(isNaN(results[a])){
            results[a] = results[a] + " = " + safe_math_eval(results[a])
        }
    }

    if(dices.length > 1){
        return results
    }else{
        return results[0]
    }
}

// solves a string equation into a result when possible.
export function safe_math_eval(text = ""){

    // Find mathematical expressions in parentheses, such as “(10 + 2 * 3)”. 
    const Regex_1 = /\(( *-?\d+(\.\d+)?(e[\+\-]?\d+)? *( *([\+\-\*\/\%]|\*\*) *-?\d+(\.\d+)?(e[\+\-]?\d+)?)* *)\)/g
    // Find mathematical expressions outside parentheses, such as “13 + 5 * 2.”
    const Regex_2 = /(-?\d+(\.\d+)?(e[\+\-]?\d+)?( *([\+\-\*\/\%]|\*\*) *-?\d+(\.\d+)?)+(e[\+\-]?\d+)?)/g

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

// executes the functions of a string that are part of this library
export function exec_lib_string(text = ""){

    const allowedFunctions = [
        roll_dice,
        roll_vantage,
        roll_disvantage,
        roll,
        safe_math_eval
    ]

    // Find any function in a string
    const Regex = /([a-zA-Z]\w*)\(([^()]*)\)/g;

    return text.replace(Regex, (match, fname, args) => {

        // Checks if the function exists in the list of allowed functions
        let find = false
        for(let a=0;a<allowedFunctions.length;a++){
            if(allowedFunctions[a].name === fname){
                find = a
            }
        }
        if(find === false){
            return match;
        }

        // Converts arguments separated by commas
        args = args.split(",").map(a => a.trim());

        // Execute the actual function
        return allowedFunctions[find](...args)
    });
    
}