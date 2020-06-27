import { SET_LOOKUPS } from './actions';

export const setLookups = (lookups: string[]) => ({
  type: SET_LOOKUPS,
  payload: lookups,
})
