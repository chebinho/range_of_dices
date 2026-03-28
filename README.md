[![npm](https://img.shields.io/npm/v/range-of-dices.svg)](https://www.npmjs.com/package/range-of-dices)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/chebinho/range_of_dices)

# 1. O que a Lib faz:
A proposta dessa biblioteca é de fornecer um conjunto de funções para sortear ou calcular a probabilidade de um ou mais dados de tamanhos variados. 

Um exemplo é a função [roll](#roll--any_text-any_text-any_text--) que faz a leitura de um string em busca de operações matemáticas e por dados simplificados, após isso a função faz o sorteio dos dados encontrados e resolve as operações matemáticas, retornando o resultado final.

Outro exemplo é a função [range](#range--text-) que basicamente faz o mesmo que a função anterior, porém essa função retorna o um range que contém a contabilização de todos os resultados possíveis de se obter com a expressão matemática.

Um detalhe importante é que a maioria das funções utilizam outras funções.

Para manter a organização e evitar que funções desnecessárias sejam chamadas essa lib se divide em 3 arquivos:
- O primeiro arquivo chamado de "roll_dices.js" contém funções para executar jogadas de dados independentemente da quantidade de faces ou dos valores contidos nas faces.
- O segundo arquivo chamado de "range_of_dices.js" faz uma lista de todos os resultados possíveis e contabiliza as possibilidades ao se jogar um ou mais dados independentemente da quantidade de faces ou dos valores contidos nas faces.
- E o terceiro arquivo contém algumas funções utilizadas internamente para algumas validações das variáveis.

Além disso, essa biblioteca utiliza alguns termos próprios para facilitar a leitura e compreensão de como o código funciona, segue abaixo os termos.
<ul>
    <li>
        <details><summary>Range:</summary>
            <p>Um range é um array 2d com duas colunas que armazenam os valores e as possibilidades de um ou mais dados.</p>
            <p>Por padrão, a primeira coluna do range é ocupada pelos valores possíveis de se obter, enquanto a segunda coluna armazena o número de possibilidades em que o determinado valor pode aparecer. Além disso, o range sempre é organizado de forma crescente em relação aos valores e só pode ser composto por números validos.</p>
            <p>Para criar um range pode-se usar as funções <a href="#range_simple-biggest_val-smaller_val-gap-possibility">range_simple</a>, <a href="#range_combine-amount-biggest_val-smaller_val-gap">range_combine</a> e <a href="#range--text-">range</a>.</p>
            <p>Mas caso seja necessário criar um range sem usar uma das funções acima saiba que o padrão do range ainda precisa ser seguido para as funções funcionarem corretamente.</p>
            <p>Exemplo de um range de um dado de 6 lados:</p>
            <table style="text-align: center">
                <tr>
                    <td>Valores</td>
                    <td>possibilidades</td>
                <tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                <tr>
                <tr>
                    <td>2</td>
                    <td>1</td>
                <tr>
                <tr>
                    <td>3</td>
                    <td>1</td>
                <tr>
                <tr>
                    <td>4</td>
                    <td>1</td>
                <tr>
                <tr>
                    <td>5</td>
                    <td>1</td>
                <tr>
                <tr>
                    <td>6</td>
                    <td>1</td>
                <tr>
            </table>
        </details>
    </li>
    <li>
        <details><summary>Dados Simplificados:</summary>
        <p>É uma forma mais resumida e simples de se representar um ou mais dados, e isso pode ser usado como uma variavel dentro de algumas funções. (comfira o "Saiba mais Detalhes" ou "Saiba mais sobre os Argumentos" para saber se a função aceita a simplificação de dados)</p>
        <p>Alguns exemplos são:</p>
        <ul>
            <li>1d6: representa um dado de 6 lados que começa em 1.</li>
            <li>2d6: dois dados iguais de 6 lados que começa em 1.</li>
            <li>2d6_1: dois dados iguais de 6 lados que começa em 1.</li>
            <li>3d12_7: três dados iguais de 6 lados que começa em 7 e termina em 12.</li>
            <li>1d20_1_2: representa um dado de 10 lados que começa em 1, termina em 20 ou menor e o espaço entre os valores é igual a 2.</li>
            <li>1d6_1_1: representa um dado de 6 lados que começa em 1, termina em 6 ou menor e o espaço entre os valores é igual a 1.</li>
        </ul>
        <p>Por padrão dentro dessa lib: quando uma função recebe uma simplificação com mais de um dado é feito todas as somas entre dois valores de todos os valores de cada dado. (dentro do código essas operações são feitas de uma maneira mais eficiente do foi dito na explicação)</p>
        <p>E uma curiosidade é que normalmente esse simplificação é comumente utilizada em RPG de mesa.</p>
        </details>
    </li>
</ul>

Resumidamente o objetivo é de fornecer um conjunto de funções para facilitar o cálculo de possibilidades usando como referencia a comtabilização de todas as possibilidades do sorteio de dados de tamanhos variados.

# 2. Sumário
- [O que a Lib faz](#1-o-que-a-lib-faz)
- [Como Instalar e Utilizar](#3-como-instalar-e-utilizar)
- [Exemplos de uso](#4-exemplos-de-uso)
    - [Funções do Arquivo roll_dices.js](#41-funções-do-arquivo-roll_dicesjs)
        - [roll_dice](#roll_dice--biggest_face-smaller_face-amount-)
        - [roll_vantage](#roll_vantage--biggest_face-smaller_face-amount-)
        - [roll_disvantage](#roll_disvantage--biggest_face-smaller_face-amount-)
        - [roll_exec](#roll_exec--any_text-any_text-any_text--)
        - [roll](#roll--any_text-any_text-any_text--)
        - [exec_math](#exec_math--any_text-)
    - [Funções do arquivo range_of_dices.js](#42-funções-do-arquivo-range_of_dicesjs)
        - [cria os ranges](#421-cria-os-ranges)
            - [range_simple](#range_simple-biggest_val-smaller_val-gap-possibility)
            - [range_combine](#range_combine-amount-biggest_val-smaller_val-gap)
            - [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage)
            - [string_to_range](#string_to_range--string-)
            - [range](#range--text-)
        - [Edita os ranges](#422-edita-os-ranges)
            - [join_ranges](#join_ranges--range_1-range_2-)
            - [join_ranges_all](#join_ranges_all--range_1-range_2-operator-)
            - [join_ranges_fast](#join_ranges_fast--range_1-range_2-gap-)
            - [merge_ranges](#merge_ranges--range_1-range_2-operator-)
            - [merge_range_and_number](#merge_range_and_number--range-number-operator-)
            - [flip_range](#flip_range--range-)
        - [converte os ranges](#423-converte-os-ranges)
            - [range_to_percentage](#range_to_percentage--range-)
            - [count_type_values](#count_type_values--range-)
- [Outras Informações](#5-outras-informações)

# 3. Como Instalar e Utilizar:

Instalar com npm:

```
npm install range_of_dices
```

Após isso, utilize o comando "import" para chamar as funções.

```javascript
import {roll, range} from "./node_modules/range-of-dices/dist/index.js" // esse caminho pode mudar.

console.log(roll("2d6 + 3"))
console.log(range("2d6 + 3"))
```

O arquivo [index.js](./dist/index.js) vai chamar todas as funções da biblioteca, enquanto os arquivos [roll_dices.js](./dist/roll_dices.js) e [range_of_dices.js](./dist/range_of_dices.js) iriam chamar seus respectivos conjuntos de funções.

Outra opção é de usar "range-of-dices" que basicamente irá chamar o [index.js](./dist/index.js).

```javascript
import {roll, range} from "range-of-dices"

console.log(roll("2d6 + 3"))
console.log(range("2d6 + 3"))
```

Uma última forma de chamar essa lib é através do CDN, dessa maneira não é necessário instalar a lib e ela será automaticamente atualizada para a última versão disponível.

```javascript
import {roll, range} from "https://cdn.jsdelivr.net/npm/range-of-dices/+esm"  // preciso fazer mais testes necesse metodo

console.log(roll("2d6 + 3"))
console.log(range("2d6 + 3"))
```

Um detalhe importante é que essa lib não tem outras dependências além do próprio JavaScript, por causa disso só é necessário instalar a propria lib.

# 4. Exemplos de uso:

## 4.1. Funções do Arquivo [roll_dices.js](./dist/roll_dices.js)
Um detalhe importante é que todas as funções dessa lib tem algum tipo de validação para os valores recebidos pelos argumentos, e caso algum valor esteja errado a função tentara corrigir esse valor afim de chegar em um resultado valido, mas caso não seja possivel fazer a correção o valor retornado é null ou um erro.

### **roll_dice** ( biggest_face, smaller_face, amount ) <hr>
Sorteia um ou mais dados de forma aleatória, se mais de um dado for sorteado os resultados seram somados.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>biggest_face</td>
            <td>maior face do dado</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_face</td>
            <td>menor face do dado</td>
            <td>1</td>
        <tr>
        <tr>
            <td>amount</td>
            <td>numero dados que seram sorteados</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

```javascript
roll_dice(20)       // sorteia 1 dado que as faces vão do 1 ao 20
roll_dice(30,1,2)   // sorteia 2 dado que as faces vão do 1 ao 30
roll_dice(-30,10,5) // sorteia 5 dado que as faces vão do 10 ao -30
```

### **roll_vantage** ( biggest_face, smaller_face, amount ) <hr>
Sorteia dois ou mais dados e compara os valores retornando o maior valor sorteado.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>biggest_face</td>
            <td>maior face do dado</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_face</td>
            <td>menor face do dado</td>
            <td>1</td>
        <tr>
        <tr>
            <td>amount</td>
            <td>numero dados que seram sorteados</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

```javascript
roll_vantage(20)        // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(20,1,1)    // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o maior valor
roll_vantage(-30,10,4)  // sorteia 5 dado que as faces vão do 10 ao -30, e retorna o maior valor
```

### **roll_disvantage** ( biggest_face, smaller_face, amount ) <hr>
Faz o mesmo que a função anterior, mas ao invés de retornar o maior valor ele retorna o menor valor.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>biggest_face</td>
            <td>maior face do dado</td>
            <td>20</td>
        <tr>
        <tr>
            <td>smaller_face</td>
            <td>menor face do dado</td>
            <td>1</td>
        <tr>
        <tr>
            <td>amount</td>
            <td>numero dados que seram sorteados</td>
            <td>1</td>
        <tr>
    </table>
</details></br>

### **roll_exec** ( any_text, any_text, any_text, ... ) <hr>
Essa função busca por simplificações das jogadas de qualquer dado e substituí-las pelas funções correspondentes.
Após isso essas funções são substituídas pelos seus respectivos resultados.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>any_text</td>
            <td>qualquer string que contenha uma ou mais simplificações de dados</td>
            <td>""</td>
        <tr>
        <tr>
    </table>
</details></br>

```javascript
roll_exec("1d20")           // sorteia 1 dado que as faces vão do 1 ao 20
roll_exec("van 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MAIOR valor
roll_exec("dis 1d20")       // sorteia 2 dado que as faces vão do 1 ao 20, e retorna o MENOR valor

roll_exec("1d20+5")         // sorteia 1 dado que as faces vão do 1 ao 20, e acresenta "+5"
roll_exec("1d20+1d6")       // sorteia 1 dado de 20 lados e soma o resultado com um dado de 6 lados
```

<details>
Caso mais de uma string seja fornecida a função retorna um array com os resultados ordenados.</br>

```javascript
roll_exec("1d20", "van 1d20", "dis 1d20", "1d20+5", "1d20+1d6") 
// exemplo de resultado: ["9", "13", "4", "10+5", "14+2"]
```

Essa função pode não parecer segura por executar outras funções em uma string, mas regra só se aplica às funções: roll_dice, roll_vantage e roll_disvantage.</br>
Outras funções fora dessa lista são ignoradas.</br>
</details>

### **roll** ( any_text, any_text, any_text, ... ) <hr>
Basicamente faz o mesmo que a função anterior, porém adiciona o resultado da equação ao final da string.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>any_text</td>
            <td>qualquer string que contenha uma ou mais simplificações de dados</td>
            <td>""</td>
        <tr>
        <tr>
    </table>
</details></br>

```javascript
roll("1d100_50")            // ex: 65
roll("1d20 + 5")            // ex: "6 + 5 = 11"
roll("(1d20 * 2) + 5")      // ex: "(11 * 2) + 5 = 27"
roll("van 1d20 * 2 + X")    // ex: "11 * 2 + X = 22"
```

Para fazer esse caculo do resultado a função "exec_math" é utilizada

### **exec_math** ( any_text ) <hr>
Faz o cálculo de uma equação matemática presente em uma string, independente de como a string esteja construída.
A função busca os valores válidos e retorna o resultado da equação.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>any_text</td>
            <td>qualquer string que contenha uma ou mais simplificações de dados</td>
            <td>""</td>
        <tr>
        <tr>
    </table>
</details></br>

```javascript
exec_math("20 + 4 - 3")     // ex: 21
exec_math("(20 - 4) * 3")   // ex: 48
exec_math("1+++1 +---- 1")  // ex: 3
```

## 4.2. Funções do arquivo [range_of_dices.js](./dist/range_of_dices.js)

### 4.2.1. cria os ranges <hr>

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

```javascript
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

```javascript
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

```javascript
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
A solução usada por essa função pode ser considerada O(n) pois executa um cálculo para cada elemento do range.
</details></br>

<details>
<summary>Abreviações</summary>
<h3><b>range_vantage</b> (amount, biggest_val, smaller_val, gap)</h3><hr>

Essa função é apenas uma abreviação da função [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage), basicamente só vai fazer isso:

```javascript
range_van_or_dis(amount,biggest_val, smaller_val, gap, false)
```
<h3><b>range_disvantage</b> (amount, biggest_val, smaller_val, gap)</h3><hr>

Essa outra função também é uma abreviação da função [range_van_or_dis](#range_van_or_dis-amount-biggest_val-smaller_val-gap-disadvantage), 
basicamente só vai fazer isso:

```javascript
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

```javascript
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

```javascript
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

```javascript
range("1d6 +! 1d6")         // [ [1, 2],[2, 2],[3, 2],[4, 2],[5, 2],[6, 2] ]
range("1d6 +! 1d6_1_2")     // [ [1, 2],[2, 1],[3, 2],[4, 1],[5, 2],[6, 1] ]
range("1d6 -! 1d6_1_2")     // [ [1, 0],[2, 1],[3, 0],[4, 1],[5, 0],[6, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null ou é ignorado.</br>
    Caso a expressão do argumento esteja incorreta ou incompleta a função tentara retornar um resulto com a parte valida.</br>
    Essa função também faz dodas as operações matemáticas seguindo a sequencia correta</br>
    Essa função não acerita a simplificação "5(1+1)", nesse caso o correto é "5*(1+1)" ou "5*!(1+1)"</br>
    </br>
    Como essa função utiliza outras funções para funcionar é difícil determinar em qual categoria de complexidade essa função se enquadra.</br>
</details>

### 4.2.2. Edita os ranges <hr>

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
    Se um dos argumentos for um numero e o outro um range a função <a href="#merge_range_and_number--range-number-operator-">merge_range_and_number</a> é executada no lugar.</br>
    Se os dois argumentos forem números a função retorna a soma dos números</br>
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

```javascript
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

Faz a combinação de dois ranges, e se houver algum valor igual entre eles uma operação matemática ocorre entre as possibilidades desses valores.

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

```javascript
merge_ranges("1d6","1d6")           // [ [1, 2],[2, 2],[3, 2],[4, 2],[5, 2],[6, 2] ]
merge_ranges("1d6","1d6", "-")      // [ [1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0] ]
merge_ranges("1d6_1","1d8_4")       // [ [1, 1],[2, 1],[3, 1],[4, 2],[5, 2],[6, 2],[7, 1],[8, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null.</br>
    Caso um dos argumentos seja uma string de um range simplificado o range e convertido para um array.</br>
    Se um dos argumentos for um número e o outro um range a função <a href="#merge_range_and_number--range-number-operator-">merge_range_and_number</a> é executada no lugar.</br>
    </br>
    Essa função entra na categoria O(n+m) pois nessa função é feita uma simples comparação entre os termos dos ranges.
</details>

### **merge_range_and_number** ( range, number, operator ) <hr>

Faz uma operação matemática em todos os valores de um range.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
        <tr>
            <td>number</td>
            <td>qualquer numero valido</td>
            <td>1</td>
        <tr>
        <tr>
            <td>operator</td>
            <td>qualquer operador em uma string</td>
            <td>"+"</td>
        <tr>
    </table>
</details></br>

```javascript
merge_range_and_number("1d6")           // [ [2, 1],[3, 1],[4, 1],[5, 1],[6, 1],[7, 1] ]
merge_range_and_number("1d6",1,"+")     // [ [2, 1],[3, 1],[4, 1],[5, 1],[6, 1],[7, 1] ]
merge_range_and_number("1d6",100,"+")   // [ [101, 1],[102, 1],[103, 1],[104, 1],[105, 1],[106, 1] ]
merge_range_and_number("1d6",100,"-")   // [ [-99, 1],[-98, 1],[-97, 1],[-96, 1],[-95, 1],[-94, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null.</br>
    Caso um o argumento "range" seja uma string de um range simplificado o range e convertido para um array.</br>
    </br>
    Essa função entra na categoria O(n) pois faz uma operação para cada valor do range.
</details>

### **flip_range** ( range ) <hr>

Simplismente inverte os valores de um range fazendo com que os valores positivos virarem negativos e os negativos virem positivos.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
    </table>
</details></br>

```javascript
flip_range("1d6")       // [ [-6, 1],[-5, 1],[-4, 1],[-3, 1],[-2, 1],[-1, 1] ]
flip_range("1d2_-3")    // [ [-2, 1],[-1, 1],[-0, 1],[1, 1],[2, 1],[3, 1] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null.</br>
    Caso um o argumento "range" seja uma string de um range simplificado o range e convertido para um array.</br>
    </br>
    Essa função entra na categoria O(n) pois faz uma operação para cada valor do range.
</details>

### 4.2.3. converte os ranges <hr>

### **range_to_percentage** ( range ) <hr>

Converte a contagem de possibilidades de cada valor pela sua porcentagem.

A função faz a soma de todas as possibilidades presentes em um range e depois faz uma divisão de cada possibilidade pelo total, assim obtendo a porcentagem de cada valor.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
    </table>
</details></br>

```javascript
range_to_percentage("1d5")      // [ [1, 0.2],[2, 0.2],[3, 0.2],[4, 0.2],[5, 0.2] ]
range_to_percentage("2d5")      // [ [2, 0.04],[3, 0.08],[4, 0.12],[5, 0.16],[6, 0.2],[7, 0.16],[8, 0.12],[9, 0.08],[10, 0.04] ]
range_to_percentage("van 1d5")  // [ [1, 0.04],[2, 0.12],[3, 0.2],[4, 0.28],[5, 0.36] ]
range_to_percentage("dis 3d5")  // [ [1, 0.5904],[2, 0.28],[3, 0.104],[4, 0.024],[5, 0.0016] ]
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null.</br>
    Caso um o argumento "range" seja uma string de um range simplificado o range e convertido para um array.</br>
    É importante resaltar que após o uso dessa função o range gerado pode não funcionar com as outras funções.</br>
    </br>
    Essa função entra na categoria O(2n) pois faz duas operação para cada valor do range.
</details>

### **count_type_values** ( range ) <hr>

faz uma contagen das possibilidades dos valores positivos, zero e negativos.

<details>
    <summary>Saiba mais sobre os Argumentos</summary>
    <table>
        <tr>
            <td>Argumentos</td>
            <td>Resumo Simples</td>
            <td>Default</td>
        <tr>
        <tr>
            <td>range</td>
            <td>range em um array ou simplificado</td>
            <td>[[]]</td>
        <tr>
    </table>
</details></br>

```javascript
count_type_values("1d20")           // {negatives: 0, positives: 20, zeros: 0, total: 20}
count_type_values("1d20_-20")       // {negatives: 20, positives: 20, zeros: 1, total: 41}
count_type_values("2d20_-20")       // {negatives: 820, positives: 820, zeros: 41, total: 1681}
count_type_values("van 2d20_-20")   // {negatives: 8000, positives: 59660, zeros: 1261, total: 68921}
```

<details>
    <summary>Saiba mais Detalhes</summary>
    Caso qualquer argumento seja invalido a função retorna null.</br>
    Caso um o argumento "range" seja uma string de um range simplificado o range e convertido para um array.</br>
    </br>
    Essa função entra na categoria O(n).
</details></br>

# 5. Outras Informações

Acho importante mencionar que essa é a primeira lib que eu estou publicando e por causa disso é provável que a lib tenha erros ou falta de informações, caso algum problema seja encontrado por favor entre em contato pelo próprio github ou pelo email "carloseduardoglin@gmail.com".

Além disso, eu não acho que essa lib esteja completa pois faltam algumas funcionalidades como a possibilidade de obter o maior valor entre múltiplos dados de tamanhos variados. 

Também pretendo reduzir a complexidade de algumas funções que são O(n²).