import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Loader2, Shield, Phone } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { toast } from '../components/ui/use-toast'
import API_CONFIG from '../lib/api'

export default function Verify() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState(location.state?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || '')
  const [verificationId, setVerificationId] = useState(location.state?.verificationId || '')
  const [mode, setMode] = useState(location.state?.mode || (email ? 'email' : 'phone'))
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const verify = async () => {
    if (mode === 'phone') {
      if (!phoneNumber || !code || !verificationId) { toast({ title: 'Missing data', description: 'Enter phone, code, and ensure verification ID is present.', variant: 'destructive' }); return }
      try {
        setIsSubmitting(true)
        const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.verifyPhone), {
          method: 'POST', headers: API_CONFIG.getDefaultHeaders(), body: JSON.stringify({ phoneNumber, code, verificationId })
        })
        const data = await res.json()
        console.group('API Verify Phone Response')
        console.log('Status:', res.status, res.statusText)
        console.log('URL:', API_CONFIG.getUrl(API_CONFIG.endpoints.auth.verifyPhone))
        console.log('Body:', { phoneNumber, code, verificationId })
        console.log('Response:', data)
        console.groupEnd()
        if (!res.ok) throw new Error(data.error || 'Verification failed')
        toast({ title: 'Verified', description: 'Your phone number has been verified.' })
        navigate('/login')
      } catch (e) {
        toast({ title: 'Verification Failed', description: e.message, variant: 'destructive' })
      } finally { setIsSubmitting(false) }
    } else {
      if (!email || !code) { toast({ title: 'Missing code', description: 'Enter email and code.', variant: 'destructive' }); return }
      try {
        setIsSubmitting(true)
        const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.verifyEmail), {
          method: 'POST', headers: API_CONFIG.getDefaultHeaders(), body: JSON.stringify({ email, code })
        })
        const data = await res.json()
        console.group('API Verify Email Response')
        console.log('Status:', res.status, res.statusText)
        console.log('URL:', API_CONFIG.getUrl(API_CONFIG.endpoints.auth.verifyEmail))
        console.log('Body:', { email })
        console.log('Response:', data)
        console.groupEnd()
        if (!res.ok) throw new Error(data.error || 'Verification failed')
        toast({ title: 'Verified', description: 'Your email has been verified.' })
        navigate('/login')
      } catch (e) {
        toast({ title: 'Verification Failed', description: e.message, variant: 'destructive' })
      } finally { setIsSubmitting(false) }
    }
  }

  const resend = async () => {
    try {
      setIsSubmitting(true)
      if (mode === 'phone') {
        if (!phoneNumber) { toast({ title: 'Missing phone', description: 'Enter your phone first.', variant: 'destructive' }); return }
        const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.resendPhoneCode), {
          method: 'POST', headers: API_CONFIG.getDefaultHeaders(), body: JSON.stringify({ phoneNumber })
        })
        const data = await res.json()
        console.group('API Resend Phone Code Response')
        console.log('Status:', res.status, res.statusText)
        console.log('URL:', API_CONFIG.getUrl(API_CONFIG.endpoints.auth.resendPhoneCode))
        console.log('Body:', { phoneNumber })
        console.log('Response:', data)
        console.groupEnd()
        if (!res.ok) throw new Error(data.error || 'Failed to resend code')
        toast({ title: 'Code Sent', description: 'A new verification code has been sent via SMS.' })
      } else {
        if (!email) { toast({ title: 'Missing email', description: 'Enter your email first.', variant: 'destructive' }); return }
        const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.resendCode), {
          method: 'POST', headers: API_CONFIG.getDefaultHeaders(), body: JSON.stringify({ email })
        })
        const data = await res.json()
        console.group('API Resend Email Code Response')
        console.log('Status:', res.status, res.statusText)
        console.log('URL:', API_CONFIG.getUrl(API_CONFIG.endpoints.auth.resendCode))
        console.log('Body:', { email })
        console.log('Response:', data)
        console.groupEnd()
        if (!res.ok) throw new Error(data.error || 'Failed to resend code')
        toast({ title: 'Code Sent', description: 'A new verification code has been sent.' })
      }
    } catch (e) {
      toast({ title: 'Resend Failed', description: e.message, variant: 'destructive' })
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
          <CardTitle className="text-xl">{mode==='phone' ? 'Verify Phone' : 'Verify Email'}</CardTitle>
          <CardDescription>We sent a 6-digit verification code. Enter it below to verify your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mode==='phone' ? (
              <>
                <div className="space-y-2"><Label htmlFor="phone"><Phone className="inline w-4 h-4 mr-1"/>Phone</Label><Input id="phone" type="tel" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} className="glass-effect" /></div>
                <div className="space-y-2"><Label htmlFor="code"><Phone className="inline w-4 h-4 mr-1"/>Verification Code</Label><Input id="code" value={code} onChange={e=>setCode(e.target.value)} className="glass-effect" /></div>
                <div className="flex gap-2">
                  <Button onClick={verify} disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">{isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/>Verifying...</span>):'Verify Phone'}</Button>
                  <Button onClick={resend} variant="outline" disabled={isSubmitting} className="w-full glass-effect">Resend Code</Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2"><Label htmlFor="email"><Mail className="inline w-4 h-4 mr-1"/>Email</Label><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="glass-effect" /></div>
                <div className="space-y-2"><Label htmlFor="code"><Mail className="inline w-4 h-4 mr-1"/>Verification Code</Label><Input id="code" value={code} onChange={e=>setCode(e.target.value)} className="glass-effect" /></div>
                <div className="flex gap-2">
                  <Button onClick={verify} disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">{isSubmitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/>Verifying...</span>):'Verify Email'}</Button>
                  <Button onClick={resend} variant="outline" disabled={isSubmitting} className="w-full glass-effect">Resend Code</Button>
                </div>
              </>
            )}
            <div className="text-center text-sm"><Link to="/login" className="underline">Back to login</Link></div>
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


