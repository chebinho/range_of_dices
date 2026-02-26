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

Caso mais de uma string seja fornecida a função retorna um array com os resultados ordenados.

```
roll_exec("1d20", "van 1d20", "dis 1d20", "1d20+5", "1d20+1d6") 
// exemplo de resultado: ["9", "13", "4", "10+5", "14+2"]
```

Essa função pode não parecer segura por executar outras funções em uma string, mas regra só se aplica às funções: roll_dice, roll_vantage e roll_disvantage.
Outras funções fora dessa lista são ignoradas.

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

### 3.3.1. Create the ranges <hr>

### **range_simple** (biggest_val, smaller_val, gap, possibility) <hr>

O propósito dessa função é de facilitar a criação de qualquer range.

 - biggest_val: valor do maior do range,    placeholder = 20
 - smaller_val: menor valor do range,       placeholder = 1 
 - gap: espaço entre os valores,            placeholder = 1
 - possibility: número de possibilidades,   placeholder = 1

```
range_simple(5)                 // [ [1, 1],[2, 1],[3, 1],[4, 1],[5, 1] ]
range_simple(5,2)               // [ [2, 1],[3, 1],[4, 1],[5, 1] ]
range_simple(5,1,2)             // [ [1, 1],[3, 1],[5, 1] ]
range_simple(5,1,1,9)           // [ [1, 9],[2, 9],[3, 9],[4, 9],[5, 9] ]
range_simple(5,1,1,[1,9])       // [ [1, 1],[2, 9],[3, 1],[4, 9],[5, 1] ]
```

caso qualquer valor seja invalido a função retorna null.
se o "biggest_val" for menor que o "smaller_val" esses valores são trocados.
se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.
se a "possibility" for um array os valores seguiram a sequencia de valores do array.

### **range_combinations** (amount, biggest_val, smaller_val, gap) <hr>

Faz a combinação de multiplos ranges iguais da maneira mais eficiente dessa lib.

 - amount: número de vezes que o range se repete,   placeholder = 1
 - biggest_val: valor do maior do range,            placeholder = 20
 - smaller_val: menor valor do range,               placeholder = 1 
 - gap: espaço entre os valores,                    placeholder = 1

```
range_combinations(1,5)     // [ [1, 1],[2, 1],[3, 1],[4, 1],[5, 1] ]
range_combinations(2,5)     // [ [2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 4],[8, 3],[9, 2],[10, 1] ]
range_combinations(2,5,2)   // [ [4, 1],[5, 2],[6, 3],[7, 4],[8, 3],[9, 2],[10, 1] ]
range_combinations(2,5,1,2) // [ [2, 1],[4, 2],[6, 3],[8, 2],[10, 1] ]
```

caso qualquer valor seja invalido a função retorna null.
se "amount" for um valor negativo ele se torna positivo.
se o "biggest_val" for menor que o "smaller_val" esses valores são trocados.
se "gap" for um valor negativo ele se torna positivo, se for 0 retorna Infinity.

### **range_van_or_dis** (amount, biggest_val, smaller_val, gap, disadvantage) <hr>



### **range_vantage** () <hr>

### **range_disvantage** () <hr>

### **string_to_range** () <hr>

### **range** () <hr>


### 3.3.2. Edit the ranges <hr>

### **join_ranges** () <hr>

### **join_ranges_all** () <hr>

### **join_ranges_fast** () <hr>

### **merge_ranges** () <hr>

### **merge_range_and_number** () <hr>


### 3.3.3. convert the ranges <hr>

### **range_to_convolution** () <hr>

### **range_to_percentage** () <hr>

### **count_type_values** () <hr>

### **negative_range** () <hr>


# API/Documentação