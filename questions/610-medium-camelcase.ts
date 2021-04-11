/*
  610 - CamelCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `for-bar-baz` -> `forBarBaz`
  
  > View on GitHub: https://tsch.js.org/610
*/


/* _____________ Your Code Here _____________ */

type CapitalizeCharMap = {
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'i': 'I',
    'j': 'J',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'o': 'O',
    'p': 'P',
    'q': 'Q',
    'r': 'R',
    's': 'S',
    't': 'T',
    'u': 'U',
    'v': 'V',
    'w': 'W',
    'x': 'X',
    'y': 'Y',
    'z': 'Z',
}
type CapitalizeChar<S extends string> = S extends keyof CapitalizeCharMap ? CapitalizeCharMap[S] : S
type CamelCase<S extends string> =
    S extends `-${infer Chr}${infer Rest}`
        ? (S extends `-${keyof CapitalizeCharMap}${Rest}`
            ? `${CapitalizeChar<Chr>}${CamelCase<Rest>}`
            : `-${CamelCase<`${Chr}${Rest}`>}`)
        : (S extends `${infer Fst}${infer Rest}`
            ? `${Fst}${CamelCase<Rest>}`
            : '')


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
  Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
  Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
  Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
  Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
  Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/610/answer
  > View solutions: https://tsch.js.org/610/solutions
  > More Challenges: https://tsch.js.org
*/

