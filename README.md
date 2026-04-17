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

# exporing file based routed with nested routs dynamic route etc

- made dummy abc, blog folder to explore that

# setting up shadcn 

- pnpm dlx shadcn@latest init -t next
- select radix, preset Nova
- install whatever component u want (like pnpm dlx shadcn@latest add button)

# creating component folder 

- here we have 2 nested folder ui for shadcn component and web for custom component

# setting up theme (dark/light mode)

- install theme (pnpm add next-themes)
- install dropdown (pnpm dlx shadcn@latest add dropdown-menu)
- create theme-provider file in ui folder and paste code
- create theme-toggle file in web -> paste code -> then rename component to ThemeToggle
- add <Theme-toggle/> in navbar and wrap main layout file children with <ThemeProvider/> that copied

# creating signUP

- create auth/sign-up/page.tsx
- install shadcn components like card, input, field
- install (zod) for typescript schema creation, (react hook form) for creating forms and (hookform/resolvers) to provide ts schema to hook form (pnpm i react-hook-form), (pnpm i zod), p(npm i @hookform/resolvers)
- Creating an Sign Up page using Shadcn component which we installed
- put "use client" above the sign in component as this is client component not server component

# removing navbar from signup page (Route Group)

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
- 1 (pnpm install convex) to install the convex in project
- 2 (pnpm dlx convex dev) To initiate a convex project where we will write our backend apis.
- Answer question
* sign in and create project
* provide device name
* open convex site login using github/google and confirm code (i used google)
* agree terms and condition
* project name
* dev should run on europe server
* setup AI files agents claude.md

- 3 create file name sampleData.jsonl and copy paste content from docs
- 4 run (pnpm dlx convex import --table tasks sampleData.jsonl) inport data from sampledata file to tables into convex
- 5 create file name tasks.ts in convex folder 
Exporting a query function from this file declares an API function named after the file and the export name: api.tasks.get
- 6 create file name ConvexClientProvider.tsx inside component/web folder 
- 7 wrap the children in root layout inside app with <ConvexClientProvider>{children}</ConvexClientProvider>
- 8 create page.tsx inside test folder inside (shared-layout) and paste from step9
- open another terminal and run pnpm dlx convex dev to start dev server

* now both dev and next server will run simultaneously and by going on test route can see data
we can also go to convext dashboard to see check the data we uploaded, health of server etc



