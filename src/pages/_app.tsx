import { AppProps } from "next/app";
import { ProductProvider } from "../context/ProductContext";
import "../styles/globals.css";
import Modal from "@/components/Shared/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <div className="bg-gray-100 min-h-screen w-full">
        <Component {...pageProps} />
        <Modal />
      </div>
    </ProductProvider>
  );
}

export default MyApp;
