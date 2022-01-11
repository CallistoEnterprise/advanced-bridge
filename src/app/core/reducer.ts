import { combineReducers } from 'redux';
import home from '~/app/modules/home/reducer';
import wallet from '~/app/modules/wallet/reducer';
// import toasts from 'state/toasts';
export default combineReducers({
  home,
  wallet
  // toasts
});
