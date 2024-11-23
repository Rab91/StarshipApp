import cartReducer, { addToCart } from './cartSlice';

test('should handle adding an item to the cart', () => {
  const initialState = { items: [] };

  const action = addToCart({ id: '1', name: 'Starship A' });
  const state = cartReducer(initialState, action);

  expect(state.items).toHaveLength(1);
  expect(state.items[0]).toEqual({ id: '1', name: 'Starship A' });
});
