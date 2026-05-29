import { useState, useEffect } from "react"
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

function ObligationModal({ isOpen, onClose, onSave, initialData }) {
  const isEdit = Boolean(initialData)
  console.log("[MODAL] Opening:", isEdit ? "EDIT" : "CREATE", initialData)

  const [type, setType] = useState("recurring")
  const [startMonth, setStartMonth] = useState("")
  const [applicableMonths, setApplicableMonths] = useState([])

  useEffect(() => {
    if (isOpen) {
      if (isEdit && initialData) {
        setType(initialData.type || "recurring")
        setStartMonth(initialData.start_month || "")
        setApplicableMonths(initialData.applicable_months || [])
      } else {
        setType("recurring")
        setStartMonth(getMonthKey(new Date()))
        setApplicableMonths([])
      }
    }
  }, [isOpen, isEdit, initialData])

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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Editar obligación" : "Nueva obligación"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <form id="obligation-form" className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent"
              placeholder="Ej: Arriendo"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (COP)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              defaultValue={initialData?.amount}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent"
              placeholder="Ej: 1500000"
            />
          </div>
          <div>
            <label htmlFor="dueDay" className="block text-sm font-medium text-gray-700 mb-1">
              Día límite de pago
            </label>
            <input
              type="number"
              id="dueDay"
              name="dueDay"
              defaultValue={initialData?.due_day}
              required
              min="1"
              max="31"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent"
              placeholder="Ej: 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="recurring"
                  checked={type === "recurring"}
                  onChange={() => setType("recurring")}
                  className="w-4 h-4 text-[#10b981] focus:ring-[#10b981]"
                />
                <span className="text-sm text-gray-700">Recurrente</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="occasional"
                  checked={type === "occasional"}
                  onChange={() => setType("occasional")}
                  className="w-4 h-4 text-[#10b981] focus:ring-[#10b981]"
                />
                <span className="text-sm text-gray-700">Ocasional</span>
              </label>
            </div>
          </div>

          {type === "recurring" && (
            <div>
              <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700 mb-1">
                Mostrar desde mes
              </label>
              <input
                type="month"
                id="startMonth"
                name="startMonth"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent"
              />
            </div>
          )}

          {type === "occasional" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meses en que aplica
              </label>
              <div className="grid grid-cols-6 gap-2">
                {MONTHS.map((month) => (
                  <label
                    key={month.value}
                    className={`flex flex-col items-center p-2 border rounded-lg cursor-pointer transition-colors ${
                      applicableMonths.includes(month.value)
                        ? "border-[#10b981] bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={applicableMonths.includes(month.value)}
                      onChange={() => handleMonthToggle(month.value)}
                      className="sr-only"
                    />
                    <span className="text-xs font-medium">{month.label}</span>
                  </label>
                ))}
              </div>
              {applicableMonths.length === 0 && (
                <p className="text-xs text-red-500 mt-1">
                  Selecciona al menos un mes
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={type === "occasional" && applicableMonths.length === 0}
              className="flex-1 px-4 py-2 text-white bg-[#10b981] rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ObligationModal