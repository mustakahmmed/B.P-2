
import { env } from "@/env";
import { cookies } from "next/headers"
const AUTH_URL = env.AUTH_URL

export const useServices = {
    getSession:async function (){
        try {
            const cookieStore = await cookies()
            console.log(cookieStore);

            const res = await fetch(`${AUTH_URL}/get-session`,{
                headers:{
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            })

            const session = await res.json()
            return {data: session,error:null}
            
        } catch (error) {
            console.error(error);
            return {data:null, error:{message:"somthing went wrong"}}
            
        }

    }
}

