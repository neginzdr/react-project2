import { create } from "zustand";

const useFavoriteCart = create((set) => {
  const prevFavoriteCart =
    JSON.parse(localStorage.getItem("favoriteCart")) || [];

  return {
    favoriteCarts: prevFavoriteCart,

    addToFavorite: (id) =>
      set((prev) => {
        const existing = prev.favoriteCarts?.find((item) => item.id == id);
        if (existing) {
          const newFavorite = prev.favoriteCarts.filter(
            (item) => item.id !== id
          );
          localStorage.setItem("favoriteCart", JSON.stringify(newFavorite));
          return { favoriteCarts: newFavorite };
        } else {
          const newFavorite = [...prev.favoriteCarts, { id: id }];
          localStorage.setItem("favoriteCart", JSON.stringify(newFavorite));
          return { favoriteCarts: newFavorite };
        }
      }),

    remove: (id) =>
      set((prev) => {
        const newFavorite = prev.favoriteCarts.filter((item) => item.id !== id);
        localStorage.setItem("favoriteCart", JSON.stringify(newFavorite));
        return {
          favoriteCarts: newFavorite,
        };
      }),
  };
});

export default useFavoriteCart;
