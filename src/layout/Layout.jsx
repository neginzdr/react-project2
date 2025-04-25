import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <>
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow mb-[5rem] mt-[3rem]">
      {children}
      </div>
      <Footer />
      </div>
    </>
  );
}
