import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomCheckbox from '~/app/components/common/CustomCheckbox';
import FormInput from '~/app/components/common/FormInput';
import Spinner from '~/app/components/common/Spinner';
import './swapform.css';

type props = {
  submit?: (data: any) => void;
  state?: any;
  initialData?: any;
  pending: boolean;
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

export default function SwapForm({ submit, state, initialData, pending }: props) {
  const [t] = useTranslation();

  const [destination, setDestination] = useState(true);

  const selectedToken = useSelector((state: any) => state.wallet.selectedToken);
  const balance = useSelector((state: any) => state.wallet.balance);
  const [buyCLO, setBuyCLO] = useState(parseInt(balance.clo) === 0);

  const onChangeDestination = (status: boolean) => {
    setDestination(status);
  };

  const onChangeBuyCLO = () => {
    setBuyCLO(!buyCLO);
  };

  const onSubmit = (values: any) => {
    submit(values);
  };

  return (
    <div className="swapform">
      <Formik
        initialValues={
          initialData
            ? initialData
            : {
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
                      <Field name="swap_amount" type={'text'} groupname={selectedToken.name} component={FormInput} />
                      <div className="d-flex justify-content-between">
                        <p className="swapform__subtext">{t('Amount')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4 swapform__row">
                    <div className="col">
                      <CustomCheckbox
                        label={t('Buy Callisto coins')}
                        checked={buyCLO}
                        onChangeCheckbox={onChangeBuyCLO}
                      />
                    </div>
                  </div>
                  {buyCLO && (
                    <>
                      <div className="row mt-3 swapform__row">
                        <div className="col">
                          {/* <label htmlFor="buy_amount">Amount to swap </label> */}
                          <Field name="buy_amount" type={'text'} groupname="CLO" component={FormInput} />
                          <div className="d-flex justify-content-between">
                            <p className="swapform__subtext">
                              <strong>{t('Minimum received')}</strong>
                            </p>
                            <p className="swapform__subtext">71440 CLO</p>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <p className="swapform__subtext">
                              <strong>{t('Price impact')}</strong>
                            </p>
                            <p className="swapform__subtext">0.36%</p>
                          </div>
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
                    disabled={values.swap_amount === '0' || values.destination_wallet === ''}
                  >
                    {pending ? (
                      <div>
                        <Spinner className="me-2" />
                        Wait...
                      </div>
                    ) : (
                      t('SWAP')
                    )}
                    {/* {isPending(state) ? 'Wait...' : 'Submit'} */}
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
