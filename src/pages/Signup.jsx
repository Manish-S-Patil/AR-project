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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.register), {
        method: 'POST', headers: API_CONFIG.getDefaultHeaders(),
        body: JSON.stringify({ username, email, password, name: username })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      toast({ title: 'Account Created!', description: 'Check your inbox for the verification code.' })
      navigate('/verify', { state: { email } })
    } catch (e) {
      toast({ title: 'Registration Failed', description: e.message, variant: 'destructive' })
    } finally { setIsSubmitting(false) }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" value={username} onChange={e=>setUsername(e.target.value)} className="glass-effect" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="glass-effect" /></div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} className="glass-effect pr-10" />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Creating...</span>) : 'Create Account'}
            </Button>
          </form>
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


