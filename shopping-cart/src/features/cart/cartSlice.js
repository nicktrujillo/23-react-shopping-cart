import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCart: false,
    prices: [],
    cartCount: [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = { ...action.payload };
      const found = state.items.findIndex((item) => item.id === product.id);
      if (found !== -1) {
        state.items[found].quantity += 1;
      } else {
        product.quantity = 1;
        state.items.push(product);
      }
      state.showCart = true;
      state.prices.push(product.price);
      state.cartCount.push(product);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.prices = state.prices.filter(
        (item) => item !== action.payload.price
      );
      state.cartCount = state.cartCount.filter(
        (item) => item.id !== action.payload.id
      );
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    decreaseQuantity: (state, action) => {
      const product = { ...action.payload };
      const found = state.items.findIndex((item) => item.id === product.id);
      const foundy = state.cartCount.find((item) => item.id === product.id);
      const founder = state.prices.find((item) => item === product.price);
      let dely = state.cartCount.indexOf(foundy);
      let del = state.prices.indexOf(founder);
      //   let del = state.prices.indexOf(product.price);
      if (found !== -1) {
        state.items[found].quantity -= 1;
        state.prices.splice(del, 1);
        // delete state.prices[del];
      }
      state.cartCount.splice(dely, 1);
    },
    increaseQuantity: (state, action) => {
      const product = { ...action.payload };
      const found = state.items.findIndex((item) => item.id === product.id);
      let del = state.prices.indexOf(product.price);
      if (found !== -1) {
        state.items[found].quantity += 1;
        state.prices.push(product.price);
        state.cartCount.push(product);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  toggleCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectItems = (state) => state.cart.items;
export const displayCart = (state) => state.cart.showCart;
export const increaseTotal = (state) => state.cart.prices;
export const cartItems = (state) => state.cart.cartCount;

export default cartSlice.reducer;
