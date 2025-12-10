import * as lib_RoD from '../src/range_of_dices.js';
import * as lib_Roll from '../src/roll_dices.js';

function test_lib_Roll(){
    let text = document.getElementById("text").value

    function exec_func_string(str){
        // Find any function in a string
        const Regex = /(\w*)\(([^)]*)\)/g;

        return str.replace(Regex, (match, fname, args) => {

            // Checks if the function exists in the list of allowed functions
            if (!lib_Roll[fname]) {
                return match;
            }

            // Converts arguments separated by commas
            let argArray = args.split(",")

            // Execute the actual function
            return lib_Roll[fname](...argArray)
        });
    }

    console.log(exec_func_string(text))
}

document.getElementById("execute").onclick = () => test_lib_Roll();
