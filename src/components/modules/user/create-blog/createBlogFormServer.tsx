import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { env } from '@/env'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_URL = env.API_URL

export default function CreateBlogFormServer() {
   const createBlog = async (fromData:FormData) =>{
    "use server";
    const title = fromData.get("title") as string;
    const content = fromData.get("content") as string;
    const tags = fromData.get("tags") as string

    const blogData = {
        title,
        content,
        tags: tags.split(",").map((item)=>item.trim()).filter((item)=>item !== "")
    }


    console.log(JSON.stringify(blogData));
    const cookieStore = await cookies()
    const res = await fetch(`${API_URL}/posts`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Cookie":cookieStore.toString()
        },
        body:JSON.stringify(blogData)
    })
    console.log(res);
    if (res.status) {
        redirect("/blogs?success")
    }
    // delete old cach and update new cach on every successful request
    if (res.ok) {
        revalidateTag("blogPost","max")
    }
    
   }
   
  return (
   
        <Card className='max-w-2xl mx-auto'>
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>You can create blog</CardDescription>
            </CardHeader>
            <CardContent>
                <form id='blog-form' action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input 
                            id='title'
                            name='title'
                            placeholder='Blog title'
                            type='text'/>
                        </Field>                        
                        <Field>
                            <FieldLabel>Content</FieldLabel>
                            <Textarea
                            id='content'
                            name='content'
                            placeholder='Write Your blog'
                            required
                            />

                        </Field>                        
                        <Field>
                            <FieldLabel>Tags</FieldLabel>
                            <Input 
                            id='tags'
                            name='tags' 
                            type='tags'
                            placeholder='Next JS, Web' />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button className='w-full' form='blog-form' type='submit' >Submit</Button>
            </CardFooter>
        </Card>
      
  )
}
