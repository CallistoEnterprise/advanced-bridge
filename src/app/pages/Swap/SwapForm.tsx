import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import CustomCheckbox from '~/app/components/common/CustomCheckbox';
import FormInput from '~/app/components/common/FormInput';
import Spinner from '~/app/components/common/Spinner';
import { useGetAmountsInput, useGetAmountsOut } from '~/app/hooks/useGetAmountsOut';
// import { FieldInput } from '~/app/modules/swap/action';
// import { useSwapActionHandlers } from '~/app/modules/swap/hooks';
// import useGetSwapState, { useDerivedSwapInfo, useSwapActionHandlers } from '~/app/modules/swap/hooks';
import useGetWalletState from '~/app/modules/wallet/hooks';
import { escapeRegExp } from '~/app/utils';
import { getBalanceAmount } from '~/app/utils/decimal';
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
  const [isInput, setIsInput] = useState(true);

  const { selectedToken } = useGetWalletState();
  const [swap_amount, setSwapAmount] = useState('');
  const [buy_amount, setBuyAmount] = useState('');

  const amountsOut = useGetAmountsOut(swap_amount);
  const amountsIn = useGetAmountsInput(buy_amount);

  const dispInputAmount = isInput ? swap_amount : getBalanceAmount(amountsIn).toString();
  const dispOutputAmount = isInput ? getBalanceAmount(amountsOut).toString() : buy_amount;

  const onChangeDestination = (status: boolean) => {
    setDestination(status);
  };

  const onSubmit = (values: any) => {
    submit({
      ...values,
      swap_amount: dispInputAmount,
      buy_amount: dispOutputAmount
    });
  };

  const handleSwapAmount = (e: any) => {
    const temp = e.target.value.replace(/,/g, '.');
    if (temp === '' || inputRegex.test(escapeRegExp(temp))) {
      setSwapAmount(temp);
      setIsInput(true);
      // handleTypeInput(temp);
    }
  };

  const handleBuyAmount = (e: any) => {
    const temp = e.target.value.replace(/,/g, '.');
    if (temp === '' || inputRegex.test(escapeRegExp(temp))) {
      setBuyAmount(temp);
      setIsInput(false);
    }
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
                        value={dispInputAmount}
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
                            value={dispOutputAmount}
                            inputMode="decimal"
                            autoComplete="off"
                            autoCorrect="off"
                            pattern="^[0-9]*[.,]?[0-9]*$"
                            minLength={1}
                            maxLength={79}
                            spellCheck="false"
                            onChange={handleBuyAmount}
                          />
                          {/* <SwapFooter values={values} /> */}
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
                    disabled={
                      dispInputAmount === '0' || dispInputAmount === '' || values.destination_wallet === '' || pending
                    }
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
