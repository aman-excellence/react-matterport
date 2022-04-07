import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://static.matterport.com/showcase-sdk/latest.js"></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
