import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SINGUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {userName: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SINGUP;
}

export class TrySignin implements  Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {userName: string, password: string}) {}

}

export class SignIn implements Action {
  readonly type = SIGNIN;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}

export type AuthActions = Signup | SignIn | LogOut | SetToken | TrySignup | TrySignin;
