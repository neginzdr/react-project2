import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SingleCartPage from "./pages/SingleCartPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/products/:cartId" element={<SingleCartPage />} />
              <Route path="/shopping" element={<ShoppingCartPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
