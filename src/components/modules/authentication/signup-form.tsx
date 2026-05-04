"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const fromScema = z.object({
  name: z.string().min(4,"This fild is required"),
  email: z.email(),
  password: z.string().min(4,"minimum length is 8")
})


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });

    console.log(data);
  };

  const from = useForm({
    defaultValues:{
      name:"",
      email:"",
      password:""
    },
    validators:{
      onSubmit:fromScema
    },
    onSubmit: async({value})=>{
      const toastId = toast.loading("creating user")
      try {
        const { data, error } = await authClient.signUp.email(value)
        if (error) {
          toast.error(error.message,{id:toastId})
          return
        }
        toast.success("User created successfully", {id:toastId})
      } catch (error) {
        toast.error("Somthing went wrong",{id:toastId})
      }
    }
  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
        id="from-submit"
        onSubmit={(e)=>{
          e.preventDefault()
          from.handleSubmit()
        }}
        >
          <FieldGroup>
            <from.Field name="name" children={(field)=>{
              const isInvalid =field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <input 
                  className="border-2 pl-1 rounded-sm"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  ></input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}/>
          <from.Field name="email" children={(field)=>{
            const isInvalid =field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>email</FieldLabel>
                  <input 
                  className="border-2 pl-1 rounded-sm"
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  ></input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}/>
            <from.Field name="password" children={(field)=>{
              const isInvalid =field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>password</FieldLabel>
                  <input 
                  className="border-2 pl-1 rounded-sm"
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  ></input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}/>
          </FieldGroup>
          
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button form="from-submit" className="w-full">Signup</Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
