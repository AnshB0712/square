import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loading } from '../../layout/loading.jsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogin } from '../../../hooks/mutation/useLogin.jsx'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import refreshAccessToken from '../../../api/refreshAccessToken.js'
import { useAuthCtx } from '../../../context/authContext.jsx'
import { toast } from 'sonner'

const FormFieldRender = ({ role, form }) => {
  let content

  switch (role) {
    case 'teacher':
      content = (
        <>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="uniqueField"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email/Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="lg"
                        name="uniqueField"
                        type="text"
                        className={`${
                          form?.formState?.errors?.['uniqueField']
                            ? 'border-red-600 text-red-600'
                            : ''
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="lg"
                        type="password"
                        className={`${
                          form?.formState?.errors?.['password']
                            ? 'border-red-600 text-red-600'
                            : ''
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>
        </>
      )
      break
    case 'admin':
      content = (
        <>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="phone"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="lg"
                        type="text"
                        className={`${
                          form?.formState?.errors?.['phone']
                            ? 'border-red-600 text-red-600'
                            : ''
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="space-y-1">
            <FormField
              control={form.control}
              rules={{ required: true }}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="lg"
                        type="password"
                        className={`${
                          form?.formState?.errors?.['password']
                            ? 'border-red-600 text-red-600'
                            : ''
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>
        </>
      )
      break
    case 'student':
      content = (
        <>
          <div className="space-y-1">
            <FormField
              control={form.control}
              rules={{ required: true }}
              name="roll"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Roll No.</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="lg"
                        type="number"
                        className={`${
                          form?.formState?.errors?.['roll']
                            ? 'border-red-600 text-red-600'
                            : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-[0.8rem] text-muted-foreground">
                      Enter the unique roll that class have provided to you.
                    </FormMessage>
                  </FormItem>
                )
              }}
            />
          </div>
        </>
      )
      break
    default:
      content = ''
  }

  return content
}

export function LoginForm() {
  const [role, setRole] = useState('')

  const form = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'
  const login = useLogin(`auth/login/${role}`)

  const { setUser } = useAuthCtx()

  const handleLogin = async (details) => {
    login.mutate(
      {
        details,
      },
      {
        onError: (e) =>
          form.setError('formError', {
            type: 'custom',
            message: e.response.data.message,
          }),
        onSuccess: () => {
          navigate(from)
        },
      }
    )
  }

  // IF TOKEN EXISTS USER ROUTE TO DASHBOARD DIRECTLY
  useEffect(() => {
    const isSessionExists = async () => {
      try {
        const user = refreshAccessToken({ fullInfo: true })
        toast.promise(user, {
          loading: 'Session Found, logging you in.',
          success: (data) => {
            setUser(data)
            navigate('/dashboard')
            return 'Login Successful.'
          },
          error: 'Oops! Login again.',
        })
      } catch (error) {
        console.error(error)
      }
    }

    isSessionExists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    form.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your detials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Who are you?</Label>
            <Select onValueChange={(e) => setRole(e)}>
              <SelectTrigger className="w-full" size="lg">
                <SelectValue placeholder="Select you Role" value={role} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                form.clearErrors()
                form.handleSubmit(handleLogin)(e)
              }}
            >
              <FormFieldRender role={role} form={form} />

              {form.formState.errors['formError'] && (
                <p className="text-[0.8rem] font-medium italic text-red-600 text-center">
                  Error: {form.formState.errors['formError'].message}
                </p>
              )}

              <Button
                disabled={!role || login.isPending}
                className="w-full my-2"
                size="lg"
                type="submit"
              >
                {login.isPending ? <Loading /> : 'Login'}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}
