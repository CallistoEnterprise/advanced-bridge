import { all } from 'redux-saga/effects';
import HomeSaga from '~/app/modules/home/saga';

export default function* rootSaga() {
  yield all([HomeSaga()]);
}
