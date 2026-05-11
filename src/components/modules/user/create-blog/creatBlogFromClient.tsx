"use client"
import { createBlogPost } from "@/action/blog.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { toast } from "sonner";
import * as z from "zod";

const formScema = z.object({
    title: z.string(),
    content: z.string(),
    tags: z.string()
})

export default function CreatBlogFromClient({...props}: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues:{
            title:"",
            content:"",
            tags: ""
        },
        validators:{
            onSubmit:formScema
        },
        onSubmit: async({value}) => {
            const tostId = toast.loading("creating...")
            const formData = {
                ...value,
                tags:value.tags.split(",").map((item)=>item.trim()).filter((item)=>{item !== ""})
            }
            try {
                const res = await createBlogPost(formData)
                console.log(res);
                
                toast.success("post created",{id:tostId})
            } catch (error) {
                toast.error("Somthing went Wrong",{id:tostId})
            }
       
            
        }
    })
  return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Create a post</CardTitle>
        </CardHeader>
        <CardContent>
            <form 
            id="blog-Form"
            onSubmit={(e)=>{
                e.preventDefault()
                form.handleSubmit()
            }}
            >
                <FieldGroup>
                    <form.Field
                    name="title"
                    children={(field)=>{
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return(
                            <Field>
                                <FieldLabel htmlFor={field.name}>Blog Title</FieldLabel>
                                <input 
                                type="text"
                                className="border-2 pl-1 rounded-sm py-0.5"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e)=>{field.handleChange(e.target.value)}}
                                ></input>
                                 {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                    />
                    <form.Field
                    name="content"
                    children={(field)=>{
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return(
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e)=>{field.handleChange(e.target.value)}}
                                ></Textarea>
                                 {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                    />
                    <form.Field
                    name="tags"
                    children={(field)=>{
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field>
                                <FieldLabel>Tags</FieldLabel>
                                <input
                                type="text"
                                className="border-2 pl-1 rounded-sm py-0.5"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e)=>field.handleChange(e.target.value)}
                                ></input>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                    />

                </FieldGroup>
                <CardFooter>
                    <Button form="blog-Form" className="w-full">Submit</Button>
                </CardFooter>
            </form>
        </CardContent>
    </Card>
  )
}
