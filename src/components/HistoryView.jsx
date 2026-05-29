import useObligationsStore, { getMonthKey } from "../store/useObligationsStore";

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function HistoryView({ isOpen, onClose, onNavigateToMonth }) {
  console.log("[HISTORY] Rendering history view:", isOpen);

  const obligations = useObligationsStore((state) => state.obligations);
  const payments = useObligationsStore((state) => state.payments);
  const shouldShowObligation = useObligationsStore((state) => state.shouldShowObligation);

  if (!isOpen) return null;

  const getMonthSummary = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const monthKey = getMonthKey(date);

    const visibleObligations = obligations.filter((ob) =>
      shouldShowObligation(ob, date)
    );

    let totalAmount = 0;
    let paidAmount = 0;
    let paidCount = 0;
    let pendingCount = 0;

    visibleObligations.forEach((ob) => {
      totalAmount += ob.amount;
      const payment = payments.find(
        (p) => p.obligationId === ob.id && p.monthKey === monthKey
      );
      if (payment?.paid) {
        paidAmount += ob.amount;
        paidCount++;
      } else {
        pendingCount++;
      }
    });

    return {
      monthKey,
      monthName: MONTHS_ES[month - 1],
      year,
      month,
      totalObligations: visibleObligations.length,
      paidCount,
      pendingCount,
      totalAmount,
      paidAmount,
      pendingAmount: totalAmount - paidAmount,
    };
  };

  const generateMonthSummaries = () => {
    const summaries = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const startYear = currentYear - 1;

    for (let year = startYear; year <= currentYear; year++) {
      const startMonth = year === startYear ? 1 : 1;
      const endMonth = year === currentYear ? currentMonth : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        const summary = getMonthSummary(year, month);
        if (summary.totalObligations > 0) {
          summaries.push(summary);
        }
      }
    }

    return summaries.reverse();
  };

  const summaries = generateMonthSummaries();
  console.log("[HISTORY] Generated summaries:", summaries.length, "months with data");

  const handleMonthClick = (summary) => {
    console.log("[HISTORY] Navigate to month:", summary.monthKey);
    onNavigateToMonth(summary.year, summary.month);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-800">Historial de Pagos</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {summaries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay datos de historial aún</p>
              <p className="text-sm text-gray-400 mt-1">
                Los meses con obligaciones aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {summaries.map((summary) => (
                <div
                  key={summary.monthKey}
                  onClick={() => handleMonthClick(summary)}
                  className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">
                      {summary.monthName} {summary.year}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {summary.totalObligations} obligación{supummary.totalObligations !== 1 ? 'es' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-emerald-600 font-semibold">{summary.paidCount}</p>
                      <p className="text-xs text-gray-500">Pagadas</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-amber-600 font-semibold">{summary.pendingCount}</p>
                      <p className="text-xs text-gray-500">Pendientes</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-[#2563eb] font-semibold">
                        ${summary.totalAmount.toLocaleString("es-CO")}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>
                      Pagado: <span className="text-emerald-600 font-medium">${summary.paidAmount.toLocaleString("es-CO")}</span>
                    </span>
                    <span>
                      Pendiente: <span className="text-amber-600 font-medium">${summary.pendingAmount.toLocaleString("es-CO")}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryView;