# SetUp

- Installing PNPN ( npm install -g pnpm )
- ( pnpm -v ) to check version
- ( pnpm create next-app@latest ) to initializw repo
- ( pnpm run dev ) to start server

# pnpm path might cause issue even after installation

- npm root -g
- npm list -g --depth=0                             (to find whether installation happened properly or not)
- npm config get prefix                             (it will give global path without space)
- add it to system variable or enviroment variables (win + s -> patgh -> edit -> add -> ok)
- now cloase everything and restart

# Exporing file based routed with nested routs dynamic route etc

- made dummy abc, blog folder to explore that

# Setting up shadcn 

- pnpm dlx shadcn@latest init -t next
- select radix, preset Nova
- install whatever component u want (like pnpm dlx shadcn@latest add button)

# Creating component folder 

- here we have 2 nested folder ui for shadcn component and web for custom component

# Setting up theme (dark/light mode)

- install theme (pnpm add next-themes)
- install dropdown (pnpm dlx shadcn@latest add dropdown-menu)
- create theme-provider file in ui folder and paste code
- create theme-toggle file in web -> paste code -> then rename component to ThemeToggle
- add <Theme-toggle/> in navbar and wrap main layout file children with <ThemeProvider/> that copied

# Creating signUP

- create auth/sign-up/page.tsx
- install shadcn components like card, input, field
- install (zod) for typescript schema creation, (react hook form) for creating forms and (hookform/resolvers) to provide ts schema to hook form (pnpm i react-hook-form), (pnpm i zod), p(npm i @hookform/resolvers)
- Creating an Sign Up page using Shadcn component which we installed
- put "use client" above the sign in component as this is client component not server component

# Removing navbar from signup page (Route Group)

* Route Groups are a folder convention that let you organize routes by category or team.
* A route group can be created by wrapping a folder's name in parenthesis: (folderName).
* This convention indicates the folder is for organizational purposes and should not be included in the route's URL path.
* basically a folder name automatically becomes a route we avoid this by using ROUTE GROUP
- create a folder (shared-layout) in app
- move page.tsx from app to this folder
- create layout.tsx file and move navbar and children here
- now all pages with navbar will be called here while other like signup outside in sperate folder like auth

# Will use Convex as Backend service here

- Convex is the open source, reactive database where queries are TypeScript code running right in the database. Just like React components react to state changes, Convex queries react to database changes.
- Convex provides a database, a place to write your server functions, and client libraries. It makes it easy to build and scale dynamic live-updating apps.

## Steps
- 0 Go to Documentation of Convex
- 1 (pnpm install convex) to install the convex in project
- 2 (pnpm dlx convex dev) To initiate a convex project where we will write our backend apis.
- Answer question
-sign in and create project
-provide device name
-open convex site login using github/google and confirm code (i used github)
-agree terms and condition
-project name
-dev should run on europe server
-etup AI files agents claude.md

- 3 create file name sampleData.jsonl and copy paste content from docs
- 4 run (pnpm dlx convex import --table tasks sampleData.jsonl) import data from sampledata file to tables into convex
- 5 create file name tasks.ts in convex folder 
Exporting a query function from this file declares an API function named after the file and the export name: api.tasks.get
- 6 create file name ConvexClientProvider.tsx inside component/web folder 
- 7 wrap the children in root layout inside app with <ConvexClientProvider>{children}</ConvexClientProvider>
- 8 create page.tsx inside test folder inside (shared-layout) and paste from step9
- open another terminal and run pnpm dlx convex dev to start dev server

* now both dev and next server will run simultaneously and by going on test route can see data
we can also go to convext dashboard to see check the data we uploaded, health of server etc

## Better Auth Integration with Convex
-Better Auth is a framework-agnostic, universal authentication and authorization framework for TypeScript.
- 0 Go to better-auth site  => Integration => Convex
- 1 pnpm add better-auth @convex-dev/better-auth
- 2 pnpm dlx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
- 3 pnpm dlx convex env set SITE_URL http://localhost:3000
- 4 copy env in env.local and copy, paste NEXT_PUBLIC_CONVEX_URL in NEXT_PUBLIC_CONVEX_SITE_URL
- 5 in convex folder create auth.config.ts and paste code from step 4 in documentation
- 6 in convex folder create another betterauth folder and create convex.config.ts and copy paste code in it
- 7 in convex folder create convex.config.ts and copy paste code in it
- 8 create auth.ts in convex/betterauth and paste code 

- 9 Now run (pnpm dlx auth generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts) which will fail in most cases so follow below instructions
-comment schema 
-replace this part
export const authComponent = createClient<DataModel, any>(
  components.betterAuth,
  {
    local: { schema: undefined as any },
    verbose: false,
  },
);
-then install (pnpm dlx auth generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts)
-replace schema and undo replaced section in auth.ts

-If process.env gives warning run (pnpm add -D @types/node)
"types": ["node"] paste this in tsconfig.json 

-use chat gpt if any other warning comes

- 10 create adapter.ts in betterAuth folder and paste the code
- 11 create auth-client.ts & auth-server.ts in lib folder and copy paste code
- 12 create http.ts in convex folder also create api/auth/[...all]/route.ts in app and copy paste code
- 13 replace code in component/web/ConvexClientProvider with provided code
- 13 wrap children in app/layout.tsx which is already done so no need

DONE

## Better-Auth Error Ocuured

- well new better-auth and convex version were released and due to which the sign up function started throwing 500 error
- to fix we tried many things finally found a solution to downgrade better-auth to a compatable previous version
- (pnpm add better-auth@1.5.x)  (pnpm exec convex dev) run these two and check again

# Creating Login page

- create login folder in auth and create page.tsx
- copy the sign and for better just change signUp to signIn
- install sonnet to show toast and integrate it









