import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useObligationsStore = create(
  persist(
    (set) => ({
      obligations: [],

      addObligation: (name, amount, dueDay) => {
        const newObligation = {
          id: crypto.randomUUID(),
          name,
          amount,
          dueDay,
        }
        set((state) => ({
          obligations: [...state.obligations, newObligation],
        }))
      },

      editObligation: (id, name, amount, dueDay) => {
        set((state) => ({
          obligations: state.obligations.map((ob) =>
            ob.id === id ? { ...ob, name, amount, dueDay } : ob
          ),
        }))
      },

      removeObligation: (id) => {
        set((state) => ({
          obligations: state.obligations.filter((ob) => ob.id !== id),
        }))
      },
    }),
    {
      name: 'richipay-obligations',
    }
  )
)

export default useObligationsStore
