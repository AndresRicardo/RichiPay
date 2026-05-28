import Header from './components/Header'
import MonthlyList from './components/MonthlyList'
import FloatingButton from './components/FloatingButton'

function App() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <MonthlyList />
      </main>
      <FloatingButton />
    </>
  )
}

export default App