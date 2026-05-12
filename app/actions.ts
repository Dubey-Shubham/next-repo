"use server"

import z from "zod"
import { postSchema } from "./schemas/blog"
import { fetchMutation } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { redirect } from "next/navigation"
import { getToken } from "@/lib/auth-server"

export default async function createBlogAction(values: z.infer<typeof postSchema>) {
    const parsed = postSchema.safeParse(values)      // validating data acc to schema

    if (!parsed.success) {
        throw new Error("something went wrong")
    }

    const token = await getToken()                 //getting token so we convex can authenticate this req

    await fetchMutation(api.posts.createPost, {    // using convex method to pass data  along with token to wuthenticate session
        body: parsed.data.content,
        title: parsed.data.title
    },
        { token }
    )

    return redirect("/")                           // this is used to redirect user on servers
}


//"use server" makes this a server action
// if we run this it will not show on browser console but rather on server terminal
// server actions creates an internal post request so use it for mutations only not for queries (can see that in networks)
