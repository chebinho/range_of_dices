/**
 * range_of_dices - Type definitions
 * Funções para sortear e calcular probabilidades de dados de faces variadas.
 */

/**
 * Um range é um array 2D onde:
 * - Coluna 0: valor possível
 * - Coluna 1: número de possibilidades desse valor
 *
 * Exemplo para 1d6: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]]
 */
export type Range = [[number, number]];

/**
 * Dados simplificados em string, ex: "1d6", "2d20_5", "van 1d20", "dis 3d12_7"
 */
export type DiceString = string;

/**
 * Operadores matemáticos válidos para operações entre ranges
 */
export type Operator = "+" | "-" | "*" | "**" | "/" | "%" | "+!" | "-!" | "*!" | "**!" | "/!" | "%!";

// ─────────────────────────────────────────────────────────────
// roll_dices.js
// ─────────────────────────────────────────────────────────────

/**
 * Sorteia um ou mais dados aleatoriamente. Se mais de um dado for sorteado,
 * os resultados são somados.
 *
 * @param biggest_face - Maior face do dado (default: 20)
 * @param smaller_face - Menor face do dado (default: 1)
 * @param amount - Número de dados a sortear (default: 1)
 * @returns Resultado somado dos dados, ou null se inválido
 *
 * @example
 * roll_dice(20)        // sorteia 1d20
 * roll_dice(30, 1, 2)  // sorteia 2d30
 */
export function roll_dice(biggest_face?: number, smaller_face?: number, amount?: number): number | null;

/**
 * Sorteia um ou mais dados e retorna o MAIOR valor entre eles (vantagem).
 *
 * @param biggest_face - Maior face do dado (default: 20)
 * @param smaller_face - Menor face do dado (default: 1)
 * @param amount - Número de dados extras comparados (default: 1)
 * @returns Maior valor sorteado, ou null se inválido
 *
 * @example
 * roll_vantage(20)         // maior entre 2d20
 * roll_vantage(-30, 10, 4) // maior entre 5 dados de 10 a -30
 */
export function roll_vantage(biggest_face?: number, smaller_face?: number, amount?: number): number | null;

/**
 * Sorteia dois ou mais dados e retorna o MENOR valor entre eles (desvantagem).
 *
 * @param biggest_face - Maior face do dado (default: 20)
 * @param smaller_face - Menor face do dado (default: 1)
 * @param amount - Número de dados extras comparados (default: 1)
 * @returns Menor valor sorteado, ou null se inválido
 *
 * @example
 * roll_disvantage(20) // menor entre 2d20
 */
export function roll_disvantage(biggest_face?: number, smaller_face?: number, amount?: number): number | null;

/**
 * Busca por simplificações de dados em strings e substitui pelo resultado do sorteio.
 * Aceita prefixos "van" (vantagem) e "dis" (desvantagem).
 * Quando mais de uma string é fornecida, retorna um array com os resultados.
 *
 * @param texts - Uma ou mais strings contendo simplificações de dados
 * @returns String com valores substituídos, array de strings, ou null
 *
 * @example
 * roll_exec("1d20")              // "14"
 * roll_exec("van 1d20")          // "17" (maior de 2d20)
 * roll_exec("1d20+5")            // "9+5"
 * roll_exec("1d20", "van 1d20")  // ["9", "13"]
 */
export function roll_exec(...texts: string[]): string | string[] | null;

/**
 * Mesmo que roll_exec, mas resolve a expressão matemática final e adiciona ao resultado.
 *
 * @param texts - Uma ou mais strings contendo simplificações de dados
 * @returns String com resultado resolvido, array de strings, ou null
 *
 * @example
 * roll("1d20 + 5")         // "6 + 5 = 11"
 * roll("(1d20 * 2) + 5")   // "(11 * 2) + 5 = 27"
 */
export function roll(...texts: string[]): string | string[] | null;

/**
 * Resolve uma expressão matemática presente em uma string,
 * extraindo apenas os valores numéricos válidos.
 *
 * @param text - String contendo uma expressão matemática
 * @returns Resultado numérico da expressão, ou null se inválido
 *
 * @example
 * exec_math("20 + 4 - 3")   // 21
 * exec_math("(20 - 4) * 3") // 48
 * exec_math("1+++1 +---- 1")// 3
 */
export function exec_math(text: string): number | null;

