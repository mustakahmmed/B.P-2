import { Button } from "@/components/ui/button";
import { useServices } from "@/services/user.service";




export default async function Home() {
const {data} = await useServices.getSession()
console.log(data);

 

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button >click me</Button>
    </div>
  );
}
