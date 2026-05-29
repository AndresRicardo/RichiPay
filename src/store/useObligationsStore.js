import { create } from 'zustand'
import supabase from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'

function getMonthKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

const useObligationsStore = create((set, get) => ({
  obligations: [],
  payments: [],
  loading: false,
  error: null,
  initialized: false,

  fetchData: async (userId) => {
    console.log('[STORE] Fetching data for user:', userId)
    set({ loading: true, error: null })
    
    try {
      const [obligationsResult, paymentsResult] = await Promise.all([
        supabase
          .from('obligations')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: true }),
        supabase
          .from('payments')
          .select('*')
          .eq('user_id', userId)
          .order('month_key', { ascending: true })
      ])

      if (obligationsResult.error) throw obligationsResult.error
      if (paymentsResult.error) throw paymentsResult.error

      console.log('[STORE] Data fetched:', obligationsResult.data.length, 'obligations,', paymentsResult.data.length, 'payments')
      
      set({
        obligations: obligationsResult.data || [],
        payments: paymentsResult.data || [],
        loading: false,
        initialized: true
      })
    } catch (err) {
      console.error('[STORE] Fetch error:', err.message)
      set({ error: err.message, loading: false })
    }
  },

  addObligation: async (name, amount, dueDay, type = 'recurring', startMonth = null, applicableMonths = []) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      console.error('[STORE] addObligation: No user logged in')
      return
    }

    const newObligation = {
      id: uuidv4(),
      user_id: user.id,
      name,
      amount,
      due_day: dueDay,
      type,
      start_month: startMonth || getMonthKey(new Date()),
      applicable_months: type === 'occasional' ? applicableMonths : []
    }
    console.log('[STORE] addObligation:', newObligation)

    try {
      const { data, error } = await supabase
        .from('obligations')
        .insert(newObligation)
        .select()
        .single()

      if (error) throw error
      console.log('[STORE] addObligation success:', data)
      
      set((state) => ({
        obligations: [...state.obligations, data]
      }))
    } catch (err) {
      console.error('[STORE] addObligation error:', err.message)
      set({ error: err.message })
    }
  },

  editObligation: async (id, name, amount, dueDay, type, startMonth, applicableMonths) => {
    console.log('[STORE] editObligation:', { id, name, amount, dueDay, type, startMonth, applicableMonths })

    try {
      const { data, error } = await supabase
        .from('obligations')
        .update({
          name,
          amount,
          due_day: dueDay,
          type,
          start_month: startMonth,
          applicable_months: type === 'occasional' ? applicableMonths : []
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      console.log('[STORE] editObligation success:', data)
      
      set((state) => ({
        obligations: state.obligations.map((ob) => ob.id === id ? data : ob)
      }))
    } catch (err) {
      console.error('[STORE] editObligation error:', err.message)
      set({ error: err.message })
    }
  },

  removeObligation: async (id) => {
    console.log('[STORE] removeObligation:', id)

    try {
      const { error } = await supabase
        .from('obligations')
        .delete()
        .eq('id', id)

      if (error) throw error
      console.log('[STORE] removeObligation success')
      
      set((state) => ({
        obligations: state.obligations.filter((ob) => ob.id !== id),
        payments: state.payments.filter((p) => p.obligation_id !== id)
      }))
    } catch (err) {
      console.error('[STORE] removeObligation error:', err.message)
      set({ error: err.message })
    }
  },

  togglePayment: async (obligationId, monthKey) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      console.error('[STORE] togglePayment: No user logged in')
      return
    }

    console.log('[STORE] togglePayment:', { obligationId, monthKey })
    const { payments } = get()

    const existing = payments.find(
      (p) => p.obligation_id === obligationId && p.month_key === monthKey
    )

    try {
      if (existing) {
        const newPaidStatus = !existing.paid
        const { data, error } = await supabase
          .from('payments')
          .update({
            paid: newPaidStatus,
            paid_at: newPaidStatus ? new Date().toISOString() : null
          })
          .eq('id', existing.id)
          .select()
          .single()

        if (error) throw error
        console.log('[STORE] togglePayment updated:', data)
        
        set({
          payments: payments.map((p) =>
            p.id === existing.id ? data : p
          )
        })
      } else {
        const newPayment = {
          id: uuidv4(),
          user_id: user.id,
          obligation_id: obligationId,
          month_key: monthKey,
          paid: true,
          paid_at: new Date().toISOString()
        }

        const { data, error } = await supabase
          .from('payments')
          .insert(newPayment)
          .select()
          .single()

        if (error) throw error
        console.log('[STORE] togglePayment created:', data)
        
        set({
          payments: [...payments, data]
        })
      }
    } catch (err) {
      console.error('[STORE] togglePayment error:', err.message)
      set({ error: err.message })
    }
  },

  isPaid: (obligationId, monthKey) => {
    const { payments } = get()
    const payment = payments.find(
      (p) => p.obligation_id === obligationId && p.month_key === monthKey
    )
    return payment?.paid || false
  },

  shouldShowObligation: (obligation, currentDate) => {
    const monthKey = getMonthKey(currentDate)
    const currentYearMonth = monthKey
    const startYearMonth = obligation.start_month
    const currentMonth = currentDate.getMonth() + 1

    if (currentYearMonth < startYearMonth) {
      return false
    }

    if (obligation.type === 'recurring') {
      return true
    }

    if (obligation.type === 'occasional') {
      return (obligation.applicable_months || []).includes(currentMonth)
    }

    return false
  },

  clearData: () => {
    console.log('[STORE] Clearing data')
    set({
      obligations: [],
      payments: [],
      loading: false,
      error: null,
      initialized: false
    })
  }
}))

export { getMonthKey }
export default useObligationsStore