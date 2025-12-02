import * as lib_RoD from '../src/index.js';
import * as lib_roll from '../src/roll_dices.js';

function test_1(haaa = 1){
    console.log(haaa)
    console.log(lib_RoD.Calculo_em_Range("4d10_1"))

    console.log(lib_RoD.Soma_Ranges(lib_RoD.Calculo_em_Range("2d10_1"),lib_RoD.Calculo_em_Range("2d10_1")))
}

document.getElementById("execute").onclick = () => test_1(10);