import * as lib_RoD from '../src/index.js';
import * as lib_roll from '../src/roll_dices.js';

function test_1(haaa = 1){
    console.log(haaa)
    console.log(lib_RoD.Calculo_em_Range("4d10_1"))

    console.log(lib_RoD.Soma_Ranges(lib_RoD.Calculo_em_Range("2d10_1"),lib_RoD.Calculo_em_Range("2d10_1")))
    console.log(lib_roll.roll("1d20 + 10 - 1d6"))
}

function exec_func(str = ""){
    const allowedFunctions = {
        roll_dice,
        roll_vantage,
        roll_disvantage,
        roll,
        safe_math_eval
    };

    function exec_func_string(str){
        // Find any function in a string
        const Regex = /(\w*)\(([^)]*)\)/g;

        return str.replace(Regex, (match, fname, args) => {

            // Checks if the function exists in the list of allowed functions
            if (!allowedFunctions[fname]) {
                return match;
            }

            // Converts arguments separated by commas
            let argArray = args.split(",")

            // Execute the actual function
            return allowedFunctions[fname](...argArray)
        });
    }
}

document.getElementById("execute").onclick = () => test_1(10);