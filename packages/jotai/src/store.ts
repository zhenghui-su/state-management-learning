const createStore = () => {
  const readAtom = () => {}
  const writeAtom = () => {}
  const subscribeAtom = () => {}

  return {
    get: readAtom,
    set: writeAtom,
    sub: subscribeAtom,
  }
}

export type Store = ReturnType<typeof createStore>

let defaultStore: Store | null = null
export const useStore = () => {
  if (!defaultStore) {
    defaultStore = createStore()
  }
  return defaultStore
}
