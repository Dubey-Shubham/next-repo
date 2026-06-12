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
- shoe toast on clicking logout
- useRouter to route user to diffrent page
- loading in sign up login button

# Createing Create Blog page

- creating create folder with page.tsx inside shared-schema and creating the page
- Create Schema for tables of our data in Convex (Although it is not required but still it will give type safety)
- create schema.ts in convex folder and write the schema
- create a mutation to save the changes, for that create posts.ts in convex and write logic
- using the mutation function to save data and testing it

# Server Actions

- these are methods which we can create to perform mutations in out server
- create action.ts in app and write logic also write "use server" at top of the file
- server actions are run on servers so even if someone consoles something in such file it will not show in console
- a mock server action has been created in actions.ts in app and called in  shared-layout => create => page.tsx

# Route Handlers

- a mock route handler has been created in route.ts in create-blog in app and called in  shared-layout => create => page.tsx
- they do not show arning when doing a type error or any other error error unlike server actions

# Diffrence B/w server action action and route handler

- server actions are secured and route handler are accessible in other applications
- server actions-
*handling forms
*updating DB from UI
*internal app logic
*you don't need a public API

- route handler
*creating APIs
*handling webhooks
*external services need access
*mobile apps consume backend
*custom HTTP logic needed

# creating Blog page

- in shared layout create log folder inside create page.tsx
- build a page inside
- inside convex -> posts create a query to fetch the blog data from convex table
- in next.config.ts Add images object -> remotePatterns Array -> add protocol and hostname of url
- Fetching data from convex server showing it in cards

## Server sside data fetching and client side and their pro cons
- server side
(PRO)
1 faster page load
2 no loading as no hydration needed
3 seo benifit

(CONS)
- no reactivity
- if server slow nothing gets render till data is fetched in server   (Streaming is Solution though)

- client side
(PRO)
1 reactivity
2 even if data fetching takes time other static parts gets painted

(CONS)
takes time to fetch data after refresh
no seo benifit

## Streaming
Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

## Implementing Streaming

1 create loading.tsx in blog in shared-layout and write a loading h1 which we will show while data gets load
2 behind the scene it uses suspense component of react
3 but this streaming has an limitation, it suspends entire page or component till data gets fetched even the static headings and all
4 using Suspense we have showed a fallback shimmer while card gets rendered, also other static part are already rendered thus we have implemented streaming

## Adding Akeleton Shimmer UI

- Adding Shimmer UI using Skeleton comp from shadcn in blog page.tsx

## Adding image in blog with upload and then show in blogs

- made changes in following files- schema.ts, posts.ts in convex folder | actions.ts, schemas/blog/ts, shared-schema/create/page.tsx in app
- write endpoint types and add image input in create form and complete all
- in getposts query fetch the image and insert it in the posts object
- then show it in the posts page also but the hostname in next config file (eg our is spotted-seal-342.eu-west-1.convex.cloud)

# NextJs Caching 

- Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again.
- when we run pnpm run build, next builds route and it assign which route will render static and which dynamic
eg Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /abc
├ ○ /abc/hello
├ ƒ /api/auth/[...all]
├ ƒ /api/create-blog
├ ○ /auth/login
├ ○ /auth/sign-up
├ ƒ /blog
├ ○ /blogg
├ ƒ /blogg/[blogId]
└ ○ /create

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

- those route who fetches no data from db/api become static (o), those who do fetch data becomes  (f) dynamic
- but we can also make dynamic route static

## Static Rendering
- The page is generated ahead of time and cached.
- good for blogpost, documentation, public product listing
- static pages are build and rendered via CDN for fast rendering and their data do not update
- every single user sees same data until it is revalidated or rebuilt

## Dynamic Rendering
- The page is rendered on every request.
- good for user dashboard, shopping carts, personalized content
- rendered via server no CDN 
- every request builds page and renders thus it is also slow


## making dynamic blog page static

- above the component put 

export const dynamic = "force-static"
// "auto" | "force-dynamic" | "error" | "force-static"

   export default function BlogPage() { return(<></>)}

- then pnpm run build it followed by pnpm run start
- this will make this page static
- "force-static" forces the page to be statically generated and cached, even if Next.js might otherwise choose dynamic rendering.
- "force-dynamic" Always render on every request.

## Revalidation

### Time Based Revalidation

- Revalidated after fixed time interval
- When latest data is not priority
=>put export const revalidate = false under  force static statement
- other options are false | 0 | number
- flase means always cache no revalidate, 20 means revalidate after 20sec,put revalidatePath("/blog") in any action after which u want to revalidate certain path
- after revalidation do build the app
- and it will work
- This is also called (ISR) Incremental Static Regeneration

# Creating Id base new page for blogs

- worked in [blogId]/page.tsx, posts in convex
- created and api and fetched data from it based on postId

# Created Comment Section

- create comment.ts in convex to write data fetch query and mutation for comment add
- useParams can be used to get parameter in both server and client component
- create commentSection.tsx component 
- integrating it with server actions to add and get comment 




