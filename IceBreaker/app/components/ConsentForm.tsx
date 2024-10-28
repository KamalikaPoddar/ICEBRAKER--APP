'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ConsentForm() {
  const router = useRouter()
  const [mobileNumber] = useState("8056277749")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSendOTP = async () => {
    // In a real application, you would send an OTP to the mobile number
    console.log("Sending OTP to:", mobileNumber)
    setOtpSent(true)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would verify the OTP with your backend
    console.log("Verifying OTP:", otp)
    if (otp === "123456") { // Dummy verification
      setVerificationStatus("success")
      setTimeout(() => router.push('/financial-accounts'), 2000)
    } else {
      setVerificationStatus("error")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Consent Verification</CardTitle>
        <CardDescription>Please verify your mobile number to proceed.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input id="mobileNumber" value={mobileNumber} disabled />
          </div>
          {!otpSent ? (
            <Button onClick={handleSendOTP} className="w-full">Send OTP</Button>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Verify OTP</Button>
            </form>
          )}
          {verificationStatus === "success" && (
            <p className="text-green-600 text-center">OTP verified successfully!</p>
          )}
          {verificationStatus === "error" && (
            <p className="text-red-600 text-center">OTP verification failed. Please try again.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By verifying  your mobile number, you consent to receive important notifications.
        </p>
      </CardFooter>
    </Card>
  )
}