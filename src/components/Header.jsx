import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  console.log('[HEADER] User:', user?.email)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    console.log('[HEADER] Signing out')
    await signOut()
    setMenuOpen(false)
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'Usuario'
  }

  return (
    <header className="relative bg-gradient-to-r from-[#0a0a0f] via-[#12121a] to-[#0a0a0f] border-b border-[rgba(0,245,255,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,245,255,0.05)] via-transparent to-[rgba(180,0,255,0.05)] pointer-events-none" />
      <div className="relative max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="neon-text-cyan">Richi</span>
          <span className="text-white">Pay</span>
        </h1>

        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(0,245,255,0.3)] hover:border-[rgba(0,245,255,0.6)] hover:bg-[rgba(0,245,255,0.1)] transition-all duration-300"
            >
              <span className="text-sm font-medium hidden sm:inline text-[var(--text-secondary)]">
                {getUserDisplayName()}
              </span>
              <svg
                className={`w-5 h-5 text-[var(--neon-cyan)] transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 glass-card animate-fade-in-up z-50">
                <div className="px-4 py-4 border-b border-[rgba(0,245,255,0.15)]">
                  <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-1">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.05)] transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header