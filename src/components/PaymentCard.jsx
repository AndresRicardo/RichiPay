function PaymentCard({ name, amount, dueDay }) {
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
		</div>
	);
}

export default PaymentCard;
