import {
  NestInterceptor,
  Injectable,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // This part of the code will run before the request hit controller
    console.log('I am running before controller');

    return next.handle().pipe(
      map((data: any) => {
        //Running before the response is sent out
        console.log('I am running just before the response is sent out', data);
        return { data, message: 'data after the interceptor' };
      }),
    );
  }
}
