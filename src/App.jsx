import { useState } from 'react'
import Header from './components/Header'
import MonthlyList from './components/MonthlyList'
import FloatingButton from './components/FloatingButton'
import ObligationModal from './components/ObligationModal'
import useObligationsStore from './store/useObligationsStore'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingObligation, setEditingObligation] = useState(null)

  const addObligation = useObligationsStore((state) => state.addObligation)
  const editObligation = useObligationsStore((state) => state.editObligation)
  const removeObligation = useObligationsStore((state) => state.removeObligation)

  const handleOpenCreate = () => {
    setEditingObligation(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (obligation) => {
    setEditingObligation(obligation)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingObligation(null)
  }

  const handleSave = (name, amount, dueDay) => {
    if (editingObligation) {
      editObligation(editingObligation.id, name, amount, dueDay)
    } else {
      addObligation(name, amount, dueDay)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta obligación?')) {
      removeObligation(id)
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <MonthlyList onEdit={handleOpenEdit} onDelete={handleDelete} />
      </main>
      <FloatingButton onClick={handleOpenCreate} />
      <ObligationModal
        isOpen={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editingObligation}
      />
    </>
  )
}

export default App
