import { useState, useRef } from 'react'
import { getMonthKey } from '../store/useObligationsStore'

function MonthNavigator({ currentDate, onPrevMonth, onNextMonth, onOpenHistory, onGoToToday }) {
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)
  const [showPicker, setShowPicker] = useState(false)
  const inputRef = useRef(null)
  console.log('[NAVIGATOR] Current month:', monthName, '| monthKey:', monthKey)

  const handleTitleClick = () => {
    console.log('[NAVIGATOR] Opening month picker')
    setShowPicker(true)
    setTimeout(() => {
      if (inputRef.current) {
        try {
          inputRef.current.showPicker?.()
        } catch {
          console.log('[NAVIGATOR] showPicker not supported')
          inputRef.current.focus()
        }
      }
    }, 50)
  }

  const handleMonthChange = (e) => {
    const newMonthKey = e.target.value
    console.log('[NAVIGATOR] Month changed to:', newMonthKey)
    if (newMonthKey) {
      const [year, month] = newMonthKey.split('-')
      onGoToToday(new Date(parseInt(year), parseInt(month) - 1, 1))
    }
    setShowPicker(false)
  }

  return (
    <div className="glass-card mx-4 mt-4 mb-2 rounded-2xl px-4 py-3 flex items-center justify-between border-[rgba(0,245,255,0.15)]">
      <button
        onClick={onPrevMonth}
        className="p-2 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)] rounded-lg transition-all duration-300 border border-transparent hover:border-[rgba(0,245,255,0.3)]"
        aria-label="Mes anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            console.log('[NAVIGATOR] Go to today clicked')
            onGoToToday()
          }}
          className="text-xs px-3 py-1 text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)] rounded-lg transition-all duration-300 font-semibold border border-[rgba(0,245,255,0.3)] hover:border-[var(--neon-cyan)] tracking-wider"
          aria-label="Ir a hoy"
          title="Ir a hoy"
        >
          HOY
        </button>

        <div className="relative">
          <h2
            onClick={handleTitleClick}
            className="text-lg font-semibold text-white capitalize cursor-pointer hover:text-[var(--neon-cyan)] px-3 py-1 rounded-lg transition-all duration-300"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {monthName}
          </h2>
          {showPicker && (
            <input
              ref={inputRef}
              type="month"
              value={monthKey}
              onChange={handleMonthChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onOpenHistory}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)] rounded-lg transition-all duration-300 border border-transparent hover:border-[rgba(0,245,255,0.3)]"
          aria-label="Ver historial"
          title="Historial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)] rounded-lg transition-all duration-300 border border-transparent hover:border-[rgba(0,245,255,0.3)]"
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