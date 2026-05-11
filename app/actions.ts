"use server"

export default function createBlogAction() {  
    console.log("hello from the server")
}

//"use server" makes this a server action
// if we run this it will not show on browser console but rather on server terminal
// server actions creates an internal post request so use it for mutations only not for queries (can see that in networks)
