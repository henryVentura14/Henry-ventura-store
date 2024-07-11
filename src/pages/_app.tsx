import { AppProps } from "next/app";
import { ProductProvider } from "../context/ProductContext";
import "../styles/globals.css";
import Modal from "@/components/Shared/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <Component {...pageProps} />
      <Modal />
    </ProductProvider>
  );
}

export default MyApp;
