import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppData } from './app.reducer';

// // Lookup the 'App' feature state managed by NgRx
const getAppState = createFeatureSelector<AppData>('app');

export const getListData = createSelector(getAppState, (state: AppData) => state.list);

export const getCardData = createSelector(getAppState, (state: AppData) => state.card);


