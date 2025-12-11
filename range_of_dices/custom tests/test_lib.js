import * as lib_RoD from '../src/range_of_dices.js';
import * as lib_Roll from '../src/roll_dices.js';

function test(test){
    let text = test//document.getElementById("text").value

    text = lib_Roll.exec_lib_string(text)

    console.log(text)
}

test("roll(1d20 ,   1d2000)")
//console.log(lib_RoD.range("1d20_1"))

document.getElementById("execute").onclick = () => test();
