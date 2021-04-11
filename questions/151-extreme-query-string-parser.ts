/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal
  
  ### Question
  
  You're required to implement a type-level parser to parse URL query string into a object literal type.
  
  Some detailed requirements:
  
  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.
  
  > View on GitHub: https://tsch.js.org/151
*/


/* _____________ Your Code Here _____________ */

type AddValue<Obj, Key extends string, Val> =
    Key extends keyof Obj
        ? (Obj[Key] extends [...infer Elm]
            ? (Elm[number] extends Val ? Obj
                : Omit<Obj, Key> & { [K in Key]: [...Elm, Val] })
            : (Obj[Key] extends Val ? Obj
                : Omit<Obj, Key> & { [K in Key]: [Obj[Key], Val] }))
        : Obj & { [K in Key]: Val }
type ParseKV<KV extends string, Obj> =
    KV extends `${infer K}=${infer V}`
        ? AddValue<Obj, K, V>
        : AddValue<Obj, KV, true>
type ParseQueryString2<S extends string, Obj = {}> =
    S extends '' ? Obj
    : (S extends `${infer KV}&${infer Rest}`
        ? ParseQueryString2<Rest, ParseKV<KV, Obj>>
        : ParseKV<S, Obj>)
type Simplify<T> = { [K in keyof T]: T[K] }
type ParseQueryString<S extends string> = Simplify<ParseQueryString2<S>>


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true, k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1', k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1', k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/

