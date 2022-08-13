import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient} >
      <Layout>
        <Component {...pageProps} />

      </Layout>

    </ApolloProvider>
  
  )
}

export default MyApp
