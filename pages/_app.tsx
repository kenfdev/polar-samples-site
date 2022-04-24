import Head from 'next/head'

import '../styles/globals.css'

import { Header } from '../components/Header'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width;initial-scale=1" />
        <title>Polar Samples</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <Header />

      <div className="px-6 text-4xl md:text-xl lg:text-base">
        <Component {...pageProps} />
      </div>
    </>
  )
}
