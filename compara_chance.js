function compara_chance(dados_p1=[], bonus_p1=0, dados_p2=[], bonus_p2=0){

    // organiza e busca todos os dados necessarios e retorna um objeto
    function organiza_dados(dados=[],bonus=0){

        let resul = {
            bonus:bonus,
            lados_max:[],
            lados_min:[],
            dimensoes:[],
            valor_min:bonus,
            valor_max:bonus
        }

        // recebe os valores em pares ou trios que são separados em duas variaveis
        const Regex = /([0-9]+)[^0-9\n]+([0-9]+)([^0-9\n]+([0-9]+))?/

        let extra = 0

        for(let a=0;a<dados.length;a++){

            let Regex_$4 = Number(dados[a].replace(Regex, "$4"));
            let Regex_$1 = Number(dados[a].replace(Regex, "$1"));
            let Regex_$2 = Number(dados[a].replace(Regex, "$2"));

            if(Regex_$4 == 0){

                if(Regex_$1 < Regex_$2){
                    resul.lados_min[a+extra] = Regex_$1
                    resul.lados_max[a+extra] = Regex_$2
                }else{
                    resul.lados_min[a+extra] = Regex_$2
                    resul.lados_max[a+extra] = Regex_$1
                }

                resul.valor_min += resul.lados_min[a+extra]
                resul.valor_max += resul.lados_max[a+extra]
                resul.dimensoes[a+extra] = resul.lados_max[a+extra] - resul.lados_min[a+extra]+1

            }else{
                let b
                for(b=0;b<Regex_$1;b++){

                    if(Regex_$2 < Regex_$4){
                        resul.lados_min[a+extra+b] = Regex_$2
                        resul.lados_max[a+extra+b] = Regex_$4
                    }else{
                        resul.lados_min[a+extra+b] = Regex_$4
                        resul.lados_max[a+extra+b] = Regex_$2
                    }

                    resul.valor_min += resul.lados_min[a+extra+b]
                    resul.valor_max += resul.lados_max[a+extra+b]
                    resul.dimensoes[a+extra+b] = resul.lados_max[a+extra+b] - resul.lados_min[a+extra+b]+1
                }
                extra = extra+b-1
            }
        }

        return resul
    }

    // guarda os resultados
    let resul = {
        empate:0,
        possibilidades_p1:0,
        possibilidades_p2:0
    }

    // cria uma classe para os dados do dois jogadores
    let valores_p1 = organiza_dados(dados_p1,bonus_p1)
    let valores_p2 = organiza_dados(dados_p2,bonus_p2)

    let empate_min = menor_maior(valores_p1.lados_min, valores_p2.lados_min, false)
    let empate_max = menor_maior(valores_p1.lados_max, valores_p2.lados_max, true)
    let valor_empate = empate_max - empate_min+1

    let test = (valores_p1.dimensoes * valores_p2.dimensoes - valor_empate)/2

    resul.empate += valor_empate
    resul.possibilidades_p1 += test
    resul.possibilidades_p2 += test



    console.log(valores_p1)
    console.log(valores_p2)

    return resul
}

function menor_maior(val_1=0,val_2=0,menor=true){
    if(menor){
        if(val_1 > val_2){
            return val_2
        }else{
            return val_1
        }
    }else{
        if(val_1 < val_2){
            return val_2
        }else{
            return val_1
        }
    }
}

function Soma_Gauss(val_ini=0,val_final=0){
    return ((val_final-val_ini+1)*(val_ini+val_final)/2)
}

function diagonalLength2D(diagonalIndex ,rows, cols) {

    // faz o calulo de quantos elementos tem em uma diagonal de uma tabela
    const startRow = Math.max(0, diagonalIndex - (cols - 1));
    const endRow = Math.min(rows - 1, diagonalIndex);
    
    return endRow - startRow + 1;
}