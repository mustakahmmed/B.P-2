import CreatBlogFromClient from "@/components/modules/user/create-blog/creatBlogFromClient";
import CreateBlogFormServer from "@/components/modules/user/create-blog/createBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";


export default async function CreateBlogPage() {
  const {data} = await blogService.getBlogPost()
  return (
    <div className="w-full">
      {/* <CreateBlogFormServer></CreateBlogFormServer> */}
      {/* {
        data.data.map((item:BlogPost) => <p key={item.id}>{item.title}</p>)
      } */}
      <CreatBlogFromClient></CreatBlogFromClient>
    </div>
  )
}
