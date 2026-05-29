import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

function getMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

const useObligationsStore = create(
	persist(
		(set, get) => ({
			obligations: [],
			payments: [],

			addObligation: (name, amount, dueDay, type = "recurring", startMonth = null, applicableMonths = []) => {
				const newObligation = {
					id: uuidv4(),
					name,
					amount,
					dueDay,
					type,
					startMonth: startMonth || getMonthKey(new Date()),
					applicableMonths: type === "occasional" ? applicableMonths : [],
				};
				console.log("[STORE] addObligation:", newObligation);
				set((state) => ({
					obligations: [...state.obligations, newObligation],
				}));
			},

			editObligation: (id, name, amount, dueDay, type, startMonth, applicableMonths) => {
				console.log("[STORE] editObligation:", { id, name, amount, dueDay, type, startMonth, applicableMonths });
				set((state) => ({
					obligations: state.obligations.map((ob) =>
						ob.id === id
							? {
									...ob,
									name,
									amount,
									dueDay,
									type,
									startMonth,
									applicableMonths: type === "occasional" ? applicableMonths : [],
							  }
							: ob
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

			shouldShowObligation: (obligation, currentDate) => {
				const monthKey = getMonthKey(currentDate);
				const currentYearMonth = monthKey;
				const startYearMonth = obligation.startMonth;
				const currentMonth = currentDate.getMonth() + 1;

				console.log("[STORE] shouldShowObligation:", {
					obligationName: obligation.name,
					currentYearMonth,
					startYearMonth,
					currentMonth,
					type: obligation.type,
					applicableMonths: obligation.applicableMonths,
				});

				if (currentYearMonth < startYearMonth) {
					return false;
				}

				if (obligation.type === "recurring") {
					return true;
				}

				if (obligation.type === "occasional") {
					return obligation.applicableMonths.includes(currentMonth);
				}

				return false;
			},
		}),
		{
			name: "richipay-obligations",
		}
	)
);

export { getMonthKey };
export default useObligationsStore;