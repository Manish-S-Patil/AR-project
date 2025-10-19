import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Loader2, Shield, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { toast } from '../components/ui/use-toast'
import API_CONFIG from '../lib/api'

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState('email') // 'email' -> 'code' -> 'password'
  const [verificationCode, setVerificationCode] = useState('')
  const [tempPassword, setTempPassword] = useState('')
  const [authToken, setAuthToken] = useState('')

  // Step 1: create account with a temporary password and send verification code
  const handleStartSignup = async (e) => {
    e.preventDefault()
    if (!username || !email) {
      toast({ title: 'Missing Information', description: 'Please enter username and email.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      // Use a temporary password that will be updated after user creation
      const tempPassword = 'TempPassword123'
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.register), {
        method: 'POST',
        headers: API_CONFIG.getDefaultHeaders(),
        body: JSON.stringify({ username, email, password: tempPassword, name: username })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      
      // Generate the Pass_UserID format password
      const userId = data.user?.id
      const passUserIdPassword = `Pass_${userId}`
      
      setTempPassword(passUserIdPassword)
      setAuthToken(data.token || '')
      toast({ title: 'Verification code sent', description: 'We emailed you a 6-digit code.' })
      setStep('code')
    } catch (e) {
      toast({ title: 'Could not start signup', description: e.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step 2: verify email code
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    if (!verificationCode || verificationCode.length < 4) {
      toast({ title: 'Enter Code', description: 'Please enter the verification code.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.verifyEmail), {
        method: 'POST',
        headers: API_CONFIG.getDefaultHeaders(),
        body: JSON.stringify({ email, code: verificationCode })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed')
      toast({ title: 'Email verified', description: 'Now set your password.' })
      setStep('password')
    } catch (e) {
      toast({ title: 'Verification failed', description: e.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step 3: set the real password by changing from the temporary one
  const handleSetPassword = async (e) => {
    e.preventDefault()
    if (!password || password.length < 6) {
      toast({ title: 'Weak password', description: 'Password must be at least 6 characters.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.changePassword), {
        method: 'POST',
        headers: {
          ...API_CONFIG.getDefaultHeaders(),
          ...(authToken ? API_CONFIG.getAuthHeaders(authToken) : {})
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword: tempPassword, newPassword: password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.message || 'Failed to set password')
      toast({ title: 'Account ready', description: 'Password set successfully. You can now sign in.' })
      navigate('/login')
    } catch (e) {
      toast({ title: 'Failed to set password', description: e.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 glow-effect"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold cyber-text mb-2"
          >
            AR CyberGuard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground"
          >
            Empowering Digital Citizens Through AR
          </motion.p>
        </div>
        <Card className="glass-effect cyber-border w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex items-center justify-center gap-2"><Users className="w-5 h-5" />Create Account</CardTitle>
          <CardDescription>Join the future of cybersecurity awareness</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' && (
            <form onSubmit={handleStartSignup} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" value={username} onChange={e=>setUsername(e.target.value)} className="glass-effect" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="glass-effect" /></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={isSubmitting}>
                {isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Sending...</span>) : 'Verify Email'}
              </Button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="code">Verification Code</Label><Input id="code" value={verificationCode} onChange={e=>setVerificationCode(e.target.value)} className="glass-effect" placeholder="Enter 6-digit code" /></div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" className="w-1/2" disabled={isSubmitting} onClick={async ()=>{
                  try{
                    setIsSubmitting(true)
                    const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.resendCode), { method: 'POST', headers: API_CONFIG.getDefaultHeaders(), body: JSON.stringify({ email }) })
                    const data = await res.json()
                    if(!res.ok) throw new Error(data.error || 'Unable to resend code')
                    toast({ title: 'Code resent', description: 'Check your inbox again.' })
                  }catch(e){
                    toast({ title: 'Resend failed', description: e.message, variant: 'destructive' })
                  }finally{
                    setIsSubmitting(false)
                  }
                }}>Resend Code</Button>
                <Button type="submit" className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={isSubmitting}>
                  {isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Verifying...</span>) : 'Verify'}
                </Button>
              </div>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handleSetPassword} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} className="glass-effect pr-10" />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={isSubmitting}>
                {isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Saving...</span>) : 'Set Password'}
            </Button>
          </form>
          )}
          <div className="mt-2 text-center text-sm">
            <span className="text-muted-foreground mr-1">Already have an account?</span>
            <Link to="/login" className="underline">Sign in</Link>
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


