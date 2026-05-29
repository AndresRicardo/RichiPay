import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('[AUTH] Initializing, user:', user)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AUTH] Session check:', session ? 'logged in' : 'not logged in')
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AUTH] Auth state change:', _event, session?.user?.email)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    console.log('[AUTH] Signing up:', email)
    setError(null)
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      console.log('[AUTH] Sign up successful:', data.user?.email)
      return { success: true, data }
    } catch (err) {
      console.error('[AUTH] Sign up error:', err.message)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    console.log('[AUTH] Signing in:', email)
    setError(null)
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      console.log('[AUTH] Sign in successful:', data.user?.email)
      return { success: true, data }
    } catch (err) {
      console.error('[AUTH] Sign in error:', err.message)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    console.log('[AUTH] Signing out')
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('[AUTH] Sign out successful')
      return { success: true }
    } catch (err) {
      console.error('[AUTH] Sign out error:', err.message)
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}