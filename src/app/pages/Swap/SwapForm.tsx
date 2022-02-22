import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import CustomCheckbox from '~/app/components/common/CustomCheckbox';
import FormInput from '~/app/components/common/FormInput';
import Spinner from '~/app/components/common/Spinner';
// import { FieldInput } from '~/app/modules/swap/action';
// import { useSwapActionHandlers } from '~/app/modules/swap/hooks';
// import useGetSwapState, { useDerivedSwapInfo, useSwapActionHandlers } from '~/app/modules/swap/hooks';
import useGetWalletState from '~/app/modules/wallet/hooks';
import { escapeRegExp } from '~/app/utils';
import SwapFooter from './SwapFooter';
import './swapform.css';

type props = {
  submit?: (data: any) => void;
  state?: any;
  disable?: boolean;
  initialData?: any;
  pending: boolean;
  canBuyCLO: boolean;
  setBuyCLO: () => void;
};

const registerSchema = Yup.object().shape({
  swap_amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Please provide swap amount.')
    .min(0, 'Too little')
  // buy_amount: Yup.number()
  //   .typeError('Amount must be a number')
  //   .required('Please provide buy amount.')
  //   .min(0, 'Too little'),
  // destination_wallet: Yup.string()
  //   .min(2, `buy_amount has to be at least 2 characters`)
  //   .required('buy_amount is required')
});

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

export default function SwapForm({ submit, initialData, pending, canBuyCLO, setBuyCLO, disable }: props) {
  const [t] = useTranslation();
  // const dispatch = useDispatch();

  const [destination, setDestination] = useState(false);

  const { selectedToken } = useGetWalletState();
  const [swap_amount, setSwapAmount] = useState('');
  const [buy_amount, setBuyAmount] = useState('');
  // const { independentField, typedValue } = useGetSwapState();
  // const { v2Trade, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo();

  // console.log(v2Trade, '<===== derived variables ');

  // const showWrap = false;
  // const trade = showWrap ? undefined : v2Trade;

  // const parsedAmounts: any = showWrap
  //   ? {
  //       [FieldInput.INPUT]: parsedAmount,
  //       [FieldInput.OUTPUT]: parsedAmount
  //     }
  //   : {
  //       [FieldInput.INPUT]: independentField === FieldInput.INPUT ? parsedAmount : trade?.inputAmount,
  //       [FieldInput.OUTPUT]: independentField === FieldInput.OUTPUT ? parsedAmount : trade?.outputAmount
  //     };

  // const { onUserInput } = useSwapActionHandlers();
  // const isValid = !swapInputError;
  // const dependentField: FieldInput = independentField === FieldInput.INPUT ? FieldInput.OUTPUT : FieldInput.INPUT;

  // const handleTypeInput = useCallback(
  //   (value: string) => {
  //     onUserInput(FieldInput.INPUT, value);
  //   },
  //   [onUserInput]
  // );
  // const handleTypeOutput = useCallback(
  //   (value: string) => {
  //     onUserInput(FieldInput.OUTPUT, value);
  //   },
  //   [onUserInput]
  // );

  // // modal and loading
  // const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
  //   tradeToConfirm: Trade | undefined;
  //   attemptingTxn: boolean;
  //   swapErrorMessage: string | undefined;
  //   txHash: string | undefined;
  // }>({
  //   tradeToConfirm: undefined,
  //   attemptingTxn: false,
  //   swapErrorMessage: undefined,
  //   txHash: undefined
  // });

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ''
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
  // };

  // const route = trade?.route;
  // const userHasSpecifiedInputOutput = Boolean(
  //   currencies[FieldInput.INPUT] &&
  //     currencies[FieldInput.OUTPUT] &&
  //     parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  // );
  // const noRoute = !route;

  // useEffect(() => {
  //   dispatch(switchCurrency('test'));
  // }, [dispatch]);

  const onChangeDestination = (status: boolean) => {
    setDestination(status);
  };

  const onSubmit = (values: any) => {
    submit({
      ...values,
      swap_amount,
      buy_amount
    });
  };

  const handleSwapAmount = (e: any) => {
    const temp = e.target.value.replace(/,/g, '.');
    if (temp === '' || inputRegex.test(escapeRegExp(temp))) {
      setSwapAmount(temp);
      // handleTypeInput(temp);
    }
  };

  const handleBuyAmount = (e: any) => {
    setBuyAmount(e.target.value);
  };

  return (
    <div className="swapform">
      <Formik
        initialValues={
          initialData ?? {
            swap_amount: '0',
            buy_amount: '0',
            destination_wallet: '1231231'
          }
        }
        validationSchema={registerSchema}
        validateOnMount
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate name="swapForm">
              <div className="row">
                <div className="col">
                  <div className="row mt-3 swapform__row">
                    <div className="col">
                      <label htmlFor="swap_amount">{t('Amount to swap')} </label>
                      <Field
                        name="swap_amount"
                        type="text"
                        groupname={selectedToken.name}
                        component={FormInput}
                        value={swap_amount}
                        inputMode="decimal"
                        autoComplete="off"
                        autoCorrect="off"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        minLength={1}
                        maxLength={79}
                        spellCheck="false"
                        onChange={handleSwapAmount}
                      />
                      <div className="d-flex justify-content-between">
                        <p className="swapform__subtext">{t('Amount')}</p>
                      </div>
                    </div>
                  </div>
                  {!disable && (
                    <div className="row mt-4 swapform__row">
                      <div className="col">
                        <CustomCheckbox
                          label={t('Buy Callisto coins')}
                          checked={canBuyCLO}
                          onChangeCheckbox={setBuyCLO}
                        />
                      </div>
                    </div>
                  )}
                  {canBuyCLO && (
                    <>
                      <div className="row mt-3 swapform__row">
                        <div className="col">
                          {/* <label htmlFor="buy_amount">Amount to swap </label> */}
                          <Field
                            name="buy_amount"
                            type={'text'}
                            groupname="CLO"
                            component={FormInput}
                            value={buy_amount}
                            onChange={handleBuyAmount}
                          />
                          <SwapFooter values={values} />
                        </div>
                      </div>
                      <div className="row mt-4 swapform__row">
                        <p className="swapform__description">
                          <i>{t('The value will be deducted from your swap. No fees are applied.')}</i>
                        </p>
                      </div>
                    </>
                  )}

                  <div className="row mt-5 swapform__row">
                    <div className="col">
                      <CustomCheckbox
                        label={t('Specific destination wallet')}
                        checked={destination}
                        onChangeCheckbox={onChangeDestination}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 swapform__row">
                    <div className="col">
                      {destination && (
                        <Field
                          name="destination_wallet"
                          className="form-control swapform__destinationinput"
                          type={'text'}
                          component={FormInput}
                        />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    color="success"
                    className="swapform__submit"
                    disabled={swap_amount === '0' || values.destination_wallet === '' || pending}
                  >
                    {pending ? (
                      <div>
                        <Spinner className="me-2" size="sm" />
                        Wait...
                      </div>
                    ) : (
                      t('SWAP')
                    )}
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
