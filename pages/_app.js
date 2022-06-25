import Head from "next/head";
import "../styles/globals.css";
import 'antd/dist/antd.css';

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
