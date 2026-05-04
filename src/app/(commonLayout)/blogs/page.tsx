import BlogCard from "@/components/modules/homePage/blogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";

import { cookies } from "next/headers";



export default async function Home() {

  const {data} = await blogService.getBlogPost({
    isFeatured:false,
    
  },
{
  cash:"no-store"
})
  console.log(data);
  
  return (
    <div className="grid grid-cols-3 mx-auto gap-6 max-w-7xl mt-7">
      {
        data?.data?.map((post:BlogPost)=><BlogCard key={post.id} post ={post}></BlogCard>)
      }
    </div>
  );
}
