# js-atom

Atom contains a value which can change over time.
```js
interface Atom<T, A: mixed[]> {
  deref(): T,
  reset(value: T): Atom<T>,
  swap(fn: (currentValue: T, ...args:A) => T, ...args: A): Atom<T>,
  watch(fn: (newValue: T, oldValue: T) => void): () => void
}
```

### atom
```js
type CreateAtom = <T>(value: T) => Atom<T>
```
Creates new atom.

### deref
```js
type Deref = <T>(ref: Atom<T>) => T
```
Unwrap atom's value

### reset
```js
type Reset = <T>(ref: Atom<T>, value: T) => Atom<T>
```
Rewrites atom's value. Returns atom.

### swap
```js
type Swap = <T, A: mixed[]>(
  ref: Atom<T>,
  transform: (currentValue: T, ...args: A) => T,
  ...args: A
) => Atom<T>
```
Rewrites atom's value through transformer function which takes old value as the first argument and returns new value. Other aruments passed to swap are also passed to transformer function.

### watch
```js
type Watch = <T>(
  ref: Atom<T>,
  callback: (newValue: T, oldValue: T) => void
) => () => void
```
Set a watcher for the atom. Callback will fire every time atom changes through *reset* or *swap*. Returns unsub function.