import { useState } from "react"
import { getMonthKey } from "../store/useObligationsStore"

const MONTHS = [
  { value: 1, label: "Ene" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Abr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Ago" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dic" },
]

function ObligationModal({ isOpen, onClose, onSave, initialData, currentDate }) {
  const isEdit = Boolean(initialData)
  console.log("[MODAL] Opening:", isEdit ? "EDIT" : "CREATE", initialData, "| currentDate:", currentDate)

  const [type, setType] = useState(() => {
    if (isEdit && initialData) return initialData.type || "recurring"
    return "recurring"
  })
  const [startMonth, setStartMonth] = useState(() => {
    if (isEdit && initialData) return initialData.start_month || ""
    return getMonthKey(currentDate)
  })
  const [applicableMonths, setApplicableMonths] = useState(() => {
    if (isEdit && initialData) return initialData.applicable_months || []
    return []
  })

  const handleMonthToggle = (month) => {
    setApplicableMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    )
  }

  const handleSubmit = () => {
    const form = document.getElementById("obligation-form")
    const formData = new FormData(form)
    const name = formData.get("name")
    const amount = Number(formData.get("amount"))
    const dueDay = Number(formData.get("dueDay"))
    console.log("[MODAL] Submit:", { name, amount, dueDay, type, startMonth, applicableMonths })
    onSave(name, amount, dueDay, type, startMonth, applicableMonths)
    form.reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative glass-card w-full max-w-md shadow-[0_0_40px_rgba(0,245,255,0.15)] max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-[rgba(0,245,255,0.15)] bg-[rgba(18,18,26,0.95)] backdrop-blur-sm sticky top-0 z-10">
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {isEdit ? "EDITAR OBLIGACIÓN" : "NUEVA OBLIGACIÓN"}
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] text-2xl leading-none transition-colors duration-300"
          >
            ×
          </button>
        </div>
        <form id="obligation-form" className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1 tracking-wider">
              NOMBRE
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300 text-sm"
              placeholder="Ej: Arriendo"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-xs font-medium text-[var(--text-secondary)] mb-1 tracking-wider">
              VALOR (COP)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              defaultValue={initialData?.amount}
              required
              min="1"
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300 text-sm"
              placeholder="Ej: 1500000"
            />
          </div>
          <div>
            <label htmlFor="dueDay" className="block text-xs font-medium text-[var(--text-secondary)] mb-1 tracking-wider">
              DÍA LÍMITE
            </label>
            <input
              type="number"
              id="dueDay"
              name="dueDay"
              defaultValue={initialData?.due_day}
              required
              min="1"
              max="31"
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300 text-sm"
              placeholder="Ej: 5"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 tracking-wider">
              TIPO
            </label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer group flex-1">
                <input
                  type="radio"
                  name="type"
                  value="recurring"
                  checked={type === "recurring"}
                  onChange={() => setType("recurring")}
                  className="w-4 h-4 text-[var(--neon-cyan)] focus:ring-[var(--neon-cyan)] focus:ring-offset-0 bg-transparent border-2 border-[rgba(0,245,255,0.4)]"
                />
                <span className="text-xs text-[var(--text-secondary)] group-hover:text-white transition-colors">Recurrente</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group flex-1">
                <input
                  type="radio"
                  name="type"
                  value="occasional"
                  checked={type === "occasional"}
                  onChange={() => setType("occasional")}
                  className="w-4 h-4 text-[var(--neon-cyan)] focus:ring-[var(--neon-cyan)] focus:ring-offset-0 bg-transparent border-2 border-[rgba(180,0,255,0.4)]"
                />
                <span className="text-xs text-[var(--text-secondary)] group-hover:text-white transition-colors">Ocasional</span>
              </label>
            </div>
          </div>

          {type === "recurring" && (
            <div>
              <label htmlFor="startMonth" className="block text-xs font-medium text-[var(--text-secondary)] mb-1 tracking-wider">
                MOSTRAR DESDE MES
              </label>
              <input
                type="month"
                id="startMonth"
                name="startMonth"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(0,245,255,0.2)] rounded-lg text-white focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300 text-sm"
              />
            </div>
          )}

          {type === "occasional" && (
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 tracking-wider">
                MESES EN QUE APLICA
              </label>
              <div className="grid grid-cols-4 gap-2">
                {MONTHS.map((month) => (
                  <label
                    key={month.value}
                    className={`flex flex-col items-center p-2 border rounded-lg cursor-pointer transition-all duration-300 ${
                      applicableMonths.includes(month.value)
                        ? "border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.1)] shadow-[0_0_8px_rgba(0,245,255,0.2)]"
                        : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,245,255,0.3)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={applicableMonths.includes(month.value)}
                      onChange={() => handleMonthToggle(month.value)}
                      className="sr-only"
                    />
                    <span className="text-xs font-semibold tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{month.label}</span>
                  </label>
                ))}
              </div>
              {applicableMonths.length === 0 && (
                <p className="text-xs text-[var(--neon-red)] mt-1">
                  Selecciona al menos un mes
                </p>
              )}
            </div>
          )}
        </form>
        <div className="p-4 border-t border-[rgba(0,245,255,0.15)] bg-[rgba(18,18,26,0.95)] backdrop-blur-sm sticky bottom-0">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-[var(--text-secondary)] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 text-sm font-medium"
            >
              CANCELAR
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={type === "occasional" && applicableMonths.length === 0}
              className="flex-1 px-4 py-2.5 text-[#0a0a0f] bg-[var(--neon-cyan)] rounded-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all duration-300 text-sm font-semibold tracking-wider disabled:bg-[var(--text-muted)] disabled:cursor-not-allowed disabled:shadow-none"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {isEdit ? "GUARDAR" : "CREAR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObligationModal