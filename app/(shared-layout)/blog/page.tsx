"use client"

import { Card } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"

export default function BlogPage() {
    const data = useQuery(api.posts.getPosts)
    return (
        <div>
            <div>
                <h1>Our Blog</h1>
                <p>Insights, thoughts and trends from our team</p>
            </div>

            <div>
                {
                    data?.map((post) => (
                        <Card key={post._id}>
                            <div>
                                <Image src="https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Image"
                                    width={300}
                                    height={50}
                                />
                            </div>
                        </Card>
                    ))
                }
            </div>

        </div>
    )
}