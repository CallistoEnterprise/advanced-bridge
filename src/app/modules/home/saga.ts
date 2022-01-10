import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes, getCoinPriceSuccess } from './action';
const temp = 'http://135.181.196.253:8000/clo_metrics';

function* getCoinPrice(): any {
  const res: any = yield call(axios.get, temp);
  if (res.status === 200) {
    yield put(getCoinPriceSuccess(res.data.callisto));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_COIN_PRICE, getCoinPrice)]);
}
