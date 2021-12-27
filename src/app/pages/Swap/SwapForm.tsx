import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CustomCheckbox from '~/app/components/common/CustomCheckbox';
import FormInput from '~/app/components/common/FormInput';
import './swapform.css';

type props = {
  submit?: (data: any) => void;
  state?: any;
  initialData?: any;
};

const registerSchema = Yup.object().shape({
  swap_amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Please provide swap amount.')
    .min(0, 'Too little'),
  buy_amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Please provide buy amount.')
    .min(0, 'Too little'),
  destination_wallet: Yup.string()
    .min(2, `buy_amount has to be at least 2 characters`)
    .required('buy_amount is required')
});

export default function SwapForm({ submit, state, initialData }: props) {
  const [t] = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
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
                destination_wallet: '0x2Ac3Sa2xxc@121c20w.......wd2A211'
              }
        }
        validationSchema={registerSchema}
        validateOnMount
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <form onSubmit={handleSubmit} noValidate name="swapForm">
              <div className="row">
                <div className="col">
                  <div className="row mt-3 swapform__row">
                    <div className="col">
                      <label htmlFor="swap_amount">{t('Amount to swap')} </label>
                      <Field name="swap_amount" type={'text'} groupname="BNB" component={FormInput} />
                      <div className="d-flex justify-content-between">
                        <p className="swapform__subtext">{t('Amount')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4 swapform__row">
                    <div className="col">
                      <CustomCheckbox label={t('Buy Callisto coins')} />
                    </div>
                  </div>

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

                  <div className="row mt-5 swapform__row">
                    <div className="col">
                      <CustomCheckbox label={t('Specific destination wallet')} />
                    </div>
                  </div>

                  <div className="row mt-3 swapform__row">
                    <div className="col">
                      <Field
                        name="destination_wallet"
                        className="form-control swapform__destinationinput"
                        type={'text'}
                        component={FormInput}
                      />
                    </div>
                  </div>

                  <button type="submit" color="success" className="swapform__submit" disabled={!isValid}>
                    {t('SWAP')}
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
