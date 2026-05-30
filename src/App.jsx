import { useState, useEffect } from 'react'
import Header from './components/Header'
import MonthNavigator from './components/MonthNavigator'
import MonthlyList from './components/MonthlyList'
import FloatingButton from './components/FloatingButton'
import ObligationModal from './components/ObligationModal'
import HistoryView from './components/HistoryView'
import AuthModal from './components/AuthModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import useObligationsStore from './store/useObligationsStore'

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingObligation, setEditingObligation] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [historyOpen, setHistoryOpen] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState({ open: false, obligation: null })

  const fetchData = useObligationsStore((state) => state.fetchData)
  const clearData = useObligationsStore((state) => state.clearData)
  const initialized = useObligationsStore((state) => state.initialized)

  useEffect(() => {
    console.log('[APP] User changed:', user?.email, 'authenticated:', isAuthenticated)
    if (user) {
      fetchData(user.id)
    } else {
      clearData()
    }
  }, [user, isAuthenticated])

  const addObligation = useObligationsStore((state) => state.addObligation)
  const editObligation = useObligationsStore((state) => state.editObligation)
  const removeObligation = useObligationsStore((state) => state.removeObligation)
  const hideObligationForMonth = useObligationsStore((state) => state.hideObligationForMonth)
  const deleteFromMonth = useObligationsStore((state) => state.deleteFromMonth)
  const togglePayment = useObligationsStore((state) => state.togglePayment)

  const handlePrevMonth = () => {
    console.log('[APP] Prev month')
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    console.log('[APP] Next month')
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const handleTogglePayment = (obligationId, monthKey) => {
    console.log('[APP] Toggle payment:', { obligationId, monthKey })
    togglePayment(obligationId, monthKey)
  }

  const handleOpenCreate = () => {
    console.log('[APP] Open create modal')
    setEditingObligation(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (obligation) => {
    console.log('[APP] Open edit modal:', obligation)
    setEditingObligation(obligation)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingObligation(null)
  }

  const handleSave = (name, amount, dueDay, type, startMonth, applicableMonths) => {
    console.log('[APP] Save obligation:', { name, amount, dueDay, type, startMonth, applicableMonths, isEdit: Boolean(editingObligation), editingId: editingObligation?.id })
    if (editingObligation) {
      editObligation(editingObligation.id, name, amount, dueDay, type, startMonth, applicableMonths)
    } else {
      addObligation(name, amount, dueDay, type, startMonth, applicableMonths)
    }
  }

  const handleDeleteClick = (obligation) => {
    console.log('[APP] Open delete modal for:', obligation.name)
    setDeleteModalData({ open: true, obligation })
  }

  const handleDeleteCompletely = async (id) => {
    console.log('[APP] Delete completely:', id)
    await removeObligation(id)
  }

  const handleHideThisMonth = async (id, monthKey) => {
    console.log('[APP] Hide this month:', id, monthKey)
    await hideObligationForMonth(id, monthKey)
  }

  const handleDeleteFromMonth = async (id, fromDate) => {
    console.log('[APP] Delete from month:', id, fromDate)
    await deleteFromMonth(id, fromDate)
  }

  const handleCloseDeleteModal = () => {
    console.log('[APP] Close delete modal')
    setDeleteModalData({ open: false, obligation: null })
  }

  const handleOpenHistory = () => {
    console.log('[APP] Open history')
    setHistoryOpen(true)
  }

  const handleCloseHistory = () => {
    console.log('[APP] Close history')
    setHistoryOpen(false)
  }

  const handleNavigateToMonth = (year, month) => {
    console.log('[APP] Navigate to month:', year, month)
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleGoToToday = (date = new Date()) => {
    console.log('[APP] Go to today')
    setCurrentDate(date)
  }

  if (!isAuthenticated) {
    return <AuthModal />
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <MonthNavigator
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onOpenHistory={handleOpenHistory}
          onGoToToday={handleGoToToday}
        />
        <MonthlyList
          currentDate={currentDate}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteClick}
          onTogglePayment={handleTogglePayment}
        />
      </main>
      <FloatingButton onClick={handleOpenCreate} />
      <ObligationModal
        isOpen={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editingObligation}
      />
      <HistoryView
        isOpen={historyOpen}
        onClose={handleCloseHistory}
        onNavigateToMonth={handleNavigateToMonth}
      />
      <DeleteConfirmModal
        isOpen={deleteModalData.open}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteCompletely}
        onDeleteFromMonth={handleDeleteFromMonth}
        onHideThisMonth={handleHideThisMonth}
        obligation={deleteModalData.obligation}
        currentDate={currentDate}
      />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App