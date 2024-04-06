'use client'
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const LogInButton = () => {
  const router = useRouter()

  const handleLogin = async () => {
    const res = await signIn('credentials', {redirect: false})

    if (res.ok) {
      router.replace('/')
      router.refresh()
    }
  }

  return (
    <Button onClick={handleLogin}>Sign In</Button>
  );
};

export default LogInButton;