import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClientProvider} from 'react-query';
import queryClient from '../config/queryClient'
import ReactQueryContextProvider from '../contexts/ReactQueryContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryContextProvider>
          <Component {...pageProps} />
        </ReactQueryContextProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
