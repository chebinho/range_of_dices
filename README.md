# o que a lib faz:

essa lib foi feita para facilitar o calculo de possibilidades para cada jogada de dados

Para a lib fazer isso é preciso definir um padrão para facilitar a leitura dos dados

# como instalar:


# exemplos de uso:

## detalhes importantes sobre essa lib 

### Essa lib e dividida em três arquivos: 

O primeiro arquivo chamado de "roll_dices.js" contém funções para executar jogadas de dados independentemente da quantidade de faces ou dos valores contidos nas faces.

O segundo arquivo chamado de "range_of_dices.js" faz uma lista de todos os resultados possíveis e contabiliza as possibilidades ao se jogar um ou mais dados independentemente da quantidade de faces ou dos valores contidos nas faces.

## funções do arquivo roll_dices.js
Um detalhe importante sobre essas funções é que todas têm uma validação dos dados recebidos, e se necessário eles são corrigidos.

#### roll_dice( biggest_face, smaller_face, amount )
Sorteia um ou mais dados de forma aleatória, se mais de um dado for sorteado os resultados seram somados.

```
roll_dice(20)       // sorteia 1 dado que as faces vão do 1 ao 20
roll_dice(30,1,2)   // sorteia 2 dado que as faces vão do 1 ao 30
roll_dice(-30,10,5) // sorteia 5 dado que as faces vão do 10 ao -30

```

#### roll_vantage( biggest_face, smaller_face, amount )
Sorteia dois ou mais dados e compara os valores retornando o maior valor sorteado.

```
roll_vantage(20)        // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(20,1,1)    // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(-30,10,4)  // sorteia 5 dado que as faces vão do 10 ao -30, e retorna o maior valor

```

#### roll_disvantage( biggest_face, smaller_face, amount )
Faz o mesmo que a função anterior, mas ao invés de retornar o maior valor ele retorna o menor valor.

#### roll_exec( any_text, any_text, any_text, ... )
Essa função busca por simplificações das jogadas de qualquer dado e substituí-las pelas funções correspondentes.
Após isso essas funções são substituídas pelos seus respectivos resultados.

```
roll_exec("1d20")           // sorteia 1 dado que as faces vão do 1 ao 20
roll_exec("van 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MAIOR valor
roll_exec("dis 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MENOR valor

roll_exec("1d20+5")         // sorteia 1 dado que as faces vão do 1 ao 20, e acresenta "+5"
roll_exec("1d20+1d6")       // sorteia 1 dado de 20 lados e soma o resultado com um dado de 6 lados

```

Caso mais de uma string seja fornecida a função retorna um array com os resultados ordenados.

```
roll_exec("1d20", "van 1d20", "dis 1d20", "1d20+5", "1d20+1d6") 
// exemplo de resultado: ["9", "13", "4", "10+5", "14+2"]

```

Essa função pode não parecer segura por executar outras funções em uma string, mas regra só se aplica às funções: roll_dice, roll_vantage e roll_disvantage.
Outras funções fora dessa lista são ignoradas.

#### roll( any_text, any_text, any_text, ... )
Basicamente faz o mesmo que a função anterior, porém adiciona o resultado da equação ao final da string.

```
roll("1d100_50")            // ex: 65
roll("1d20 + 5")            // ex: "6 + 5 = 11"
roll("(1d20 * 2) + 5")      // ex: "(11 * 2) + 5 = 27"
roll("van 1d20 * 2 + X")    // ex: "11 * 2 + X = 22"

```

Para fazer esse caculo do resultado a função ["exec_math"] é utilizada

#### exec_math( any_text )
Faz o cálculo de uma equação matemática presente em uma string, independente de como a string esteja construída.
A função busca os valores válidos e retorna o resultado da equação.

```
exec_math("20 + 4 - 3")    // ex: 21
exec_math("(20 - 4) * 3")  // ex: 48
exec_math("1+++1 +---- 1")  // ex: 3

```

## funções do arquivo range_of_dices.js

### create the ranges

#### range_simple()

#### range_combinations()

#### range_van_or_dis()

#### range_vantage()

#### range_desvantage()

#### string_to_range()

#### range()


### edit the ranges

#### join_ranges()

#### join_ranges_all()

#### join_ranges_fast()

#### merge_ranges()

#### merge_range_and_number()


### convert the ranges

#### range_to_convolution()

#### range_to_percentage()

#### count_type_values()

#### negative_range()

### other usefull functions

#### find_parentheses()


## funções do arquivo other_functions.js

#### isNumber()

#### isTextRange()

#### isArrayRange()


# API/Documentação