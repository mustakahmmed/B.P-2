
export interface BlogPost {
    id:string | number;
    title: string;
    content: string;
    thumbnail?: string | null;
    isFeatured:boolean;
    tags?: string[];
    views: number;
    _count?: {
    comments: number;
  };


}