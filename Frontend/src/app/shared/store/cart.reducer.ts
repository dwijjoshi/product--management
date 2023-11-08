import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  clearState,
  getCartItems,
  
  isAdmin,
  name,
  popupCart,
  removeFromCart,
  removeMultipleFromCart,
  toggleUser,
} from './cart.actions';
import { initialState } from './cart.state';

const _counterReducer = createReducer(
  initialState,
  on(addToCart, (state) => {
    return {
      ...state,
      
      counter: state.counter + 1,
    };
  }),
  on(removeFromCart, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(removeMultipleFromCart,(state,{value})=>{
    return {
      ...state,
      counter: state.counter - value,
    }
  }),
  on(getCartItems, (state, {value}) => {
    return {
      ...state,
      counter: value,
    };
  }),
  on(toggleUser, (state) => {
    return {
      ...state,
      admin: !state.admin,
    };
  }),
  on(isAdmin,(state,{value})=>{
    return{
      ...state,
      admin:value,
    }
  }),
  on(name,(state,{value})=>{
    return{
      ...state,
      name:value
    }
  }),
  on(clearState,()=>initialState)
  
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
