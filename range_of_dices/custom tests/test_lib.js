import * as lib_RoD from '../src/range_of_dices.js';
import * as lib_Roll from '../src/roll_dices.js';
import {exec_lib_string} from '../src/exec_lib_string.js'

function test(test){

    let text = document.getElementById("text").value

    text = lib_Roll.exec_lib_string(text)

    console.log(text)
}

//test("roll(1d20+5)")
//console.log(lib_RoD.range("1d20_1"))

console.log(exec_lib_string("join_ranges(simple_range(20),simple_range(20))", lib_RoD))

function outro_test(){
    //lib_RoD.convolve(lib_RoD.range("200d20"),lib_RoD.range("200d20"))
    console.log(lib_RoD.range("400d20"))
}

document.getElementById("execute").onclick = () => test();
document.getElementById("test").onclick = () => outro_test();
