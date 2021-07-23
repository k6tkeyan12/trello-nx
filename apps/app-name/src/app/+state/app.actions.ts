import { Action, createAction, props } from '@ngrx/store';
import { AppData } from './app.reducer';

export enum AppActionTypes {
  LoadList = '[App] Load List',
  GetList = '[App] Get All List',
}

export class LoadList implements Action {
  readonly type = AppActionTypes.LoadList;
  constructor(public payload: AppData) { }
}

export class GetList implements Action {
  readonly type = AppActionTypes.GetList;
  constructor(public payload: AppData) { }
}

export type AppActions =
  | LoadList
  | GetList
  ;

//export const getLists = createAction('[Board] get Lists', props<{ list: any[] }>());