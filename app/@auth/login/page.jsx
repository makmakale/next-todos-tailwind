'use client'
import {Button} from "@/components/ui/button"
import CardWrapper from "@/components/Auth/CardWrapper";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {useState, useTransition} from "react";
import {LoginSchema} from "@/lib/form/validation";
import Form from "@/components/Formik/Form";
import FormMessage from "@/components/ui/form-message";
import FormField from "@/components/Formik/FormField";

const initialValues = {
  username: '',
  password: ''
}

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = (values, {setSubmitting}) => {
    setError('')

    startTransition(async () => {
      const res = await signIn('credentials', {
        ...values,
        redirect: false
      })
      setSubmitting(false)

      if (res.ok) {
        router.push('/board')
        router.refresh()
      } else {
        if (res.error === 'CredentialsSignin') {
          setError('Incorrect username or password ')
        } else {
          setError(res.error)
        }
      }
    })
  }

  return (
    <div className="h-full flex justify-center items-center">
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
      >
        <Form
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >

          <FormMessage variant="primary" message={(
            <div>
              <div>Default users:</div>
              <div>
                <p>Username: admin | user</p>
                <p>Password: admin | user</p>
              </div>
            </div>
          )}/>
          <FormMessage variant={'error'} message={error}/>

          <FormField
            name="username"
            label="Username"
            placeholder="Username"
            disabled={isPending}
            required
          />

          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            disabled={isPending}
            required
          />

          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            Login
          </Button>
        </Form>
      </CardWrapper>
    </div>
  );
}