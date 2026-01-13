export function exec_lib_string(text = "", allowedFunctions = []){

    // valida os valores recebidos
    for(let a=0;a<allowedFunctions.length;a++){
        if(typeof allowedFunctions[a] !== 'function'){
            return text
        }
    }
    
    text = String(text)

    // Find any function in a string
    const Regex = /([a-zA-Z]\w*)\(([^()]*)\)/g

    // repeat the code until there are no changes in the result
    let last_resul = ""
    let limit = 1000
    while((last_resul != text) && limit--){
        last_resul = text

        text.replace(Regex, (match, fname, args) => {

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

            console.log(match)
            console.log(fname)
            console.log(args)

        });

    }

    return text
}