# o que a lib faz:

essa lib foi feita para facilitar o calculo de possibilidades para cada jogada de dados

Para a lib fazer isso é preciso definir um padrão para facilitar a leitura dos dados

# como instalar:


# exemplos de uso:

## detalhes importantes sobre essa lib 

### Essa lib e dividida em dois arquivos: 

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

#### roll( any_text, any_text, any_text, ... )
Essa função permite fazer o sorteio de múltiplos dados e combinar os resultados seguindo o padrão de uma operação matemática.

```
roll("1d20")         // sorteia 1 dado que as faces vão do 1 ao 20
roll("roll_dice(20)")// sorteia 1 dado que as faces vão do 1 ao 20

roll("1d20 + 5")     // sorteia 1 dado que as faces vão do 1 ao 20, e soma 5 ao resultado
roll("van 1d20 + 5") // sorteia 2 dado que as faces vão do 1 ao 20 e retorna o maior valor, apos isso 5 ao resultado

roll("1d20 + 10 - 1d6") --> 15 + 10 - 3 = 22
```

Um detalhe importande é que essa função converte as simplificações para as devidas funções e apos isso as funções são rastreadas e executadas.
além disso essa função executa a função safe_math_eval para fazer o calculo do resultado

#### safe_math_eval()

#### exec_lib_string()


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

#### isNumber()

#### isTextRange()

#### isArrayRange()


# API/Documentação