import PaymentCard from './PaymentCard'

function MonthlyList() {
  const currentDate = new Date()
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })

  const mockObligations = [
    { id: 1, name: 'Arriendo', amount: 1500000, dueDay: 5 },
    { id: 2, name: 'Servicios', amount: 280000, dueDay: 10 },
  ]

  return (
    <section className="max-w-lg mx-auto px-4 py-6 flex-1">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
        {monthName}
      </h2>

      {mockObligations.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-2">Sin obligaciones este mes</p>
          <p className="text-sm text-gray-400">
            Presiona el botón + para agregar una
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockObligations.map((obligation) => (
            <PaymentCard
              key={obligation.id}
              name={obligation.name}
              amount={obligation.amount}
              dueDay={obligation.dueDay}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MonthlyList