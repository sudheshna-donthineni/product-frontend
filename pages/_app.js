import * as React from "react";
import ThemeProvider from "assets/theme";
import { Provider } from "react-redux";
import { store } from "store";
import Layout from "./layout";
import Head from "next/head";
import { appTitle } from "config";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
}
