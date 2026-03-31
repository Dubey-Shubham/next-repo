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

