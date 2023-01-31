## Installation
* npm install -g @nestjs/cli
* make sure npm path is present in path variable
  * to find npm path - npm root -g
  * copy the path just before node_modules and add in path.

* To create new project 
  * nest new project name.

## Controller
* Defined by using @controller decorator
* We need to define the path in bracket which this controller will control
### Handler
* Method within controller class decorated with @Get @Post etc.

#### Getting value in POST request
* we are sending
  * body with title and Description as key-
```
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

# Extra
* Normally when we create constructor in a class we need to create the class variable and then assign the parameter to the class varibale.
```
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
```
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
```
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
