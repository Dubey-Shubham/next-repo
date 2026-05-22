import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage")
  },                                                       // argument that we will get
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)  // to check whether user has logged in or not 

    if (!user) {
      throw new ConvexError("Not Authenticated")
    }
    const blogArticle = await ctx.db.insert("posts", {  // inserts args in db
      body: args.body,
      title: args.title,
      authorId: user._id,
      imageStorageId: args.imageStorageId
    })

    return blogArticle
  },
});

export const getPosts = query({        //to fetch data
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect()     // context database query from posts table in descending order 
    return posts
  }
})

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)  // to check whether user has logged in or not 

    if (!user) {
      throw new ConvexError("Not Authenticated")
    }

    return await ctx.storage.generateUploadUrl();         // this convex function that upon calling will return a link on which we will upload image

  }
})