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
import Layout from '../Components/Layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp

// powered by tingeworks
// https://www.tingeworks.com