function ObligationModal({ isOpen, onClose, onSave, initialData }) {
  const isEdit = Boolean(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const amount = Number(formData.get('amount'))
    const dueDay = Number(formData.get('dueDay'))
    onSave(name, amount, dueDay)
    e.target.reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEdit ? 'Editar obligación' : 'Nueva obligación'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
              defaultValue={initialData?.dueDay}
              required
              min="1"
              max="31"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent"
              placeholder="Ej: 5"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-[#10b981] rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {isEdit ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ObligationModal
