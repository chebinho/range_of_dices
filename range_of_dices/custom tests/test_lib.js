import * as lib_RoD from '../src/range_of_dices.js';
import * as lib_Roll from '../src/roll_dices.js';

function test(test){

    let text = document.getElementById("text").value
    let last_resul = ""

    while(last_resul != text){
        last_resul = text

        text = lib_Roll.exec_lib_string(text)
    }

    //text = lib_RoD.exec_lib_string(text)

    console.log(text)
}

//test("roll(1d20+5)")
//console.log(lib_RoD.range("1d20_1"))

document.getElementById("execute").onclick = () => test();
