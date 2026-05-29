function PaymentCard({ name, amount, dueDay, isPaid, onToggle, onEdit, onDelete }) {
	console.log('[PAYMENT_CARD] Render:', { name, amount, dueDay, isPaid })

	return (
		<div className={`bg-white rounded-xl p-4 shadow-sm border ${isPaid ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'}`}>
			<div className="flex justify-between items-start">
				<div>
					<p className="font-medium text-gray-800">{name}</p>
					<p className="text-sm text-gray-500 mt-1">Día {dueDay}</p>
				</div>
				<p className="text-lg font-semibold text-[#2563eb]">
					${amount.toLocaleString("es-CO")}
				</p>
			</div>
			<div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
				<button
					onClick={onToggle}
					className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors ${
						isPaid
							? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200'
							: 'text-gray-500 hover:bg-gray-100'
					}`}
				>
					<svg className="w-4 h-4" fill={isPaid ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
					{isPaid ? 'Pagada' : 'Marcar pagada'}
				</button>
				<div className="flex gap-2">
					<button
						onClick={onEdit}
						className="flex-1 text-sm text-gray-500 hover:text-[#10b981] py-1 transition-colors"
					>
						Editar
					</button>
					<button
						onClick={onDelete}
						className="flex-1 text-sm text-gray-500 hover:text-red-500 py-1 transition-colors"
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	)
}

export default PaymentCard