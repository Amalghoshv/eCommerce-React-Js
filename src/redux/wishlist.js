
import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: []
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find(item => item.id === product.id);
      if (!exists) {
        state.wishlist.push(product);
        Swal.fire({
            title: "Added to Wishlist!",
            icon: "success",
          });

      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      Swal.fire({
        title: "Removed from Wishlist!",
        icon: "success",
      });
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
