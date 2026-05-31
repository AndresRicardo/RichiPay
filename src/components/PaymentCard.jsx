function PaymentCard({ name, amount, dueDay, type, isPaid, isOverdue, onToggle, onEdit, onDelete }) {
  console.log('[PAYMENT_CARD] Render:', { name, amount, dueDay, type, isPaid, isOverdue })

  return (
    <div className={`glass-card p-5 transition-all duration-300 hover:translate-y-[-2px] group ${isPaid ? 'border-[rgba(0,255,136,0.3)]' : isOverdue ? 'border-[rgba(255,51,102,0.5)] shadow-[0_0_20px_rgba(255,51,102,0.3)]' : 'border-[rgba(0,245,255,0.2)]'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isPaid ? 'bg-[var(--neon-green)] shadow-[0_0_10px_rgba(0,255,136,0.5)]' : isOverdue ? 'bg-[var(--neon-red)] shadow-[0_0_10px_rgba(255,51,102,0.5)] animate-pulse' : 'bg-[var(--neon-amber)] shadow-[0_0_10px_rgba(255,170,0,0.5)]'}`} />
          <p className="font-semibold text-white text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{name}</p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold tracking-wider border ${
              type === 'occasional'
                ? 'border-[rgba(180,0,255,0.5)] text-[var(--neon-magenta)] bg-[rgba(180,0,255,0.1)]'
                : 'border-[rgba(0,245,255,0.5)] text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.1)]'
            }`}
            title={type === 'occasional' ? 'Ocasional' : 'Recurrente'}
          >
            {type === 'occasional' ? 'O' : 'R'}
          </span>
          {isOverdue && !isPaid && (
            <span className="text-xs px-2 py-0.5 rounded-full font-bold tracking-wider border border-[rgba(255,51,102,0.5)] text-[var(--neon-red)] bg-[rgba(255,51,102,0.15)] animate-pulse" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              ATRASADO
            </span>
          )}
        </div>
        <p className={`text-2xl font-bold ${isPaid ? 'neon-text-green' : isOverdue ? 'text-[var(--neon-red)]' : 'text-[var(--neon-cyan)]'}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          ${amount.toLocaleString("es-CO")}
        </p>
      </div>
      <p className="text-sm text-[var(--text-muted)] mb-4 ml-6">Día {dueDay}</p>
      <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            isPaid
              ? 'text-[var(--neon-green)] bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.3)] hover:bg-[rgba(0,255,136,0.2)]'
              : 'text-[var(--text-secondary)] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,245,255,0.4)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)]'
          }`}
        >
          <svg className="w-4 h-4" fill={isPaid ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {isPaid ? 'Pagada' : 'Marcar pagada'}
        </button>
        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] py-1 transition-all duration-300 group-hover:text-[var(--neon-cyan)]"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-red)] py-1 transition-all duration-300"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentCard