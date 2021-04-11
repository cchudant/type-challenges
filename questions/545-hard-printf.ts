/*
  545 - printf
  -------
  by null (@BestMaster-YS) #hard #template-literal
  
  ### Question
  
  Implement `Format<T extends string>` generic.
  
  For example,
  
  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```
  
  > View on GitHub: https://tsch.js.org/545
*/


/* _____________ Your Code Here _____________ */

type ControlsMap = {
    s: string,
    d: number,
}
type ParsePrintFormat<S extends string> =
    S extends `${infer _}%${infer Chr}${infer Rest}`
        ? (Chr extends keyof ControlsMap
            ? [ControlsMap[Chr], ...ParsePrintFormat<Rest>]
            : ParsePrintFormat<Rest>)
        : []
type Curried<Fn> =
    Fn extends (...arg: infer Params) => infer Ret
        ? (Params extends [infer A, ...infer Rest]
            ? (arg: A) => Curried<(...arg: Rest) => Ret>
            : Ret)
        : never
type Format<T extends string> = Curried<(...args: ParsePrintFormat<T>) => string>


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/

