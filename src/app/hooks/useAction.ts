import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export function useAction(action: any) {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch]);
}
