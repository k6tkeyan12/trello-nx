import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppActions, AppActionTypes } from './app.actions';

/**
 * Interface for the 'App' data used in
 *  - AppState, and
 *  - appReducer
 */

/**
 * Interface to the part of the Store containing AppState
 * and other information related to AppData.
 */
export interface AppData {
  list: Array<any>;
  card: Array<any>;
}

export interface AppState {
  app: AppData | undefined;
}

export const initialState: AppData = {
  list: [
    {
      id: 1,
      name: 'List 1'
    },
    {
      id: 2,
      name: 'List 2'
    },
    {
      id: 3,
      name: 'List 3'
    }
  ],
  card: [
    {
      id: 1,
      title: 'Title',
      listId: 1,
    },
    {
      id: 2,
      title: 'Title 2',
      listId: 2,
    },
    {
      id: 3,
      title: 'Title 3',
      listId: 3,
    }
  ],
};

export function appReducer(state : AppData[] = [initialState], action: AppActions) {
  switch (action.type) {
    case AppActionTypes.GetList: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case AppActionTypes.LoadList: {
      return {
        ...state,
        list: action.payload,
      };
    }
    default:
      return state;
  }
}



export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
