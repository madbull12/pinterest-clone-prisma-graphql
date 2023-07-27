import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot, useRecoilState } from "recoil";
import NextTopLoader from "nextjs-toploader";

import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/AuthWrapper";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <AuthWrapper>
          <ApolloProvider client={apolloClient}>
            <Toaster />

            <Layout>
              <NextTopLoader color="#E60023" shadow="none"showSpinner={false}/>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </AuthWrapper>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
