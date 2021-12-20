import { isPending } from '@reduxjs/toolkit'

export const hasPrefix = (action, prefix) => action.type.startsWith(prefix);
export const isPendingAction = (prefix) => (
  action
) => { 
  return hasPrefix(action, prefix) && isPending(action);
};