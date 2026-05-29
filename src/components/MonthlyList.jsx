import PaymentCard from './PaymentCard'
import useObligationsStore from '../store/useObligationsStore'

function getMonthKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function MonthlyList({ currentDate, onEdit, onDelete, onTogglePayment }) {
  const obligations = useObligationsStore((state) => state.obligations)
  const payments = useObligationsStore((state) => state.payments)
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)

  console.log('[LIST] Rendering:', obligations.length, 'obligations for', monthName, '| monthKey:', monthKey)

  const isPaid = (obligationId) => {
    const payment = payments.find(
      (p) => p.obligationId === obligationId && p.monthKey === monthKey
    )
    return payment?.paid || false
  }

  return (
    <section className="max-w-lg mx-auto px-4 py-6 flex-1">
      {obligations.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-2">Sin obligaciones este mes</p>
          <p className="text-sm text-gray-400">
            Presiona el botón + para agregar una
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {obligations.map((obligation) => (
            <PaymentCard
              key={obligation.id}
              name={obligation.name}
              amount={obligation.amount}
              dueDay={obligation.dueDay}
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

export { getMonthKey }
export default MonthlyList