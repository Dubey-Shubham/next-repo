"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
    const data = useQuery(api.posts.getPosts)

    return (
        <div className="min-h-screen bg-background px-6 py-12">
            {/* Heading Section */}
            <div className="mx-auto mb-12 max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Our Blog
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Insights, thoughts and trends from our team
                </p>
            </div>

            {/* Blog Grid */}
            <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {data?.map((post) => (
                    <Card
                        key={post._id}
                        className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Blog Image"
                                width={600}
                                height={400}
                                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Optional overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Content */}
                        <CardContent className="space-y-4 p-6">
                            <Link href={`/blog/${post._id}`}>
                                <h2 className="line-clamp-2 cursor-pointer text-2xl font-semibold tracking-tight transition-colors hover:text-primary">
                                    {post.title}
                                </h2>
                            </Link>

                            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                {post.body}
                            </p>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="px-6 pb-6 pt-0">
                            <Link
                                href={`/blog/${post._id}`}
                                className={buttonVariants({
                                    className:
                                        "w-full rounded-xl font-medium shadow-sm transition-all duration-300 hover:shadow-lg",
                                })}
                            >
                                Read More
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}