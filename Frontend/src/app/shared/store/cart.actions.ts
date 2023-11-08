import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('addToCart');
export const toggleUser = createAction('toggleUser');
export const removeFromCart = createAction('removeFromCart');
export const removeMultipleFromCart = createAction('removeMultipleFromCart',props<{value:number}>());
export const popupCart = createAction('popupCart');
export const isAdmin = createAction('isAdmin',props<{value:boolean}>());
export const name = createAction('name',props<{value:string}>());
export const clearState = createAction('clearState')
export const getCartItems = createAction(
  'getCartItems',
  props<{ value: number }>()
);
