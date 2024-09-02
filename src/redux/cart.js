import { createSlice } from "@reduxjs/toolkit"; 

const INITIAL_STATE = {
    cartList: [],
};

const cartSlice= createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cartList.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cartList.push({ ...product, quantity: 1 });
            }
        },
        increment: (state, action) => {
            const productId = action.payload;
            const product = state.cartList.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const productId = action.payload;
            const product = state.cartList.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            } else {
                state.cartList = state.cartList.filter(item => item.id !== productId);
            }
        },
    }
})

export const { increment, decrement, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
