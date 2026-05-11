import { env } from "@/env"
import { cookies } from "next/headers";
import { URL } from "url";
import { string } from "zod";



const API_URL = env.API_URL
interface ServiuceOptions {
cash?:RequestCache;
revalidate?:number
}
interface GetBlogParams {
    isFeatured?: boolean;
    search?: string
}
interface formData  {
    title:string;
    content:string;
    tags?: string[]
}
export const blogService = {
    getBlogPost : async function (params?:GetBlogParams, options?:ServiuceOptions) {
        try {

        const url = new URL(`${API_URL}/posts`)
        
        if (params) {
            Object.entries(params).forEach(([key, value])=>{
                if (value !== undefined && value !== null && value !== "") {
                    url.searchParams.append(key,value)
                }
            })
        }
        
        const config:RequestInit = {}

        if (options?.cash) {
            config.cache = options.cash
        }
        if (options?.revalidate) {
            config.next = {revalidate:options.revalidate}
        }
        config.next = {...config.next,tags:["blogPost"]}

        const res = await fetch(url.toString(),config)
        const data = await res.json()
        
        

        return {data:data, error:null}
        } catch (error) {
            return {data:null, error:{message:error}}
        }
    },

    getBlogById : async function (id: string){
        try {
             const res = await fetch(`${API_URL}/posts/${id}`)
            const data = await res.json()

            return {data:data,error:null}
        } catch (error) {
            return {data:null,error:{meesage:"Samthing went wrong"}
        }
    }
    },

    creatBlogPost: async (formData:formData) =>{
        try {
            const cookeStor = await cookies()
            const url = new URL(`${API_URL}/posts`)
            const res = await fetch(url.toString(),{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    cookie: cookeStor.toString()
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
           
            if (data.error) {
                return {data:null,error:{message:data.error || "post not created"}}
            }
            return{data:data,error:null}
        } catch (error) {
            return {data:null,error:{message:"Somthing Went Wrong"}}
        }
    }
}