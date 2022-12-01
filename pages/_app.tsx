import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot, useRecoilState } from "recoil";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ApolloProvider client={apolloClient}>
          <Toaster />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
