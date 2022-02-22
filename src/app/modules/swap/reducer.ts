import { actionTypes, FieldInput } from './action';
import { swapActionTypes } from './types';

export interface SwapState {
  readonly independentField: FieldInput;
  readonly typedValue: string;
  readonly [FieldInput.INPUT]: {
    readonly currencyId: string | undefined;
  };
  readonly [FieldInput.OUTPUT]: {
    readonly currencyId: string | undefined;
  };
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null;
}

const initialState: SwapState = {
  independentField: FieldInput.INPUT,
  typedValue: '',
  [FieldInput.INPUT]: {
    currencyId: ''
  },
  [FieldInput.OUTPUT]: {
    currencyId: 'CLO'
  },
  recipient: null
};

function reducer(state = initialState, action: swapActionTypes) {
  switch (action.type) {
    case actionTypes.SELECT_CURRENCY: {
      const { currencyId, field } = action.payload;
      // const otherField = field === FieldInput.INPUT ? FieldInput.INPUT : FieldInput.OUTPUT;
      // if (currencyId === state[otherField].currencyId) {
      return {
        ...state,
        independentField: state.independentField === FieldInput.INPUT ? FieldInput.OUTPUT : FieldInput.INPUT,
        [field]: { currencyId }
        // [otherField]: { currencyId: state[FieldInput.INPUT].currencyId }
      };
      // }
      // return {
      //   ...state
      // };
    }
    case actionTypes.REPLACE_SWAP_STATE: {
      const { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } = action.payload;
      return {
        [FieldInput.INPUT]: {
          currencyId: inputCurrencyId
        },
        [FieldInput.OUTPUT]: {
          currencyId: outputCurrencyId
        },
        independentField: field,
        typedValue,
        recipient
      };
    }
    case actionTypes.SWITCH_CURRENCY: {
      return {
        ...state,
        independentField: state.independentField === FieldInput.INPUT ? FieldInput.OUTPUT : FieldInput.INPUT,
        [FieldInput.INPUT]: { currencyId: state[FieldInput.OUTPUT].currencyId },
        [FieldInput.OUTPUT]: { currencyId: state[FieldInput.INPUT].currencyId }
      };
    }
    case actionTypes.TYPEINPUT: {
      const { field, typedValue } = action.payload;
      return {
        ...state,
        independentField: field,
        typedValue
      };
    }
    default:
      return state;
  }
}

export default reducer;
