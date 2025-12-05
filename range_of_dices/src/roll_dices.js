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
function roll_advantage(amount=1, biggest_face=20, smaller_face=1){

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
function roll_disadvantage(amount=1, biggest_face=20, smaller_face=1){

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

    // search for this pattern: 1d10 / 1d-10_-1 / 2w20_1 / 10 anything 10 anything -10
    const Regex = /(-?[0-9]+)[^0-9\n\+\*\-]+(-?[0-9]+)([^0-9\n\+\*\-]+(-?[0-9]+))?/g

    console.log(dices[0].matchAll(Regex))

    for (const match of dices[0].matchAll(Regex)) {
        console.log(match);
        console.log(roll_dice(match[1],match[2],match[4]))
    }

    
    let results = []
    for(let a=0;a<dices.length;a++){

        let val_1 = dices[a].replace(Regex, "$1")
        let val_2 = dices[a].replace(Regex, "$2")
        let val_3 = dices[a].replace(Regex, "$4")

        results[a] = roll_dice(val_1,val_2,val_3)
    }

    if(dices.length == 0){
        return results
    }else{
        return results[0]
    }
}

//console.log(roll("1d10+2+1d10")
//console.log(roll_disadvantage(10, 10, 1))


/*
roll_dice\(([0-9\,\-]+)\)
roll_dice($1,$2,$4)
*/

//Atributo: DEX
//Valor: 14
//Atributo: INT
//Valor: 12

