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



