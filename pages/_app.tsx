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
import { trpc } from "../utils/trpc";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <AuthWrapper>
          <NextUIProvider>
            <ApolloProvider client={apolloClient}>
              <Toaster />

              <Layout>
                <NextTopLoader
                  color="#E60023"
                  shadow="none"
                  showSpinner={false}
                />
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </NextUIProvider>
        </AuthWrapper>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default trpc.withTRPC(MyApp);
