function compara_chance(dados_p1=[], bonus_p1=0, dados_p2=[], bonus_p2=0){

    // organiza e busca todos os dados necessarios e retorna um objeto
    function organiza_dados(dados=[],bonus=0){

        let resul = {
            lados_max:[],
            lados_min:[],
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
                }
                extra = extra+b-1
            }
        }

        return resul
    }

    let valores_p1 = organiza_dados(dados_p1,bonus_p1)
    let valores_p2 = organiza_dados(dados_p2,bonus_p2)

    console.log(valores_p1)
    console.log(valores_p2)
    
    let result = {
        empate:0,
        possibilidades_p1:0,
        possibilidades_p2:0
    }

    return result
}

function Soma_Gauss(val_ini=0,val_final=0){
    return ((val_final-val_ini+1)*(val_ini+val_final)/2)
}