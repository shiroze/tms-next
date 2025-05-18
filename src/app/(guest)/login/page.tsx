"use client"

import { useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from '@mui/material';
import { Card, CardContent, CardHeader } from '~/components/ui/card'
// import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Mail, Lock } from '@mui/icons-material';
 
export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"; // Default to /dashboard if no callbackUrl

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const result: any = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl
    });

    if (result.error) {
      alert(result.error);
    } else {
      router.push(callbackUrl);
    }
  };

  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
    
  //   try {
  //     const result = await signIn('credentials', {
  //       email,
  //       password,
  //       redirect: false,
  //     })

  //     if (result?.error) {
  //       toast({
  //         title: "Error",
  //         description: "Invalid credentials",
  //         variant: "destructive"
  //       })
  //     } else {
  //       router.push('/dashboard')
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "An error occurred",
  //       variant: "destructive"
  //     })
  //   }
  // }

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Username
    //     <input name="username" type="text" defaultValue={process.env.NODE_ENV == "development" ? 'admin' : '' } />
    //   </label>
    //   <label>
    //     Password
    //     <input name="password" type="password" defaultValue={process.env.NODE_ENV == "development" ? 'Complete.Pwd123' : '' } />
    //   </label>
    //   <button type="submit">Sign In</button>
    // </form>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl text-center">Welcome Back</CardTitle> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}