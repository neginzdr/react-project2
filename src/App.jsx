import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SingleCartPage from "./pages/SingleCartPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { createContext, useState } from "react";
import FavoritePage from "./pages/FavoritePage";

const queryClient = new QueryClient();
export const SearchContext = createContext(null);

function App() {
  const [searchItems, setSearchItems] = useState([]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SearchContext.Provider value={{ searchItems, setSearchItems }}>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products/:cartId" element={<SingleCartPage />} />
                <Route path="/shopping" element={<ShoppingCartPage />} />
                <Route path="/favorite" element={<FavoritePage />} />
              </Routes>
            </Layout>
          </SearchContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
