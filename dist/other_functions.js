// searches for a pair of parentheses and returns their position in an object
export function find_parentheses(array = []){
    let start = null
    let end = null

    for(let a=0;a<array.length;a++){

        if(array[a] === "("){
            start = a
        }else if(array[a] === ")"){
            end = a
            a = array.length+1
        }

    }
    return { start:start, end:end }
}

// validates whether a value is a number in the int or float standard
export function isNumber(value = 0){
    if(typeof value == 'boolean') return false
    if(value == null) return false
    if(Array.isArray(value)) return false
    return !Number.isNaN(Number(value))
}

// validates whether a string is within the text range pattern
export function isTextRange(string){

    if (typeof string !== 'string') return false

    const Regex = /(van\s*|dis\s*)?\d+d-?\d+(_-?\d+)?(_-?\d+)?/

    if(string.match(Regex) !== null){
        return true
    }else{
        return false
    }
}

// checks if an array is in the range pattern
export function isArrayRange(range){
    if(!Array.isArray(range)) return false
    if(range.length == 0) return false

    for(let a=0; a<range.length; a++){
        if(!Array.isArray(range[a])) return false
        if(!isNumber(range[a][0])) return false
        if(!isNumber(range[a][1])) return false
    }
    return true
}

// execute the functions present within a string and replace the function with the result
export function exec_string_fun(string = "", allowedFunctions = [Function], placeholder = ""){

    if (typeof string !== 'string') return string

    // Find any function in a string
    const Regex = /([a-zA-Z]\w*)\(([^()]*)\)/g

    // repeat the code until there are no changes in the result
    let last_resul = ""
    let limit = 1000
    while((last_resul != string) && limit--){
        last_resul = string

        string = string.replace(Regex, (match, fname, args) => {

            // Checks if the function exists in the list of allowed functions
            let find = -1
            for(let a=0;a<allowedFunctions.length;a++){
                if(allowedFunctions[a].name === fname){
                    find = a
                }
            }
            if(find === -1){
                return match;
            }

            // Converts arguments separated by commas
            args = args.split(",").map(a => a.trim())
            if(placeholder === ""){
                for(let a=0;a<args.length;a++){
                    if(args[a] == ""){
                        args.splice(a,1)
                        a-=1
                    }
                }
            }else{
                for(let a=0;a<args.length;a++){
                    if(args[a] == ""){
                        args[a] = placeholder
                    }
                }
            }
            for(let a=0;a<args.length;a++){
                if(isNumber(args[a])) {args[a] = Number(args[a])}
            }

            // Execute the actual function
            return allowedFunctions[find](...args)
        });
    }
    
    return string
}