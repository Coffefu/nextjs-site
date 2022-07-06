import Head from "next/head";
import "../styles/globals.css";
import 'antd/dist/antd.css';
import "../styles/custom-antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cofefu - заказ кофе</title>
        <link rel="icon" href="/favicon.ico" />
        А
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
