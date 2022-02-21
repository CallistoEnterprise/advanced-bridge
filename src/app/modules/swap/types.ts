import { actionTypes } from './action';

interface SelectCurrencyAction {
  type: typeof actionTypes.SELECT_CURRENCY;
  payload: any;
}

interface SwitchCurrencyAction {
  type: typeof actionTypes.SWITCH_CURRENCY;
  payload: any;
}

interface ReplaceCurrencyAction {
  type: typeof actionTypes.REPLACE_SWAP_STATE;
  payload: any;
}

interface TypeInputAction {
  type: typeof actionTypes.TYPEINPUT;
  payload: any;
}

export type swapActionTypes =
  | SelectCurrencyAction
  | SwitchCurrencyAction
  | ReplaceCurrencyAction
  | TypeInputAction
  | any;
