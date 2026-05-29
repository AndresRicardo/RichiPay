import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useObligationsStore = create(
	persist(
		(set, get) => ({
			obligations: [],
			payments: [],

			addObligation: (name, amount, dueDay) => {
				const newObligation = {
					id: uuidv4(),
					name,
					amount,
					dueDay,
				};
				console.log("[STORE] addObligation:", {
					name,
					amount,
					dueDay,
					id: newObligation.id,
				});
				set((state) => ({
					obligations: [...state.obligations, newObligation],
				}));
			},

			editObligation: (id, name, amount, dueDay) => {
				console.log("[STORE] editObligation:", { id, name, amount, dueDay });
				set((state) => ({
					obligations: state.obligations.map((ob) =>
						ob.id === id ? { ...ob, name, amount, dueDay } : ob
					),
				}));
			},

			removeObligation: (id) => {
				console.log("[STORE] removeObligation:", id);
				set((state) => ({
					obligations: state.obligations.filter((ob) => ob.id !== id),
					payments: state.payments.filter((p) => p.obligationId !== id),
				}));
			},

			togglePayment: (obligationId, monthKey) => {
				console.log("[STORE] togglePayment:", { obligationId, monthKey });
				const { payments } = get();
				const existing = payments.find(
					(p) => p.obligationId === obligationId && p.monthKey === monthKey
				);

				if (existing) {
					set({
						payments: payments.map((p) =>
							p.obligationId === obligationId && p.monthKey === monthKey
								? { ...p, paid: !p.paid, paidAt: !p.paid ? new Date().toISOString() : null }
								: p
						),
					});
				} else {
					set({
						payments: [
							...payments,
							{
								id: uuidv4(),
								obligationId,
								monthKey,
								paid: true,
								paidAt: new Date().toISOString(),
							},
						],
					});
				}
			},

			isPaid: (obligationId, monthKey) => {
				const { payments } = get();
				const payment = payments.find(
					(p) => p.obligationId === obligationId && p.monthKey === monthKey
				);
				console.log("[STORE] isPaid:", { obligationId, monthKey, paid: payment?.paid || false });
				return payment?.paid || false;
			},
		}),
		{
			name: "richipay-obligations",
		}
	)
);

export default useObligationsStore;