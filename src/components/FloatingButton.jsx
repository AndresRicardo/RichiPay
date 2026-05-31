function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[var(--neon-green)] text-[#0a0a0f]
                 rounded-full shadow-[0_0_30px_rgba(0,255,136,0.4)] flex items-center justify-center
                 text-3xl font-bold hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] hover:scale-105
                 active:scale-95 transition-all duration-300 cursor-pointer"
      style={{ fontFamily: 'Rajdhani, sans-serif' }}
      aria-label="Agregar obligación"
    >
      +
    </button>
  )
}

export default FloatingButton