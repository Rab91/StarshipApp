import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProductCard from './ProductCard'; // Adjust import path if needed
import { addToCart } from '../redux/cartSlice'; // Your action
import { toast } from 'react-toastify';

// Mocking the redux store and addToCart action
const mockReducer = (state = { cart: { items: [] } }, action) => {
  switch (action.type) {
    case addToCart.type:
      return {
        ...state,
        cart: { items: [...state.cart.items, action.payload] },
      };
    default:
      return state;
  }
};

const store = createStore(mockReducer);

// Mocking react-toastify to prevent actual toast popups during tests
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('ProductCard Component', () => {
  // Test 1: Ensure the ProductCard renders product details correctly
  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard id="1" name="X-Wing" model="T-65B" manufacturer="Incom Corporation" cost="149999" />
      </Provider>
    );

    // Check if product name, model, manufacturer, and cost are displayed
    expect(screen.getByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText('Model: T-65B')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer: Incom Corporation')).toBeInTheDocument();
    expect(screen.getByText('Cost: 149999 credits')).toBeInTheDocument();
  });

  // Test 2: Ensure the quantity input is editable and changes correctly
  it('updates the quantity input correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard id="1" name="X-Wing" model="T-65B" manufacturer="Incom Corporation" cost="149999" />
      </Provider>
    );

    // Find the quantity input field (number input role)
    const numberInput = screen.getByRole('spinbutton');
    
    // Change the value of the input to 3
    fireEvent.change(numberInput, { target: { value: '3' } });

    // Assert that the value of the number input has been updated
    expect(numberInput.value).toBe('3');
  });

  // Test 3: Ensure that clicking the "Buy Now" button dispatches addToCart action
  it('dispatches addToCart action when "Buy Now" button is clicked', () => {
    const mockDispatch = jest.fn(); // Mocking dispatch function
    store.dispatch = mockDispatch; // Override dispatch in store with mock

    render(
      <Provider store={store}>
        <ProductCard id="1" name="X-Wing" model="T-65B" manufacturer="Incom Corporation" cost="149999" />
      </Provider>
    );

    // Find and click the "Buy Now" button
    const buyButton = screen.getByText('Buy Now');
    fireEvent.click(buyButton);

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart({ id: "1", name: "X-Wing", quantity: 1 }));
  });

  // Test 4: Ensure that toast notification appears when an item is added to the basket
  it('shows a toast notification when item is added to the basket', () => {
    render(
      <Provider store={store}>
        <ProductCard id="1" name="X-Wing" model="T-65B" manufacturer="Incom Corporation" cost="149999" />
      </Provider>
    );

    // Find and click the "Buy Now" button
    const buyButton = screen.getByText('Buy Now');
    fireEvent.click(buyButton);

    // Check if toast.success has been called with the correct message
    expect(toast.success).toHaveBeenCalledWith('1 X-Wing added to the basket!', expect.objectContaining({
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    }));
  });
});
