import PaymentCard from './PaymentCard'
import useObligationsStore, { getMonthKey } from '../store/useObligationsStore'

function MonthlyList({ currentDate, onEdit, onDelete, onTogglePayment }) {
  const obligations = useObligationsStore((state) => state.obligations)
  const payments = useObligationsStore((state) => state.payments)
  const shouldShowObligation = useObligationsStore((state) => state.shouldShowObligation)
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)

  console.log('[LIST] Rendering for', monthName, '| monthKey:', monthKey)

  const visibleObligations = obligations.filter((ob) =>
    shouldShowObligation(ob, currentDate)
  )

  console.log('[LIST] Visible obligations:', visibleObligations.length, 'of', obligations.length)

  const isPaid = (obligationId) => {
    const payment = payments.find(
      (p) => p.obligationId === obligationId && p.monthKey === monthKey
    )
    return payment?.paid || false
  }

  return (
    <section className="max-w-lg mx-auto px-4 py-6 flex-1">
      {visibleObligations.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-2">Sin obligaciones este mes</p>
          <p className="text-sm text-gray-400">
            Presiona el botón + para agregar una
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleObligations.map((obligation) => (
            <PaymentCard
              key={obligation.id}
              name={obligation.name}
              amount={obligation.amount}
              dueDay={obligation.dueDay}
              type={obligation.type}
              isPaid={isPaid(obligation.id)}
              onEdit={() => onEdit(obligation)}
              onDelete={() => onDelete(obligation.id)}
              onToggle={() => onTogglePayment(obligation.id, monthKey)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MonthlyList