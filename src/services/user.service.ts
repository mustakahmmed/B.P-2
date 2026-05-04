
import { env } from "@/env";
import { cookies } from "next/headers"
const AUTH_URL = env.AUTH_URL

export const userService ={
    getSeesion: async function () {
        try {
            const cookieStore = await cookies()
        const res = await fetch(`${AUTH_URL}/get-session`,{
            headers:{
                Cookie: cookieStore.toString()
            }
        })
        const seesion =await res.json()
        console.log(seesion);
        if (seesion.data === null) {
            return {data:null,error:{message:"Session is missing"}}
        }
        
        return {data:seesion,err:null}
        } catch (error) {
            console.log(error);
            return {data:null,error:{message:"somthing went wrong"}}
            
        }
    }
}
