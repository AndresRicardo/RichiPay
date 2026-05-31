import { useState, useMemo } from 'react'
import useObligationsStore, { getMonthKey } from "../store/useObligationsStore";

const MONTHS_ES = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" }
];

function HistoryView({ isOpen, onClose, onNavigateToMonth }) {
  console.log("[HISTORY] Rendering history view:", isOpen)

  const obligations = useObligationsStore((state) => state.obligations)
  const payments = useObligationsStore((state) => state.payments)
  const shouldShowObligation = useObligationsStore((state) => state.shouldShowObligation)

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const years = useMemo(() => {
    const allYears = new Set()
    obligations.forEach(ob => {
      if (ob.start_month) {
        const year = parseInt(ob.start_month.split('-')[0])
        allYears.add(year)
      }
    })
    allYears.add(currentYear)
    return Array.from(allYears).sort((a, b) => b - a)
  }, [obligations, currentYear])

  const getMonthSummary = (year, month) => {
    const date = new Date(year, month - 1, 1)
    const monthKey = getMonthKey(date)

    const visibleObligations = obligations.filter((ob) =>
      shouldShowObligation(ob, date)
    )

    let totalAmount = 0
    let paidAmount = 0
    let paidCount = 0
    let pendingCount = 0

    visibleObligations.forEach((ob) => {
      totalAmount += ob.amount
      const payment = payments.find(
        (p) => p.obligation_id === ob.id && p.month_key === monthKey
      )
      if (payment?.paid) {
        paidAmount += ob.amount
        paidCount++
      } else {
        pendingCount++
      }
    })

    return {
      monthKey,
      monthName: MONTHS_ES[month - 1].label,
      year,
      month,
      totalObligations: visibleObligations.length,
      paidCount,
      pendingCount,
      totalAmount,
      paidAmount,
      pendingAmount: totalAmount - paidAmount,
    }
  }

const selectedSummary = getMonthSummary(selectedYear, selectedMonth)

  const handleGoToMonth = () => {
    onNavigateToMonth(selectedYear, selectedMonth)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative glass-card w-full max-w-lg shadow-[0_0_40px_rgba(0,245,255,0.15)] max-h-[80vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-[rgba(0,245,255,0.15)]">
          <h3 className="text-xl font-semibold text-white tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            HISTORIAL DE PAGOS
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] text-2xl leading-none transition-colors duration-300"
          >
            ×
          </button>
        </div>

        <div className="p-5 border-b border-[rgba(0,245,255,0.1)]">
          <div className="flex gap-3 mb-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="flex-1 px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white focus:outline-none focus:border-[var(--neon-cyan)] transition-all duration-300 cursor-pointer"
            >
              {MONTHS_ES.map((m) => (
                <option key={m.value} value={m.value} className="bg-[var(--bg-surface)]">
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-28 px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white focus:outline-none focus:border-[var(--neon-cyan)] transition-all duration-300 cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-[var(--bg-surface)]">
                  {y}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGoToMonth}
            className="w-full py-3 text-[#0a0a0f] bg-[var(--neon-cyan)] rounded-lg hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all duration-300 font-semibold tracking-wider"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            VER MES
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {selectedSummary.totalObligations === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(0,245,255,0.1)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-[var(--text-secondary)]">Sin obligaciones</p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                {MONTHS_ES[selectedMonth - 1].label} {selectedYear}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="glass-card p-5 border-[rgba(0,245,255,0.3)] cursor-pointer hover:border-[rgba(0,245,255,0.5)] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-white text-xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {selectedSummary.monthName} {selectedYear}
                  </h4>
                  <span className="text-sm text-[var(--text-muted)]">
                    {selectedSummary.totalObligations} obligación{selectedSummary.totalObligations !== 1 ? 'es' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-[rgba(0,255,136,0.1)] rounded-lg border border-[rgba(0,255,136,0.2)]">
                    <p className="text-xl font-bold text-[var(--neon-green)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {selectedSummary.paidCount}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Pagadas</p>
                  </div>
                  <div className="text-center p-3 bg-[rgba(255,170,0,0.1)] rounded-lg border border-[rgba(255,170,0,0.2)]">
                    <p className="text-xl font-bold text-[var(--neon-amber)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {selectedSummary.pendingCount}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Pendientes</p>
                  </div>
                  <div className="text-center p-3 bg-[rgba(0,245,255,0.1)] rounded-lg border border-[rgba(0,245,255,0.2)]">
                    <p className="text-xl font-bold text-[var(--neon-cyan)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      ${selectedSummary.totalAmount.toLocaleString("es-CO")}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Total</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">
                    Pagado: <span className="text-[var(--neon-green)] font-semibold">${selectedSummary.paidAmount.toLocaleString("es-CO")}</span>
                  </span>
                  <span className="text-[var(--text-muted)]">
                    Pendiente: <span className="text-[var(--neon-amber)] font-semibold">${selectedSummary.pendingAmount.toLocaleString("es-CO")}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryView