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
    <header className="bg-[#1e3a5f] text-white px-4 py-4 shadow-lg">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">RichiPay</h1>

        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-sm font-medium hidden sm:inline">
                {getUserDisplayName()}
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
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