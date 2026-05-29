function MonthNavigator({ currentDate, onPrevMonth, onNextMonth, onOpenHistory }) {
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  console.log('[NAVIGATOR] Current month:', monthName)

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <button
        onClick={onPrevMonth}
        className="p-2 text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Mes anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        {monthName}
      </h2>
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenHistory}
          className="p-2 text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Ver historial"
          title="Historial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mes siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MonthNavigator