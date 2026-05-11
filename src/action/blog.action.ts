"use server"

import { blogService } from "@/services/blog.service"
import { FormData } from "@/types"
import { updateTag } from "next/cache"

export const createBlogPost = async(data:FormData) => {
    const res = await blogService.creatBlogPost(data)
    updateTag("blogPost")
    return res
}