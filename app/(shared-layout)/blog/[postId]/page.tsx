import { CommentSection } from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
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

    const [post, preloadedComments] = await Promise.all([                // so fire both api in parallel instead of in series
        await fetchQuery(api.posts.getPostById, {
            postId: postId
        }),
        await preloadQuery(api.comments.getCommentByPostId, {
            postId: postId
        })
    ])

    if (!post) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-700">
                    No Post Found
                </h1>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-black"
            >
                <ArrowLeft className="size-4" />
                Back to Blogs
            </Link>

            <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="relative h-[320px] w-full overflow-hidden">
                    <Image
                        src={
                            post.imageUrl ??
                            "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                        }
                        alt={post.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <div className="space-y-5 p-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            {post.title}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Posted on{" "}
                            {new Date(post._creationTime).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>
            </article>

            <div className="mt-10">
                <CommentSection preloadedComments={preloadedComments} />
            </div>
        </div>
    )
}