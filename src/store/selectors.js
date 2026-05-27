import { createSelector } from 'reselect';

const selectCartItems = state => state.cart.items;

const selectCartItemsById = (state, id) =>
  createSelector(
    [selectCartItems],
    items => items.filter(item => item.id === id)
  );

const selectCartTotal = createSelector(
  [selectCartItems],
  items => items.reduce((total, item) => total + item.price, 0)
);

export { selectCartItems, selectCartItemsById, selectCartTotal };
