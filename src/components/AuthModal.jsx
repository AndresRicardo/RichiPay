import { useAuth } from '../contexts/AuthContext'
import supabase from '../lib/supabase'

function AuthModal() {
  const { loading, error } = useAuth()

  console.log('[AUTH_MODAL] Rendering, loading:', loading)

  const handleGoogleSignIn = async () => {
    console.log('[AUTH_MODAL] Google sign in clicked')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) {
      console.error('[AUTH_MODAL] OAuth error:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.1)] via-transparent to-[rgba(180,0,255,0.1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,245,255,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(180,0,255,0.1),transparent_50%)]" />

      <div className="relative glass-card w-full max-w-md shadow-[0_0_60px_rgba(0,245,255,0.2)] overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.05)] to-[rgba(180,0,255,0.05)] pointer-events-none" />

        <div className="relative p-10 text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-wider mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="neon-text-cyan">Richi</span>
              <span className="text-white">Pay</span>
            </h1>
            <p className="text-[var(--text-muted)] mt-4">
              Inicia sesión para gestionar tus obligaciones
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[rgba(255,51,102,0.1)] border border-[rgba(255,51,102,0.3)] rounded-lg">
              <p className="text-sm text-[var(--neon-red)]">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(0,245,255,0.3)] rounded-xl hover:bg-[rgba(0,245,255,0.1)] hover:border-[var(--neon-cyan)] hover:shadow-[0_0_25px_rgba(0,245,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="text-[var(--text-muted)]">Cargando...</span>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-white tracking-wider group-hover:text-[var(--neon-cyan)] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  CONTINUAR CON GOOGLE
                </span>
              </>
            )}
          </button>

          <p className="mt-8 text-xs text-[var(--text-muted)]">
            Al continuar, aceptas nuestros términos y condiciones.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal