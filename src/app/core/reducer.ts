import { combineReducers } from 'redux';
import home from '~/app/modules/home/reducer';
import swap from '~/app/modules/swap/reducer';
import wallet from '~/app/modules/wallet/reducer';

export default combineReducers({
  home,
  wallet,
  swap
});
