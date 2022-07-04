## TOC

- [Quick start](#quick-start)
- [Tooling](#tooling)
- [Unit tests](#unit-tests)
- [Project structure](#project-structure)
- [Dependency injection](#dependency-injection)
- [Automatic module loading](#automatic-module-loading)
- [Final words](#final-words)
` `  
` `  
` `  
# Ultimate Node.js Starter that Scales with Native TypeScript, Super Fast Unit Tests, DI and more Batteries Included

The purpose of this post is to provide you with tool to start your new node.js projects with accent on scalability and developer experience.

The main idea is use minimum dependencies, easier maintenance, better re-compiling times, faster testing, less boilerplate.

> Important thing to mention, if you have big team and large scale application, it is crucial not to reinvent the wheel and to base upon [good architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and well established framework. In this case it is worth to consider using [nest.js](https://docs.nestjs.com/), it's mindset is to enable best practices for large enterprise applications, it is heavily inspired by Angular.

` `  
` `  
` ` 
# Quick Start <a name="quick-start"></a>

Clone the repository with

```
git clone --depth=1 https://github.com/bfunc/nodejs-ulitmate-template.git
```

Install the dependencies with you favorite package manager

```
npm install
```

Run the application in development mode with

```
npm run dev
```

> `ts-node-dev` will effectively restart node process on files change

Access 
```
http://localhost:4000
```

Run the application in production mode

```
npm start
```

You're ready to go!

### Additional commands

Run unit tests

```
npm run test
```

Run test coverage

```
npm run coverage
```

Auto format all project files with `prittier`

```
npm run format
```

Run ESlint on all project files

```
npm run lint
```


` `  
` `  
` ` 
# Tooling <a name="tooling"></a>

## Native TypeScript

We can avoid cumbersome compiling step with intermediate artifacts and get native TypeScript execution for node.js with [ts-node](https://typestrong.org/ts-node/docs/performance)

With ts-node you can run any _.ts directly as you are running regular _.js script with node.

```
ts-node index.ts
```

It comes with a price of small performance overhead on first file read at runtime, so if this is a concern for your application in production you can use ts-node together with SWC (in order of magnitude faster TypeScript transpiler implemented in Rust) without typechecking.

Path mapping
Very handy [tsconfig-paths](https://github.com/dividab/tsconfig-paths) library
allows to import modules from the filesystem without prefixing them with "./".

Watch Mode
We are going to use `ts-node-dev` to watch files and restart application on change, `ts-node-dev` is tweaked version of `node-dev` that uses `ts-node` under the hood. It restarts target node process but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to `node-dev` or `nodemon`.

## ESLint

Nothing special here, ESLint config extends `@typescript-eslint/recommended` rules.

Run `lint` command run linter on whole project

## Environment

Use `.env` file to simplify setting environment variables for development, it will be
picked up by [dotenv](https://www.npmjs.com/package/dotenv).
Env files may contain values such as database passwords or API keys. It is bad practice committing `.env` files to version control.

## Logging

`pino` json logger, because it is standard in most enterprise applications.

## Webserver

`Fastify` web framework, becasue it is highly focused on providing the best developer experience with the least overhead.


` `  
` `  
` ` 

# Unit Test <a name="unit-test"></a>

Testing is very important part of development process, that is why here we are going to bet on new player on unit test frameworks field [Vitest](https://vitest.dev/guide/features.html). In this case benefits are more important than potential risk choosing less established solution in enterprise (in any case it is worth a try because `Vitest` and `Jest` APIs and snapshots are compatible).

# Benefits of using `Vitest` over `Jest`

1. Main benefit is speed, in testing speed is important, especially if you tend to work in TDD/BDD style, every millisecond matters and `Vitest` is way faster than Jest in watch mode.
2. It understands TypeScript natively, no need to run transpiler
3. Everything is in the box, assertions, mocking, coverage - no need to maintain bloated list of dependencies.
4. Vitest UI, test dashboard interface. [demo](https://stackblitz.com/edit/vitejs-vite-w46jsw?file=README.md)

Warning though, `Vitest` is in active development and still considered as not fully stable. Checkout [doc page](https://vuejs.org/guide/scaling-up/testing.html#recommendation) for more info.


` `  
` `  
` ` 

# Project structure <a name="project-structure"></a>

Two of the most commonly used approaches to structure projects are: `Folder-by-type` and `Folder-by-feature`.

## Examples:

### `Folder-by-type`

```javascript
src
├── controllers
│    ├── UserController.ts
│    └── PetController.ts
├── repositories
│    ├── UserRepository.ts
│    └── PetRepository.ts
├── services
│    ├── UserService.ts
│    └── PetService.ts
│
└── index.ts
```

### `Folder-by-feature`

```javascript
src
├── pet
│    ├── Pet.ts
│    ├── PetController.ts
│    ├── PetRepository.ts
│    └── PetService.ts
├── user
│    ├── User.ts
│    ├── UserController.ts
│    ├── UserRepository.ts
│    └── UserService.ts
│
└── index.ts
```

Natively, when we are starting a new project, we tend to follow `Folder-by-type` approach, because when there is small amount of functionality it looks cleaner and requires less thinking. But what actually happens is that when project grows it basically turns into one big feature without clean separation of concerns inside.

It turns out that
`Folder-by-type` works well on small-scale projects and `Folder-by-feature` better suits large applications, because it provides higher modularity and easier code navigation.

We are aiming for scale with this starter, so it is based on `Folder-by-feature` structure and when project will became really big and amount of files in feature will become too high, structure can be improved a bit by taking an advantage of `Folder-by-type` structure inside features.

It may look like this:

### `Folder-by-feature-by-type`

```javascript
src
├── pet
│    ├── controllers
│    │    ├── PetGenericController.ts
│    │    └── PetSpecificController.ts
│    └── services
│         ├── PetGenericService.ts
│         └── PetSpecificService.ts
├── user
│    ├── controllers
│    │    ├── UserGenericController.ts
│    │    ├── UserPrivateController.ts
│    │    └── UserPublicController.ts
│    └── services
│         ├── UserGenericService.ts
│         ├── UserPrivateService.ts
│         └── UserPublicService.ts
│
└── index.ts
```

` `  
` `  
` ` 

# Dependency Injection <a name="dependency-injection"></a>

The idea behind dependency injection is really simple, it is basically providing list of dependencies as parameters instead of having hardcoded imports.

The base of our dependency injection is a design pattern called composition root, it is located in the `src/container.ts` file. Container is getting created with provided collection of dependencies, dependancy can be anything constant, function or class.
Example:

```javascript

function getUserService({ UserModel }) {
  return {
    getUserWithBooks: userId => {
      ...
      UserModel.getBooksByUserId(userId)
    },
  }
}

container.register({
  // the `userService` is resolved by invoking the function.
  userService: asFunction(getUserService)
})
```

Take a look at [awilix docs](https://github.com/jeffijoe/awilix#asfunction) for more information.

` `  
` `  
` ` 

# Automatic module loading <a name="automatic-module-loading"></a>

Automatic module loading from filesystem (like pages in next.js) is used. The convention is that before container creation script will look into modules folder, traverse its content and auto load dependencies of defined types, like models, controllers, services etc. Check `src/index.ts` for list of filenames that will be automatically loaded.

For now `dependenciesLoader.ts` script is very basic, for more advanced scenarios with nested folders or glob patterns you can use built-in `awilix` [loadModules](https://github.com/jeffijoe/awilix#auto-loading-modules) function.

` `  
` `  
` ` 

# Final words <a name="final-words"></a>

Ultimate Starter was designed to be as much flexible as less opinionated as possible, that is why Database drivers, ORMs or authentication libraries were not included as part of the starter, despite there is strong temptation to add at least integration with [supabase](https://supabase.com/).

It is not easy to find the Golden Mean, here is list of things that are currently missing, sorted by importance.

- Error handling
- Swagger generation
- GraphQL
- Authentication
- Commit hooks
- Deployment guidelines

If there is something that is missing to achieve the best developer experience possible, please do not hesitate and leave a comment. Your comments may be extremely valuable, other people may encounter the same things you do. Sharing is caring :)

