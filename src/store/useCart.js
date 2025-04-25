import { create } from "zustand";

const useCart = create((set) => {
  const prevShoppingCart =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];
  return {
    products: prevShoppingCart,
    addProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const founItemIndex = prev.products.findIndex(
          (item) => item.id === cartId
        );
        if (founItemIndex != -1) {
          const newProducts = prev.products.map((item, index) => {
            if (index == founItemIndex) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            } else {
              return item;
            }
          });

          localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
          return {
            products: newProducts,
          };
        } else {
          localStorage.setItem(
            "shoppingCart",
            JSON.stringify([
              ...prev.products,
              {
                id: cartId,
                quantity: 1,
              },
            ])
          );
          return {
            products: [
              ...prev.products,
              {
                id: cartId,
                quantity: 1,
              },
            ],
          };
        }
      })
    ),

    decreaseProduct: (cartId, evt) => (
      evt.stopPropagation(),
      set((prev) => {
        const newProducts = prev.products.map((item) => {
          if (item.id === cartId) {
            return { ...item, quantity: Math.max(0, item.quantity - 1) };
          } else {
            return item;
          }
        });
        localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
        return { products: newProducts };
      })
    ),

    removeProduct:(cartId,evt)=>(
      evt.stopPropagation(),
      set(prev=>{
        const newProducts=prev.products.filter(item=>item.id!==cartId);
        localStorage.setItem("shoppingCart",JSON.stringify(newProducts));
        return{
          products:newProducts
        }
      })
    )

  };
});

export default useCart;
