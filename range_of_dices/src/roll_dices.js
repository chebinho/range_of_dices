// roll any dice
function roll_dice(amount=1, faces=20, min=1){
    let resul = 0
    for(let a=0;a<amount;a++){
        resul = resul + Math.trunc( (Math.random())*faces + min )
    }
    return resul
}

function roll_all(...dices){
    const Regex = /(-?[0-9]+)[^0-9\n\+\*\-]+(-?[0-9]+)([^0-9\n\+\*\-]+(-?[0-9]+))?/g
    
    let results = []

    for(let a=0;a<dices.length;a++){

        let val_1 = dices[a].replace(Regex, "$1")
        let val_2 = dices[a].replace(Regex, "$2")
        let val_3 = dices[a].replace(Regex, "$4")

        if(val_3 == ""){
            results[a] = roll_dice(val_1,val_2)
        }else{
            results[a] = roll_dice(val_1,val_2,val_3)
        }
        
    }

    if(dices.length == 0){
        return results
    }else{
        return results[0]
    }
}

console.log(roll_all("1d10+2+1d10"))
console.log(roll_dice(10, 10, 1))