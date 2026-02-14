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

    const Regex = /(van *|des *)?(\d+)d(-?\d+)(_(-?\d+))?/

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