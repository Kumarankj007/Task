import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  cart: [],
  subTotal: 0,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // initial add:
    setAddToCart: (state, action) => {
      state.cart.push({...action.payload});
      state.subTotal = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    // handle increment:
    setIncrement: (state, action) => {
      const isAvailable = state.cart.find(item => item.id == action.payload.id);
      // console.log(isAvailable, 'isAvailable');
      if (isAvailable) {
        isAvailable.quantity++;
        state.subTotal = state.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      }
    },
    // handle decrement:
    setDecrement: (state, action) => {
      const isAvailable = state.cart.find(item => item.id == action.payload.id);
      if (isAvailable) {
        if (isAvailable.quantity == 1) {
          const itemRemove = state.cart.filter(
            item => item.id !== action.payload.id,
          );
          state.cart = itemRemove;
        } else {
          isAvailable.quantity--;
        }
        state.subTotal = state.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      }
    },
    // remove item
    setRemoveCart: (state, action) => {
      const itemRemove = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = itemRemove;
      state.subTotal = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.subTotal = 0;
    },
  },
});

export const {
  setAddToCart,
  setCart,
  setDecrement,
  setIncrement,
  setRemoveCart,
} = CartSlice.actions;

export default CartSlice.reducer;
