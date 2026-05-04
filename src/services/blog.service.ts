import { env } from "@/env"



const API_URL = env.API_URL
interface ServiuceOptions {
cash?:RequestCache;
revalidate?:number
}
interface GetBlogParams {
    isFeatured?: boolean;
    search?: string
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
}
}