export interface CounterModel {
  counter: number;
  admin: boolean;
  name:string;

}

export const initialState: CounterModel = {
  counter: 0,
  admin: false,
  name:""
};
