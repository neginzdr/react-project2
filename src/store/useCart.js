import { create } from "zustand";

const useCart = create((set) => {
  const prevShoppingCart =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];

  return {
    products: prevShoppingCart,

    addProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const existing = prev.products?.find((item) => item.id == cartId);
        if (existing) {
          const newProducts = prev.products.filter(
            (item) => item.id !== cartId
          );
          localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
          return { products: newProducts };
        } else {
          const newProducts = [...prev.products, { id: cartId, quantity: 1 }];
          localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
          return { products: newProducts };
        }
      })
    ),

    increaseProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const existing = prev.products.find((item) => item.id === cartId);
        if (existing) {
          const newProducts = prev.products.map((item) => {
            if (item.id === cartId) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
          localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
          return { products: newProducts };
        }
      })
    ),

    decreaseProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const existing = prev.products.find((item) => item.id === cartId);
        if (existing) {
          if (existing.quantity > 1) {
            const newProducts = prev.products.map((item) => {
              if (item.id === cartId) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            });
            localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
            return { products: newProducts };
          } else {
            const newProducts = prev.products.filter(
              (item) => item.id !== cartId
            );

            localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
            return { products: newProducts };
          }
        }
      })
    ),

    removeProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const newProducts = prev.products.filter((item) => item.id !== cartId);
        localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
        return {
          products: newProducts,
        };
      })
    ),
  };
});

export default useCart;
