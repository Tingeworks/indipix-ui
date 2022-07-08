// 
// 
// '||'               '||   ||            ||          
//  ||  .. ...      .. ||  ...  ... ...  ...  ... ... 
//  ||   ||  ||   .'  '||   ||   ||'  ||  ||   '|..'  
//  ||   ||  ||   |.   ||   ||   ||    |  ||    .|.   
// .||. .||. ||.  '|..'||. .||.  ||...'  .||. .|  ||. 
//                               ||                   
//                              ''''                  
// 
// # Introduction
// - Frontend written in TypeScript
// - State Management using Redux 
// - Styling using tailwindCSS


import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../Components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

// powered by tingeworks
// https://www.tingeworks.com