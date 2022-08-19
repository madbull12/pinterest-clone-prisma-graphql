import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient} >
        <Toaster />

        <Layout>
          <Component {...pageProps} />

        </Layout>

      </ApolloProvider>
    </UserProvider>

  
  )
}

export default MyApp
