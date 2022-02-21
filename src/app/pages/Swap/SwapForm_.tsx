import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CustomCheckbox from '~/app/components/common/CustomCheckbox';
import Spinner from '~/app/components/common/Spinner';
import useGetWalletState from '~/app/modules/wallet/hooks';
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

export default function SwapForm({ submit, initialData, pending, canBuyCLO, setBuyCLO, disable }: props) {
  const [t] = useTranslation();

  const [destination, setDestination] = useState(false);
  const [swap_amount, setSwapAmount] = useState('');
  const [buy_amount, setBuyAmount] = useState('');
  const [destination_wallet, setDestWallet] = useState('');

  const { selectedToken } = useGetWalletState();
  // const balance = useSelector((state: any) => state.walletBridge.balance);

  const onChangeDestination = (status: boolean) => {
    setDestination(status);
  };

  const onSubmit = (values: any) => {
    submit(values);
  };

  const values = {
    swap_amount,
    buy_amount,
    destination_wallet
  };

  return (
    <div className="swapform">
      {/* <Formik
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
        {({ handleSubmit, values }) => { */}
      {/* console.log(values, '<==== values');
          return ( */}
      <div>
        <div className="row">
          <div className="col">
            <div className="row mt-3 swapform__row">
              <div className="col">
                <label htmlFor="swap_amount">{t('Amount to swap')} </label>
                {/* <Field name="swap_amount" type={'text'} groupname={selectedToken.name} component={FormInput} /> */}
                <div className="d-flex w-100 align-items-center">
                  <input placeholder="0.00" value={swap_amount} />
                  <p className="swapform__subtext">{selectedToken.symbol}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="swapform__subtext">{t('Amount')}</p>
                </div>
              </div>
            </div>
            {!disable && (
              <div className="row mt-4 swapform__row">
                <div className="col">
                  <CustomCheckbox label={t('Buy Callisto coins')} checked={canBuyCLO} onChangeCheckbox={setBuyCLO} />
                </div>
              </div>
            )}
            {canBuyCLO && (
              <>
                <div className="row mt-3 swapform__row">
                  <div className="col">
                    {/* <Field name="buy_amount" type={'text'} groupname="CLO" component={FormInput} /> */}
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
                {/* {destination && (
                  <Field
                    name="destination_wallet"
                    className="form-control swapform__destinationinput"
                    type={'text'}
                    component={FormInput}
                  />
                )} */}
              </div>
            </div>

            <button
              type="submit"
              color="success"
              className="swapform__submit"
              disabled={swap_amount === '0' || destination_wallet === '' || pending}
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
      </div>
      {/* );
        }}
      </Formik> */}
    </div>
  );
}
