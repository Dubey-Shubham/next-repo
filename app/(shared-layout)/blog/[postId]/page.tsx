import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
    params: Promise<{
        postId: Id<"posts">
    }>
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postId } = await params
    const post = await fetchQuery(api.posts.getPostById, { postId: postId })

    if (!post) {
        return (
            <div>
                <h1>No Post Found</h1>
            </div>
        )
    }
    return (
        <div>
            <Link href="/blog">
                <ArrowLeft />
            </Link>
            <div className="relative overflow-hidden">
                <Image
                    src={post.imageUrl ?? "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div>
                    <h1>
                        {post.title}
                    </h1>

                    <p>
                        Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
                    </p>
                </div>
            </div>
        </div>
    )
}