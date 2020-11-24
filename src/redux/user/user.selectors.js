import { createSelector } from 'reselect';

const selectUser = state => state.user; //imput selector - devuelve el reducer dentro de state

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser  //user es el reducer
)