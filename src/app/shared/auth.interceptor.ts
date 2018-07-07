import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { take, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted !' + request);
    return this.store.select('auth')
      .pipe(take(1),
        switchMap(
        (authState: fromAuth.State) => {
          const copiedReq = request.clone({params: request.params.append('auth', authState.token)});
          return next.handle(copiedReq);
        }
      ));

  }
}
