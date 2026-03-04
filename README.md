# Sumário
- [O que a Lib faz](#1-o-que-a-lib-faz)
- [Como Instalar](#2-como-instalar)
- [Exemplos de uso](#3-exemplos-de-uso)
    - [Detalhes Importantes](#31-detalhes-importantes-sobre-essa-lib)
    - [Funções do Arquivo roll_dices.js](#32-funções-do-arquivo-roll_dicesjs)
        - [roll_dice](#roll_dice--biggest_face-smaller_face-amount-)
        - [roll_vantage](#roll_vantage--biggest_face-smaller_face-amount-)
        - [roll_disvantage](#roll_disvantage--biggest_face-smaller_face-amount-)
        - [roll_exec](#roll_exec--any_text-any_text-any_text--)
        - [roll](#roll--any_text-any_text-any_text--)
        - [exec_math](#exec_math--any_text-)
    - [Funções do arquivo range_of_dices.js](#33-funções-do-arquivo-range_of_dicesjs)
        - [cria os ranges](#331-cria-os-ranges)
            - [range_simple](#range_simple-biggest_val-smaller_val-gap-possibility)
            - [range_combine](#range_combine-amount-biggest_val-smaller_val-gap)
            - [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage)
            - [string_to_range](#string_to_range--string-)
            - [merge_range_and_number](#merge_range_and_number--range_1-number-operator-)
        - [Edita os ranges](#332-edita-os-ranges)
            - [join_ranges](#join_ranges--range_1-range_2-)
            - [join_ranges_all](#join_ranges_all--range_1-range_2-operator-)
            - [join_ranges_fast](#join_ranges_fast--range_1-range_2-gap-)
            - [merge_ranges](#merge_ranges--range_1-range_2-operator-)
            - [range](#range--text-)
        - [converte os ranges](#333-converte-os-ranges)
- [Outras Informações](#outras-informações)

# 1. O que a Lib faz:

essa lib foi feita para facilitar o calculo de possibilidades para cada jogada de dados

Para a lib fazer isso é preciso definir um padrão para facilitar a leitura dos dados

# 2. Como Instalar:

# 3. Exemplos de uso:

## 3.1. Detalhes Importantes sobre essa Lib 

Essa lib e dividida em três arquivos:

- O primeiro arquivo chamado de "roll_dices.js" contém funções para executar jogadas de dados independentemente da quantidade de faces ou dos valores contidos nas faces.

- O segundo arquivo chamado de "range_of_dices.js" faz uma lista de todos os resultados possíveis e contabiliza as possibilidades ao se jogar um ou mais dados independentemente da quantidade de faces ou dos valores contidos nas faces.

- E o terceiro arquivo contém algumas funções utilizadas internamente para algumas validações de dados.

## 3.2. Funções do Arquivo roll_dices.js
Um detalhe importante sobre essas funções é que todas têm uma validação dos dados recebidos, e se necessário eles são corrigidos.

### **roll_dice** ( biggest_face, smaller_face, amount ) <hr>
Sorteia um ou mais dados de forma aleatória, se mais de um dado for sorteado os resultados seram somados.

```
roll_dice(20)       // sorteia 1 dado que as faces vão do 1 ao 20
roll_dice(30,1,2)   // sorteia 2 dado que as faces vão do 1 ao 30
roll_dice(-30,10,5) // sorteia 5 dado que as faces vão do 10 ao -30
```

### **roll_vantage** ( biggest_face, smaller_face, amount ) <hr>
Sorteia dois ou mais dados e compara os valores retornando o maior valor sorteado.

```
roll_vantage(20)        // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(20,1,1)    // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(-30,10,4)  // sorteia 5 dado que as faces vão do 10 ao -30, e retorna o maior valor
```

### **roll_disvantage** ( biggest_face, smaller_face, amount ) <hr>
Faz o mesmo que a função anterior, mas ao invés de retornar o maior valor ele retorna o menor valor.

### **roll_exec** ( any_text, any_text, any_text, ... ) <hr>
Essa função busca por simplificações das jogadas de qualquer dado e substituí-las pelas funções correspondentes.
Após isso essas funções são substituídas pelos seus respectivos resultados.

```
roll_exec("1d20")           // sorteia 1 dado que as faces vão do 1 ao 20
roll_exec("van 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MAIOR valor
roll_exec("dis 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MENOR valor

roll_exec("1d20+5")         // sorteia 1 dado que as faces vão do 1 ao 20, e acresenta "+5"
roll_exec("1d20+1d6")       // sorteia 1 dado de 20 lados e soma o resultado com um dado de 6 lados
```

<details>
Caso mais de uma string seja fornecida a função retorna um array com os resultados ordenados.</br>

```
roll_exec("1d20", "van 1d20", "dis 1d20", "1d20+5", "1d20+1d6") 
// exemplo de resultado: ["9", "13", "4", "10+5", "14+2"]
```

Essa função pode não parecer segura por executar outras funções em uma string, mas regra só se aplica às funções: roll_dice, roll_vantage e roll_disvantage.</br>
Outras funções fora dessa lista são ignoradas.</br>
</details>

### **roll** ( any_text, any_text, any_text, ... ) <hr>
Basicamente faz o mesmo que a função anterior, porém adiciona o resultado da equação ao final da string.

```
roll("1d100_50")            // ex: 65
roll("1d20 + 5")            // ex: "6 + 5 = 11"
roll("(1d20 * 2) + 5")      // ex: "(11 * 2) + 5 = 27"
roll("van 1d20 * 2 + X")    // ex: "11 * 2 + X = 22"
```

Para fazer esse caculo do resultado a função "exec_math" é utilizada

### **exec_math** ( any_text ) <hr>
Faz o cálculo de uma equação matemática presente em uma string, independente de como a string esteja construída.
A função busca os valores válidos e retorna o resultado da equação.

```
exec_math("20 + 4 - 3")     // ex: 21
exec_math("(20 - 4) * 3")   // ex: 48
exec_math("1+++1 +---- 1")  // ex: 3
```

## 3.3. Funções do arquivo range_of_dices.js

### 3.3.1. cria os ranges <hr>

### **range_simple** (biggest_val, smaller_val, gap, possibility) <hr>

O propósito dessa função é de facilitar a criação de qualquer range.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>biggest_val:</td>
            <td>valor do maior do range</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_val:</td>
            <td>menor valor do range</td>
            <td>1</td>
        <tr>
        <tr>
            <td>gap:</td>
            <td>espaço entre os valores</td>
            <td>1</td>
        <tr>
        <tr>
            <td>possibility:</td>
            <td>número de possibilidades</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

```
range_simple(5)                 // [ [1, 1],[2, 1],[3, 1],[4, 1],[5, 1] ]
range_simple(5,2)               // [ [2, 1],[3, 1],[4, 1],[5, 1] ]
range_simple(5,1,2)             // [ [1, 1],[3, 1],[5, 1] ]
range_simple(5,1,1,9)           // [ [1, 9],[2, 9],[3, 9],[4, 9],[5, 9] ]
range_simple(5,1,1,[1,9])       // [ [1, 1],[2, 9],[3, 1],[4, 9],[5, 1] ]
```

<details>
<summary>Saiba mais Detalhes</summary>
Caso qualquer valor seja invalido a função retorna null.</br>
Se o "biggest_val" for menor que o "smaller_val" esses valores são trocados.</br>
Se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.</br>
Se a "possibility" for um array os valores seguiram a sequencia de valores do array.</br>
</details>

### **range_combine** (amount, biggest_val, smaller_val, gap) <hr>

Faz a combinação de multiplos ranges iguais da maneira mais eficiente dessa lib.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>amount:</td>
            <td>número de vezes que o range se repete</td>
            <td>1</td>
        <tr>
        <tr>
            <td>biggest_val:</td>
            <td>valor do maior do range</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_val:</td>
            <td>menor valor do range</td>
            <td>1</td>
        <tr>
        <tr>
            <td>gap:</td>
            <td>espaço entre os valores</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

```
range_combine(1,5)     // [ [1, 1],[2, 1],[3, 1],[4, 1],[5, 1] ]
range_combine(2,5)     // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 4],[8, 3],[9, 2],[10, 1] ]
range_combine(2,5,2)   // [ [4, 1],[5, 2],[6, 3],[7, 4],[8, 3],[9, 2],[10, 1] ]
range_combine(2,5,1,2) // [ [2, 1],[4, 2],[6, 3],[8, 2],[10, 1] ]
```

<details>
<summary>Saiba mais Detalhes</summary>
Caso qualquer valor seja invalido a função retorna null.</br>
Se "amount" for um valor negativo ele se torna positivo.</br>
Se o "biggest_val" for menor que o "smaller_val" esses valores são trocados.</br>
Se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.</br>
Se o "amount" for igual a 1 a função <a href="#range_simple-biggest_val-smaller_val-gap-possibility">range_simple</a> e executada no lugar.</br>
</br>
Essa solução é um pouco mais rápida que a categoria O(n²). Mas tecnicamente não sai dessa categoria.</br>
</details>

### **range_van_or_dis** (amount, biggest_val, smaller_val, gap, disadvantage) <hr>

Cria um range que contabiliza as possibilidades de um ou mais dados de faces variadas serem sorteados e o maior valor ser escolhido.</br>
</br>
Basicamente faz um range da funções: [roll_vantage](#roll_vantage--biggest_face-smaller_face-amount-) ou [roll_disvantage](#roll_disvantage--biggest_face-smaller_face-amount-).

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>amount</td>
            <td>número de vezes que o range se repete</td>
            <td>1</td>
        <tr>
        <tr>
            <td>biggest_val</td>
            <td>valor do maior do range</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_val</td>
            <td>menor valor do range</td>
            <td>1</td>
        <tr>
        <tr>
            <td>gap</td>
            <td>espaço entre os valores</td>
            <td>1</td>
        <tr>
        <tr>
            <td>disadvantage</td>
            <td>boolean para fazer a troca</td>
            <td>false</td>
        <tr>
    </table>
</details></br>

```
range_van_or_dis(1,6)           // [ [1, 1],[2, 3],[3, 5],[4, 7],[5, 9],[6, 11] ]
range_van_or_dis(2,6,1)         // [ [1, 1],[2, 7],[3, 19],[4, 37],[5, 61],[6, 91] ]
range_van_or_dis(3,6,2)         // [ [2, 1],[3, 15],[4, 65],[5, 175],[6, 369] ]
range_van_or_dis(4,6,1,2)       // [ [1, 1],[3, 31],[5, 211] ]

range_van_or_dis(1,6,1,1,false) // [ [1, 1],[2, 3],[3, 5],[4, 7],[5, 9],[6, 11] ]
range_van_or_dis(1,6,1,1,true)  // [ [1, 11],[2, 9],[3, 7],[4, 5],[5, 3],[6, 1] ]
```

<details>
<summary>Saiba mais Detalhes</summary>
Caso qualquer argumento seja invalido a função retorna null.</br>
Se "amount" for um valor negativo ele se torna positivo.</br>
Se o "biggest_val" for menor que o "smaller_val" esses valores são trocados.</br>
Se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.</br>
</br>
A solução usada por essa função pode ser considerada O(n) pois executa um calculo para cada elemento do range.
</details>

<details>
<summary>Abreviações</summary>
<h3><b>range_vantage</b> (amount, biggest_val, smaller_val, gap)</h3><hr>

Essa função é apenas uma abreviação da função [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage), basicamente só vai fazer isso:

```
range_van_or_dis(amount,biggest_val, smaller_val, gap, false)
```
<h3><b>range_disvantage</b> (amount, biggest_val, smaller_val, gap)</h3><hr>

Essa outra função também é uma abreviação da função [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage), 
basicamente só vai fazer isso:

```
return range_van_or_dis(amount,biggest_val, smaller_val, gap, true)
```
</details>

### **string_to_range** ( string ) <hr>

Busca por uma simplificação de um dado, após isso o range do dado e criado usando a função correta.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>string</td>
            <td>qualquer string que contenha um dado simplificado</td>
            <td>""</td>
        </tr>
    </table>
</details></br>

```
string_to_range("1d20")         // range_combine(1,20)
string_to_range("van 1d20")     // range_vantage(1,20)
string_to_range("dis 1d20")     // range_disvantage(1,20)

string_to_range("2d20_5")       // range_combine(2,20,5)
string_to_range("3d100_5_2")    // range_combine(3,100,5,2)
```

<details>
<summary>Saiba mais Detalhes</summary>
Caso qualquer argumento seja invalido a função retorna null.
</details>

### **range** ( text ) <hr>

Resumidamente essa função pode executar qualquer expressão matemática com a presença de ranges simplificados ou não.

Um detalhe é que essa função pode ser utilizada para substituir quase todas as outras funções, mas como essa função precisa fazer várias validações para garantir que o resultado está correto ela se torna mais lenta que as funções mais especializadas dessa lib.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>text</td>
            <td>uma ou mais strigs ou ranges</td>
            <td>""</td>
        </tr>
    </table>
</details></br>

```
range("1d6")                    // [ [1, 1],[2, 1],[3, 1],[4, 1],[5, 1],[6, 1] ]
range("2d6")                    // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
range("1d6 + 1d6")              // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
range("1d6+",range_simple(6))   // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
range("1d6-1d6")                // [ [-5, 1],[-4, 2],[-3, 3],[-2, 4],[-1, 5],[0, 6],[1, 5],[2, 4],[3, 3],[4, 2],[5, 1] ]
range("1d6_3 + 1d10_4_2")       // [ [7, 1],[8, 1],[9, 2],[10, 2],[11, 2],[12, 2],[13, 2],[14, 2],[15, 1],[16, 1] ]

range("van 2d6")                // [ [1, 1],[2, 7],[3, 19],[4, 37],[5, 61],[6, 91] ]
range("dis 2d6")                // [ [1, 91],[2, 61],[3, 37],[4, 19],[5, 7],[6, 1] ]
range("van 2d6 + 1d6")          // [ [2, 1],[3, 8],[4, 27],[5, 64],[6, 125],[7, 216],[8, 215],[9, 208],[10, 189],[11, 152],[12, 91] ]
```

Nos exemplos demonstrados anteriormente apenas os operadores "+" e "-" foram utilizados por uma questão de espaço mas é importante ressaltar que existe uma lista de operadores válidos e cada um deles tem uma função associada.

<details>
    <summary>Saiba mais sobre os operadores validos</summary>
    <table>
        <tr>
            <td>Operador</td>
            <td>Função Associada</td>
        <tr>
        <tr>
            <td> + </td>
            <td><a href="#join_ranges--range_1-range_2-">join_ranges</a></td>
        </tr>
        <tr>
            <td> - </td>
            <td><a href="#join_ranges--range_1-range_2-">join_ranges</a></td>
        </tr>
        <tr>
            <td> * </td>
            <td><a href="#join_ranges_all--range_1-range_2-operator-">join_ranges_all</a></td>
        </tr>
        <tr>
            <td> ** </td>
            <td><a href="#join_ranges_all--range_1-range_2-operator-">join_ranges_all</a></td>
        </tr>
        <tr>
            <td> / </td>
            <td><a href="#join_ranges_all--range_1-range_2-operator-">join_ranges_all</a></td>
        </tr>
        <tr>
            <td> % </td>
            <td><a href="#join_ranges_all--range_1-range_2-operator-">join_ranges_all</a></td>
        </tr>
        <tr>
            <td> +! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
        <tr>
            <td> -! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
        <tr>
            <td> *! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
        <tr>
            <td> **! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
        <tr>
            <td> /! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
        <tr>
            <td> %! </td>
            <td><a href="#merge_ranges--range_1-range_2-operator-">merge_ranges</a></td>
        </tr>
    </table>
</details></br>

É importante ressaltar que existem alguns casos em que só é necessário unir os valores de dois ranges, para isso basta usar um operador e uma "!".

```
range("1d6 +! 1d6")         // [ [1, 2],[2, 2],[3, 2],[4, 2],[5, 2],[6, 2] ]
range("1d6 +! 1d6_1_2")     // [ [1, 2],[2, 1],[3, 2],[4, 1],[5, 2],[6, 1] ]
range("1d6 -! 1d6_1_2")     // [ [1, 0],[2, 1],[3, 0],[4, 1],[5, 0],[6, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null ou é ignorado.</br>
    Caso a expressão do argumento esteja incorreta ou incompleta a função tentara retornar um resulto com a parte valida.</br>
    Essa função também faz dodas as operações matemáticas seguindo a sequencia correta</br>
    Essa função não acerita a simplificação "5(1+1)", necesse caso o correto é "5*(1+1)" ou "5*!(1+1)"</br>
    </br>
    Como essa função utiliza outras funções para funcionar é difícil determinar em qual categoria de complexidade essa função se enquadra.</br>
</details>

### 3.3.2. Edita os ranges <hr>

### **join_ranges** ( range_1, range_2 ) <hr>

Basicamente essa função faz uma validação com os dois ranges fornecidos para descobrir qual o melhor método para fazer a união dos valores dos ranges.

Essa validação se baseia em descobrir se ambos os ranges possuem uma sequência linear em seus valores, assim a função [join_ranges_fast](#join_ranges_fast--range_1-range_2-gap-) poderá ser utilizada para acelerar o processo. Mas caso não seja possível usar essa função a [join_ranges_all](#join_ranges_all--range_1-range_2-operator-) e executada no lugar pois ela não tem nenhuma restrição.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range_1</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>range_2</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
    </table>
</details></br>

<details>
    <summary>Saiba mais Detalhes</summary>
    Se os dois argumentos forem inválidos a função retorna null.</br>
    Se apenas uma dos argumentos for válidos a função retorna o argumento válido.</br>
    Se um dos argumentos for um numero e o outro um range a função <a href="#merge_range_and_number--range_1-number-operator-">merge_range_and_number</a> é executada no lugar.</br>
    Se os dois argumentos forem numeros a função retorna a soma dos numeros</br>
</details>

### **join_ranges_all** ( range_1, range_2, operator ) <hr>

Faz uma operação matemática entre cada combinação possível entre os ranges fornecidos. O problema é que esse processo pode se tornar lento pois o número de operações que a função precisa fazer é igual a multiplicação do tamanho dos dois ranges.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range_1</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>range_2</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>operator</td>
            <td>qualquer operador em uma string</td>
            <td>"+"</td>
        <tr>
    </table>
</details></br>

```
join_ranges_all("1d6",range_simple(6))  // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
join_ranges_all(range_simple(6),"1d6")  // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]

join_ranges_all("1d6","1d6")            // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
join_ranges_all("1d6","1d6","+")        // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 5],[9, 4],[10, 3],[11, 2],[12, 1] ]
join_ranges_all("1d6","1d6","-")        // [ [-5, 1],[-4, 2],[-3, 3],[-2, 4],[-1, 5],[0, 6],[1, 5],[2, 4],[3, 3],[4, 2],[5, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso um dos argumentos seja uma string de um range simplificado o range e convertido para um array.</br>
</details>

### **join_ranges_fast** ( range_1, range_2, gap ) <hr>

Essa função faz o mesmo que a função [join_ranges_all](#join_ranges_all--range_1-range_2-operator-), porem essa tem uma otimisação na forma com que os valores do range são registrados, dessa forma os dados são registrados mais rapidamente em comparação com a função [join_ranges_all](#join_ranges_all--range_1-range_2-operator-).

O problema é que para essa otimização funcionar é necessário que a diferença entre os valores do range formem uma sequência linear, senão o resultado estará errado.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range_1</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>range_2</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>gap</td>
            <td>espaço entre os valores</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso um dos argumentos seja uma string de um range simplificado o range e convertido para um array.</br>
    Se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.</br>
</details>

### **merge_ranges** ( range_1, range_2, operator ) <hr>

O(n+m)

### **merge_range_and_number** ( range_1, number, operator ) <hr>

O(n)


### 3.3.3. converte os ranges <hr>

### **range_to_convolution** () <hr>

### **range_to_percentage** () <hr>

### **count_type_values** () <hr>

### **negative_range** () <hr>

# Outras Informações