## Installation
* npm install -g @nestjs/cli
* make sure npm path is present in path variable
  * to find npm path - npm root -g
  * copy the path just before node_modules and add in path.

* To create new project 
  * nest new project name.

#### Another way of installation
* create folder
* npm init -y
* npm i @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata typescript
    * @nestjs/common           ->    contains function classes that need from nest
    * @nestjs/core 
    * @nestjs/platform-express ->    let nest use express js for http request/ express adapter for nest
       * express is default, we can also use fastify for http request,
    * reflect-metadata         ->    helps make decorator works
    * typescript
* create and configure tsconfig.json
  * below two are super important for nest to work:
  *  "emitDecoratorMetadata": true,
  *  "experimentalDecorators": true,
```js
{
  "compilerOptions": {
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
  }
}

```
* create entry point
  * create folder src and fie main.ts
  ```js
  import {NestFactory} from '@nestjs/core'
  import {AppModule} from './app.module'
  async function bootstrap() {
     const app = await NestFactory.create(AppModule)
     await app.listen(3000)
  }
  bootstrap()
  ```
* create controller( app.controller.ts)
  ```js
  import {Controller. Get} from '@nestjs/common'

  @Controller
  export class AppController {
    @Get()
    getRootRoute(){
      return 'hi there'
    }
  }
  ```
* Create Module (app.module.ts)
```js
import {Module} from '@nestjs/common'
import {AppController} from './app.controller'

@Module({
  controllers:[AppController ]
})
class AppModule() {

}

```
## Nest tools to write server functionality
* Pipe        ->    Validate data contains in the request.
* Guard       ->    Make sure the user in authenticated.
* Controller  ->    Route the request to a particular function.
* Service     ->    Run some business logic
* Reposirtory ->    Access a database.
* Modules     ->    Groups code together
* Filters     ->    Handles error that occurs during request handling
* Interceptors->    Add extra login to incoming/ougoing request/response.

## Controller
* Defined by using @controller decorator
* We need to define the path in bracket which this controller will control
### Handler
* Method within controller class decorated with @Get @Post etc.

#### Getting value in POST request
* we are sending
  * body with title and Description as key-
```js
  @Post()
  createTask(
    @Body() body,
    @Body('title') title: string,
    @Body('Description') description: string,
  ) {
    console.log('body', body);
    console.log('title', title);
    console.log('desc', description);
  }
}
```

## Providers and Services
* Providers can be injected into constructor if decorated as an @Injectable, via dependency injection.
* Not all providers are services.
* Providers are SINGLETON.
* Any injectable provider can be injected to any component within Nestjs ecosystem.
* We will define the dependencies in the constructor of the class.
  * Nextjs will take care of injection for us.

## Nestjs Pipes
### npm i class-validator class-transformer

* Pipes operates on the arguments to be processed by the route handler, just before the handler is called.
* Pipes can perform data transformation or data validation.
* Pipes can return data - either original or modified - which will be passed on to route handler
* Pipes can throw exception. Exception thrown will be handled by Nestjs parse into error response.
* Pipes can be asynchronus.

#### Inbuilt Pipes
* ValidationPipe
* ParseIntPipe

#### Custom Pipe implementation
* Pipes are classes annotated with the @Injectable() decorator.
* must implement the PipeTransform generic interface. => i.e must have transform method.
  * this method will be called by nestjs to process the arguments.
  * transform method accepts two parameters.
    * value : the value of processed argument.
    * metadata(optional) : object containing metadata about the argument.
* Whatever is returned from transform() will be passed to the route handler.
  * Exception will be sent back to client.

#### Pipes can be consumed in different ways.
* Global Pipes:
  * defined at the application level.
  * applied to any incoming request.
  ```js
  async function bootstrap(){
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalPipes(SomePipe);
    await app.listen(3000)
  }
  bootstrao();
  ```
* Haldler level pipes:
  * defined at the handler level via @UsePipes()
  * such pipe will process all the parameters for the incoming request.
  ```js
  @Post()
  @UsePipes(somePipe)
  createTask(@Body() someBody ) {...}
  ```
* Parameter level pipes:
  * defined at the parameter level
  * will process only those parameters for which the pipe has been defined.
  ```js
  @Post()
  createTask(@Body('desc', somePipe) description ) {...}
  ```
### Error handling
* Nestjs provide us with several inbulit error.
* We just need to throw these errors and rest will be taken care by nestjs
  * it will send the appropriate response to client.

# Extra
* Normally when we create constructor in a class we need to create the class variable and then assign the parameter to the class varibale.
```js
@Controller('tasks')
export class TasksController {
  taskService: TasksService    // defining class var
  constructor( this.taskService: TasksService) {}
}

function a(){
  this.taskservice.dosomething()
}
```
* But we can by pass decalaring of the variable by assigning accessor in constructor
* ts will understand that since this is private/public this must be property of class and compile in such a manner.
```js
@Controller('tasks')
export class TasksController {
  
  constructor( private taskService: TasksService) {}  //accessor with no this keyword
}

function a(){
  this.taskservice.dosomething()
}
```
## Data transfer Object DTO
* An object that carries data between processes.
* use to encapsulate data and send it to another system.
* Does not have any behavior except for storage, retrieval, serilization and deserilization of its own data.
* can be usefull for data validation.
```js
//DTO CLASS
export class CreateTaskDto {
  title: string;
  description: string;
}

//CONTROLLER

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
//SERVICE
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  ```

## CLI 
* nest new projectName
* SWITCH TO SRC DIRECTORY
* nest g module moduleName
  * this will create folder with moduleName and create file modulename.module.ts
* nest g controller cName --no-spec
  * create controller file without creating spec.ts (test cases file)
* nest g service tasks --no-spec



















-------------------------------------------------------------------------
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