// ─────────────────────────────────────────────────────────────
// range_of_dices.js — criação de ranges
// ─────────────────────────────────────────────────────────────

/**
 * Cria um range simples de um dado com valores e possibilidades uniformes.
 *
 * @param biggest_val - Maior valor do range (default: 20)
 * @param smaller_val - Menor valor do range (default: 1)
 * @param gap - Espaço entre os valores (default: 1)
 * @param possibility - Número de possibilidades por valor, ou array alternado (default: 1)
 * @returns Range criado, ou null se inválido
 *
 * @example
 * range_simple(5)              // [[1,1],[2,1],[3,1],[4,1],[5,1]]
 * range_simple(5, 1, 2)        // [[1,1],[3,1],[5,1]]
 * range_simple(5, 1, 1, [1,9]) // [[1,1],[2,9],[3,1],[4,9],[5,1]]
 */
export function range_simple(
  biggest_val?: number,
  smaller_val?: number,
  gap?: number,
  possibility?: number | number[]
): Range | null;

/**
 * Combina múltiplos ranges iguais de forma otimizada (soma de todos os dados).
 *
 * @param amount - Número de vezes que o range se repete (default: 1)
 * @param biggest_val - Maior valor do range (default: 20)
 * @param smaller_val - Menor valor do range (default: 1)
 * @param gap - Espaço entre os valores (default: 1)
 * @returns Range combinado, ou null se inválido
 *
 * @example
 * range_combine(2, 6) // range de 2d6: [[2,1],[3,2],...,[12,1]]
 */
export function range_combine(
  amount?: number,
  biggest_val?: number,
  smaller_val?: number,
  gap?: number
): Range | null;

/**
 * Cria um range de vantagem ou desvantagem (maior/menor valor entre N dados).
 *
 * @param amount - Número de dados comparados (default: 1)
 * @param biggest_val - Maior valor do range (default: 20)
 * @param smaller_val - Menor valor do range (default: 1)
 * @param gap - Espaço entre os valores (default: 1)
 * @param disadvantage - Se true, contabiliza o menor valor (default: false)
 * @returns Range de vantagem/desvantagem, ou null se inválido
 *
 * @example
 * range_van_or_dis(1, 6)              // vantagem com 1d6
 * range_van_or_dis(1, 6, 1, 1, true)  // desvantagem com 1d6
 */
export function range_van_or_dis(
  amount?: number,
  biggest_val?: number,
  smaller_val?: number,
  gap?: number,
  disadvantage?: boolean
): Range | null;

/**
 * Atalho para range_van_or_dis com disadvantage = false (vantagem).
 *
 * @example
 * range_vantage(2, 20) // maior entre 2d20
 */
export function range_vantage(
  amount?: number,
  biggest_val?: number,
  smaller_val?: number,
  gap?: number
): Range | null;

/**
 * Atalho para range_van_or_dis com disadvantage = true (desvantagem).
 *
 * @example
 * range_disvantage(2, 20) // menor entre 2d20
 */
export function range_disvantage(
  amount?: number,
  biggest_val?: number,
  smaller_val?: number,
  gap?: number
): Range | null;

/**
 * Converte uma string com dado simplificado em um Range.
 *
 * @param string - String com simplificação de dado (ex: "2d6", "van 1d20")
 * @returns Range correspondente, ou null se inválido
 *
 * @example
 * string_to_range("1d20")      // range_combine(1, 20)
 * string_to_range("van 1d20")  // range_vantage(1, 20)
 * string_to_range("2d20_5")    // range_combine(2, 20, 5)
 */
export function string_to_range(string: DiceString): Range | null;

/**
 * Função universal: executa qualquer expressão matemática com ranges ou
 * dados simplificados. Mais lenta que funções especializadas, mas mais flexível.
 *
 * @param text - String com expressão, Range, ou mistura de ambos
 * @returns Range resultante, ou null se inválido
 *
 * @example
 * range("2d6")              // range de 2d6
 * range("1d6 + 1d6")        // equivalente a range("2d6")
 * range("van 2d6 + 1d6")    // vantagem + dado extra
 * range("1d6-1d6")          // diferença entre dois d6
 */
export function range(text: string | Range | (string | Range)[]): Range | null;

// ─────────────────────────────────────────────────────────────
// range_of_dices.js — edição de ranges
// ─────────────────────────────────────────────────────────────

