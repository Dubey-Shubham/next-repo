import { query } from "./_generated/server";

export const get = query({      // created a query here
  args: {},                     // here we can pass argument
  handler: async (ctx) => {     // in handler callback we have context (ctx)
    return await ctx.db.query("tasks").collect();   // we make query in tasks table in DB to collect data
  },
});