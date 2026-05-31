import { getMonthKey } from '../store/useObligationsStore'

function DeleteConfirmModal({ isOpen, onClose, onDelete, onDeleteFromMonth, onHideThisMonth, obligation, currentDate }) {
  if (!isOpen || !obligation) return null

  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  const monthKey = getMonthKey(currentDate)

  console.log('[DELETE_MODAL] Opening for:', obligation.name, '| month:', monthName)

  const handleDeleteThisTime = () => {
    console.log('[DELETE_MODAL] Hide this month only')
    onHideThisMonth(obligation.id, monthKey)
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative glass-card w-full max-w-sm shadow-[0_0_40px_rgba(255,51,102,0.15)] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3 tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            ELIMINAR OBLIGACIÓN
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            ¿Qué deseas hacer con <span className="text-white font-semibold">"{obligation.name}"</span>?
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Visible en {monthName}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleDeleteThisTime}
              className="w-full flex flex-col items-start p-4 border border-[rgba(0,245,255,0.2)] rounded-lg hover:bg-[rgba(0,245,255,0.05)] hover:border-[rgba(0,245,255,0.4)] transition-all duration-300 text-left group"
            >
              <span className="font-semibold text-white group-hover:text-[var(--neon-cyan)] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Eliminar solo esta vez</span>
              <span className="text-sm text-[var(--text-muted)] mt-1">
                Se elimina solo para {monthName}. Volverá a aparecer en meses futuros.
              </span>
            </button>

            <button
              onClick={handleDeleteFromMonth}
              className="w-full flex flex-col items-start p-4 border border-[rgba(180,0,255,0.2)] rounded-lg hover:bg-[rgba(180,0,255,0.05)] hover:border-[rgba(180,0,255,0.4)] transition-all duration-300 text-left group"
            >
              <span className="font-semibold text-white group-hover:text-[var(--neon-magenta)] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Eliminar de aquí en adelante</span>
              <span className="text-sm text-[var(--text-muted)] mt-1">
                Deja de mostrarse desde {monthName}. Los datos históricos se mantienen.
              </span>
            </button>

            <button
              onClick={handleDeleteCompletely}
              className="w-full flex flex-col items-start p-4 border border-[rgba(255,51,102,0.3)] rounded-lg hover:bg-[rgba(255,51,102,0.1)] hover:border-[var(--neon-red)] transition-all duration-300 text-left group"
            >
              <span className="font-semibold text-[var(--neon-red)] group-hover:text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Eliminar por completo</span>
              <span className="text-sm text-[var(--text-muted)] mt-1">
                Se elimina de la base de datos. No se puede deshacer.
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-5 py-3 text-[var(--text-secondary)] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 font-medium tracking-wider"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal