import { ApplicationState } from './store'

/// <reference types="react-scripts" />

declare global {
  interface Window { INITIAL_REDUX_STATE: ApplicationState; }
}

window.INITIAL_REDUX_STATE = window.INITIAL_REDUX_STATE || {};