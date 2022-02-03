import '../styles/globals.css'
import Script from 'next/script';
import type { AppProps } from 'next/app'
import {QueryClientProvider} from 'react-query';
import queryClient from '../config/queryClient'
import ReactQueryContextProvider from '../contexts/ReactQueryContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryContextProvider>
          <Component {...pageProps} />
        </ReactQueryContextProvider>
      </QueryClientProvider>
      <Script src="https://smtpjs.com/v3/smtp.js" strategy="lazyOnload" />
    </>
  )
}

export default MyApp
