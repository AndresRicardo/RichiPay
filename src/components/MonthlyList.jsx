import PaymentCard from './PaymentCard'
import useObligationsStore, { getMonthKey } from '../store/useObligationsStore'

function MonthlyList({ currentDate, onEdit, onDelete, onTogglePayment }) {
  const obligations = useObligationsStore((state) => state.obligations)
  const payments = useObligationsStore((state) => state.payments)
  const shouldShowObligation = useObligationsStore((state) => state.shouldShowObligation)
  const isHidden = useObligationsStore((state) => state.isHidden)
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)

  console.log('[LIST] Rendering for', monthName, '| monthKey:', monthKey)

  const visibleObligations = obligations.filter((ob) => {
    if (!shouldShowObligation(ob, currentDate)) {
      return false
    }
    if (isHidden(ob.id, monthKey)) {
      console.log('[LIST] Filtering hidden:', ob.name)
      return false
    }
    return true
  })

  console.log('[LIST] Visible obligations:', visibleObligations.length, 'of', obligations.length)

  const isPaid = (obligationId) => {
    const payment = payments.find(
      (p) => p.obligation_id === obligationId && p.month_key === monthKey
    )
    return payment?.paid || false
  }

  const isOverdue = (dueDay) => {
    const today = new Date()
    const currentMonthMatch = currentDate.getMonth() === today.getMonth() && 
                              currentDate.getFullYear() === today.getFullYear()
    return currentMonthMatch && today.getDate() > dueDay
  }

  return (
    <section className="max-w-lg mx-auto px-4 py-6 flex-1">
      {visibleObligations.length === 0 ? (
        <div className="glass-card p-12 text-center border-[rgba(0,245,255,0.1)]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgba(0,245,255,0.05)] flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--neon-cyan)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p className="text-[var(--text-secondary)] mb-3 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Sin obligaciones este mes</p>
          <p className="text-sm text-[var(--text-muted)]">
            Presiona el botón + para agregar una
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleObligations.map((obligation, index) => (
            <div key={obligation.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <PaymentCard
                name={obligation.name}
                amount={obligation.amount}
                dueDay={obligation.due_day}
                type={obligation.type}
                isPaid={isPaid(obligation.id)}
                isOverdue={isOverdue(obligation.due_day)}
                onEdit={() => onEdit(obligation)}
                onDelete={() => onDelete(obligation)}
                onToggle={() => onTogglePayment(obligation.id, monthKey)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MonthlyList