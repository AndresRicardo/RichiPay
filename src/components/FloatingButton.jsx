function FloatingButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#10b981] text-white
                 rounded-full shadow-lg flex items-center justify-center
                 text-3xl font-light hover:bg-emerald-600 active:scale-95
                 transition-all duration-150 cursor-pointer"
      aria-label="Agregar obligación"
    >
      +
    </button>
  )
}

export default FloatingButton