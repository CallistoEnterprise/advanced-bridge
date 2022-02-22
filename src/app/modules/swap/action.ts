export const actionTypes = {
  SELECT_CURRENCY: 'SELECT_CURRENCY',
  SWITCH_CURRENCY: 'SWITCH_CURRENCY',
  TYPEINPUT: 'TYPEINPUT',
  REPLACE_SWAP_STATE: 'REPLACE_SWAP_STATE'
};

export enum FieldInput {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

export function selectCurrency(payload: any) {
  return { type: actionTypes.SELECT_CURRENCY, payload };
}

export function switchCurrency(payload: any) {
  return { type: actionTypes.SWITCH_CURRENCY, payload };
}

export function replaceCurrency(payload: any) {
  return { type: actionTypes.REPLACE_SWAP_STATE, payload };
}

export function typeInput(payload: any) {
  return { type: actionTypes.TYPEINPUT, payload };
}
