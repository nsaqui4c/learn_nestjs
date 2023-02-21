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
## Dependency Injection (DI) in Nestjs
* Normally we have three class with DI
 * controller depend upon service
 * service depends upon repository
* In normal coding if we want to initialize controller we have to write below 3 lines to implememt Inversion of control
 * In complex application there might be more dependecies then just 1 service and 1 repository.
```js
const repo = new MessageRepository();
const service = new MessageService(repo);
const controller = new MessageController(service);
```
* To solve this we have technique of dependency Injection.
* Nest has DI Container which create all the dependncies for us
* To make class available for DI we need to add @Injectable on those classes.
 * This will make the class available in Nest DI container.
* Now we need to add these classes in providers list in module class.
 * providers -> things that can be used as dependencies for other classes.

![DI Container Flow](https://user-images.githubusercontent.com/45531263/220081855-0a7f6ba9-13ce-48ae-8256-2244967fda7a.png)

#### providers are singleton i.e DI Container will create only one instance of injectable class and share the same instances.
```js
export class MessageService {
 constructor(public msgRepo : MessageRepository,msgRepo2 : MessageRepository){
  console.log(msgRepo===msgRepo2)  // true
  // even though we have asked for 2 instance, DI will provide the same instance twice.
 }
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
![nestjs-req-params](https://user-images.githubusercontent.com/45531263/218913381-a7f71daa-f252-4399-89f1-2ae0e50c3ca0.png)

* @Controller           -> class decorator
* @Get @Post etc        -> Method decorator
* @Body @Params         -> Argument Decorator
## Providers and Services
* Providers can be injected into constructor if decorated as an @Injectable, via dependency injection.
* Not all providers are services.
* Providers are SINGLETON.
* Any injectable provider can be injected to any component within Nestjs ecosystem.
* We will define the dependencies in the constructor of the class.
  * Nextjs will take care of injection for us.

## Nestjs Pipes
### setting up automatic validation
* Tell nest js to use global validation
```
async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());   //Global Validation
  await app.listen(3000);
}
bootstrap();
```
* Create data transfer Object (DTO) and Validation rules
```
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()  //Validation rules
  content: string;
  @IsOptional()
  extra?: string
}
```
* Apply Dto to request handler
```
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return body;
  }

```
### npm i class-validator class-transformer

* Pipes operates on the arguments to be processed by the route handler, just before the handler is called.
* Pipes can perform data transformation or data validation.
* Pipes can return data - either original or modified - which will be passed on to route handler
* Pipes can throw exception. Exception thrown will be handled by Nestjs parse into error response.
* Pipes can be asynchronus.

#### class transformer
* Transform plain object to class (constructor) objects -> create instance of the class with the plain object value
```
[
  {
    "id": 1,
    "firstName": "Johny",
    "lastName": "Cage",
    "age": 27
  },
  {
    "id": 2,
    "firstName": "Ismoil",
    "lastName": "Somoni",
    "age": 50
  },
  {
    "id": 3,
    "firstName": "Luke",
    "lastName": "Dacascos",
    "age": 12
  }
]

## TRANSFOR TO CLASS OBJECT

export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  getName() {
    return this.firstName + ' ' + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}
```

![validationPipe](https://user-images.githubusercontent.com/45531263/218943995-cb4a165a-6fe4-48f3-9be7-b44442ac2b64.png)

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
#### How does the js conserve the type of request??
* createMessage(@Body() body: CreateMessageDto)
* In the tsconfig file we have we have added 
 * "emitDecoratorMetadata": true,
 * "experimentalDecorators": true,
* This will create extra function containing metadata to preserve the type and validation
```js
## TS FILE
 @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return body;
  }
  
## CONVERTED JS FILE
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
```
### Services and Repositories
![Repositories](https://user-images.githubusercontent.com/45531263/218958059-b0d9b905-41e2-4ada-917d-bf460f8ff1e9.png)

* Implementing Repository
 * create messages.repository.ts
 * create class MessageRepository
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

## UNIT TESTING
* For unit testing Nest application first we need to mock all the the dependencies a service is using.
* For that we need to create DI container. for test we create container using below syntax.
```js
   import { AuthService } from './auth.service';
   it('can create instance of auth service' , async()=>{
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        ],
    }).compile();
   }
```
* In case we do not want to pass the real service but the fake one, we can do it as below:
 * while faking, we do need to create full class, but jsut the function which are being are required.
 * Partial<UserService> is used to define type in case of partial fake class.
```js
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

  it('can create instance of auth service' , async()=>{
  
  // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService: Partial<UserService> = {    // type script the partial shape of class
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;         // forced type scripting
        users.push(user);
        return Promise.resolve(user);
      },
    };
  
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService, //contains some function of UserService hence typescript it with Partial
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });
}
```
* Testing of error 
 ```js
   it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
 
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
```

 #### Another Way of mocking function in fake service or repo
 * Jest provide us with jest.fn() which has multiple tools to help us mock function
 ```js
 const fakeTaskRepository = () => ({
  getTasks: jest.fn();      // instead of defining function and return some value
                            // we marked it as jest function
 })
 
 describe('get tasks' , async ()=>{
 fakeTaskRepository.getTasks.mockResolvedValue('some Value');
 const result = taskService.getTasks()   // service is going to call repo.getTask func
                                        // but repo will respond with mock value from above line.
 expect(result).toEqual('some Value');
 }) 
 ```
 
 * full code of above snippet
 ```js
 import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
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
