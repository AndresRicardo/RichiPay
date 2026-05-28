function PaymentCard({ name, amount, dueDay, onEdit, onDelete }) {
	return (
		<div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
			<div className="flex justify-between items-start">
				<div>
					<p className="font-medium text-gray-800">{name} </p>
					<p className="text-sm text-gray-500 mt-1">Día {dueDay} </p>
				</div>
				<p className="text-lg font-semibold text-[#2563eb]">
					${amount.toLocaleString("es-CO")}
				</p>
			</div>
			<div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
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
	)
}

export default PaymentCard
