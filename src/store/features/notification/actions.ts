import { createAction } from 'typesafe-actions';
import { NotificationActionTypes, NotificationActionPayload } from './types';

export const showNotification = createAction(
  NotificationActionTypes.SHOW_NOTIFICATION,
  (payload: NotificationActionPayload) => ({ ...payload})
)<NotificationActionPayload>();

export const hideNotification = createAction(
  NotificationActionTypes.HIDE_NOTIFICATION,
  () => undefined
)<undefined>();