/**
 * Une dois ranges somando seus valores. Escolhe automaticamente entre
 * join_ranges_fast (linear) e join_ranges_all (geral) conforme os dados.
 *
 * @param range_1 - Primeiro range (array ou string simplificada)
 * @param range_2 - Segundo range (array ou string simplificada)
 * @returns Range unido, ou null se ambos inválidos
 */
export function join_ranges(
  range_1: Range | DiceString | number,
  range_2: Range | DiceString | number
): Range | number | null;

/**
 * Aplica uma operação matemática entre todos os pares de valores dos dois ranges.
 * Complexidade O(n × m) — pode ser lento para ranges grandes.
 *
 * @param range_1 - Primeiro range (array ou string simplificada)
 * @param range_2 - Segundo range (array ou string simplificada)
 * @param operator - Operador matemático (default: "+")
 * @returns Range com todas as combinações, ou null se inválido
 *
 * @example
 * join_ranges_all("1d6", "1d6", "-") // diferença entre dois d6
 */
export function join_ranges_all(
  range_1: Range | DiceString,
  range_2: Range | DiceString,
  operator?: Operator
): Range | null;

/**
 * Versão otimizada de join_ranges_all para ranges com sequência linear de valores.
 * Mais rápida, mas requer que os valores do range sejam igualmente espaçados.
 *
 * @param range_1 - Primeiro range com valores lineares
 * @param range_2 - Segundo range com valores lineares
 * @param gap - Espaço entre os valores (default: 1)
 * @returns Range unido, ou null se inválido
 */
export function join_ranges_fast(
  range_1: Range | DiceString,
  range_2: Range | DiceString,
  gap?: number
): Range | null;

/**
 * Combina dois ranges: valores em comum têm suas possibilidades operadas,
 * valores exclusivos são mantidos separadamente.
 *
 * @param range_1 - Primeiro range (array ou string simplificada)
 * @param range_2 - Segundo range (array ou string simplificada)
 * @param operator - Operador aplicado nas possibilidades (default: "+")
 * @returns Range mesclado, ou null se inválido
 *
 * @example
 * merge_ranges("1d6", "1d6")       // [[1,2],[2,2],...,[6,2]]
 * merge_ranges("1d6", "1d8_4")     // [[1,1],...,[4,2],...,[8,1]]
 */
export function merge_ranges(
  range_1: Range | DiceString | number,
  range_2: Range | DiceString | number,
  operator?: Operator
): Range | null;

/**
 * Aplica uma operação matemática entre todos os valores de um range e um número.
 *
 * @param range - Range de entrada (array ou string simplificada)
 * @param number - Número a operar (default: 1)
 * @param operator - Operador matemático (default: "+")
 * @returns Range com valores modificados, ou null se inválido
 *
 * @example
 * merge_range_and_number("1d6", 100, "+") // [[101,1],...,[106,1]]
 */
export function merge_range_and_number(
  range: Range | DiceString,
  number?: number,
  operator?: Operator
): Range | null;

/**
 * Inverte os valores de um range (positivos viram negativos e vice-versa).
 *
 * @param range - Range de entrada (array ou string simplificada)
 * @returns Range com valores invertidos, ou null se inválido
 *
 * @example
 * flip_range("1d6") // [[-6,1],[-5,1],...,[-1,1]]
 */
export function flip_range(range: Range | DiceString): Range | null;

// ─────────────────────────────────────────────────────────────
// range_of_dices.js — conversão de ranges
// ─────────────────────────────────────────────────────────────

/**
 * Converte as possibilidades de um range em porcentagens (0 a 1).
 *
 * @param range - Range de entrada (array ou string simplificada)
 * @returns Range com possibilidades em porcentagem, ou null se inválido
 *
 * @example
 * range_to_percentage("1d5") // [[1,0.2],[2,0.2],...,[5,0.2]]
 *
 * @remarks O range resultante pode não ser compatível com outras funções da lib.
 */
export function range_to_percentage(range: Range | DiceString): Range | null;

/**
 * Conta as possibilidades totais separadas por tipo de valor
 * (positivos, negativos e zeros).
 *
 * @param range - Range de entrada (array ou string simplificada)
 * @returns Objeto com contagens, ou null se inválido
 *
 * @example
 * count_type_values("1d20")
 * // { negatives: 0, positives: 20, zeros: 0, total: 20 }
 */
export function count_type_values(range: Range | DiceString): {
  negatives: number;
  positives: number;
  zeros: number;
  total: number;
} | null;
