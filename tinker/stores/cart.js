import { defineStore } from "pinia";


export const useCartStore = defineStore('cart', {
  state: () => {
    let cart = [];
    if (localStorage.getItem('cart')==null) {
      cart = [];
    }else{
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    return {
      cart
    };
  },
  actions: {
    addToCart(item) {
      this.cart.push({ item });
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    remFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    emptyCart() {
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
})