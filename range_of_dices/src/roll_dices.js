// roll any dice one or more times.
function roll_dice(amount=1, biggest_face=20, smaller_face=1){

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
function roll_vantage(amount=1, biggest_face=20, smaller_face=1){

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
function roll_disvantage(amount=1, biggest_face=20, smaller_face=1){

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

function roll(...dices){

    const allowedFunctions = {
        roll_dice,
        roll_vantage,
        roll_disvantage,
    };

    function exec_func_string(str){
        const callRegex = /(\w*)\(([^)]*)\)/g;

        return str.replace(callRegex, (match, fname, args) => {

            // Verifica se a função existe na lista de permitidas
            if (!allowedFunctions[fname]) {
                return match; // mantém como texto se não for permitida
            }

            // Converte os argumentos separados por vírgula
            let argArray = args.split(",")

            // substituir os elementos vazios por 1
            for(let a=0;a<argArray.length;a++){
                if(argArray[a] == ""){
                    argArray[a] = 1
                }
                argArray[a] = Number(argArray[a])
            }

            // Executa a função real
            return allowedFunctions[fname](...argArray)
        });
    }

    // search for this pattern: 1d10 / des1d-10_-1 / van 2w20_1 / 10 anything 10 anything -10
    const Regex_dis = /dis ?(\d+)[^0-9\n\+\*-\\]+(-?\d+)([^0-9\n\+\*-\\]+(-?\d+))?/g
    const Regex_van = /van ?(\d+)[^0-9\n\+\*-\\]+(-?\d+)([^0-9\n\+\*-\\]+(-?\d+))?/g
    const Regex_roll = /(\d+)[^0-9\n\+\*-\\]+(-?\d+)([^0-9\n\+\*-\\]+(-?\d+))?/g

    let results = []
    for(let a=0;a<dices.length;a++){

        results[a] = dices[a].replace(Regex_dis, "roll_disvantage($1,$2,$4)")
        results[a] = results[a].replace(Regex_van, "roll_vantage($1,$2,$4)")
        results[a] = results[a].replace(Regex_roll, "roll_dice($1,$2,$4)")

        results[a] = exec_func_string(results[a])
        results[a] = results[a] + " = " + eval(results[a].toString())
    }

    if(dices.length == 0){
        return results
    }else{
        return results[0]
    }
}

console.log(roll("1d20_1 + 1d12"))
//console.log(roll_disadvantage(10, 10, 1))

// safe eval = (\(?[0-9\+\-\*]+\)?)

// (des ?|van ?)?([0-9]+)[^0-9\n\+\*-\\]+(-?[0-9]+)([^0-9\n\+\*-\\]+(-?[0-9]+))?
