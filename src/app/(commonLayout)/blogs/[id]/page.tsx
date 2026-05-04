import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';


export async function generateStaticParams(){
  const {data} = await blogService.getBlogPost()
  return data?.data?.map((post:BlogPost) => ({id:post.id})).splice(0,3)
 
}

export default async function BlogPosts({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data } = await blogService.getBlogById(id);


  // Fallback state if the blog post doesn't exist
  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* --- HEADER --- */}
      <header className="mb-10 text-center">
        
        {/* Featured Badge */}
        {data.isFeatured && (
          <span className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-800">
            ★ Featured Post
          </span>
        )}

        {/* Title */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight  sm:text-5xl">
          {data.title}
        </h1>

        {/* Meta Data (Views & Comments) */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            {/* Eye Icon SVG */}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{data.views.toLocaleString()} views</span>
          </div>

          {data._count && (
            <div className="flex items-center gap-1.5">
              {/* Comment Icon SVG */}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{data._count.comments.toLocaleString()} comments</span>
            </div>
          )}
        </div>
      </header>

      {/* --- THUMBNAIL --- */}
      {data.thumbnail && (
        <div className="mb-12 overflow-hidden rounded-2xl shadow-lg">
          {/* Note: In a real Next.js app, consider replacing this <img> with next/image <Image /> for optimization */}
          <img
            src={data.thumbnail}
            alt={`Thumbnail for ${data.title}`}
            className="h-auto max-h-[500px] w-full object-cover"
          />
        </div>
      )}

      {/* --- CONTENT --- */}
      {/* Using typography plugin classes (prose) for beautiful default text formatting */}
      <div 
        className="prose prose-lg prose-indigo mx-auto text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.content }} 
      />

      {/* --- FOOTER / TAGS --- */}
      {data.tags && data.tags.length > 0 && (
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Related Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag:string) => (
              <span
                key={tag}
                className="inline-flex cursor-pointer items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
      
    </article>
  );
}