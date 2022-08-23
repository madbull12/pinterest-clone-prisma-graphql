import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Toaster } from 'react-hot-toast'
import {
  RecoilRoot, useRecoilState,

} from 'recoil';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { searchResultState } from '../atom/searchAtom'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <UserProvider>
        <ApolloProvider client={apolloClient} >
          <Toaster />

          <Layout>
            <Component {...pageProps} />

          </Layout>

        </ApolloProvider>
      </UserProvider>

    </RecoilRoot>


  
  )
}

export default MyApp
