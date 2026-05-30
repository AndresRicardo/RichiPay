import { getMonthKey } from '../store/useObligationsStore'

function DeleteConfirmModal({ isOpen, onClose, onDelete, onDeleteFromMonth, obligation, currentDate }) {
  if (!isOpen || !obligation) return null

  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)

  console.log('[DELETE_MODAL] Opening for:', obligation.name, '| month:', monthName)

  const handleDeleteThisTime = () => {
    console.log('[DELETE_MODAL] Delete this time only')
    onDelete(obligation.id, monthKey)
    onClose()
  }

  const handleDeleteFromMonth = () => {
    console.log('[DELETE_MODAL] Delete from', monthName, 'onwards')
    onDeleteFromMonth(obligation.id, currentDate)
    onClose()
  }

  const handleDeleteCompletely = () => {
    console.log('[DELETE_MODAL] Delete completely')
    onDelete(obligation.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-xl w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Eliminar obligación
          </h3>
          <p className="text-gray-600 mb-1">
            ¿Qué deseas hacer con <span className="font-medium">"{obligation.name}"</span>?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Visible en {monthName}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleDeleteThisTime}
              className="w-full flex flex-col items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#10b981] transition-colors text-left"
            >
              <span className="font-medium text-gray-800">Eliminar solo esta vez</span>
              <span className="text-sm text-gray-500">
                Se elimina solo para {monthName}. Volverá a aparecer en meses futuros.
              </span>
            </button>

            <button
              onClick={handleDeleteFromMonth}
              className="w-full flex flex-col items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#10b981] transition-colors text-left"
            >
              <span className="font-medium text-gray-800">Eliminar de aquí en adelante</span>
              <span className="text-sm text-gray-500">
                Deja de mostrarse desde {monthName}. Los datos históricos se mantienen.
              </span>
            </button>

            <button
              onClick={handleDeleteCompletely}
              className="w-full flex flex-col items-start p-4 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-left"
            >
              <span className="font-medium text-red-600">Eliminar por completo</span>
              <span className="text-sm text-red-400">
                Se elimina de la base de datos. No se puede deshacer.
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal