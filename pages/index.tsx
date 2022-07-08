// NextJS & React imports
import type { NextPage } from 'next'
import Image from 'next/image'

// Third Party imports

// Domestic imports
import { SEO } from '../Components/SEO'
import  Footer  from '../Components/Footer'

/** Home page */
const Home: NextPage = () => {
  return (
    <div>
      <SEO 
        title="Indipix"
        description="" 
      />
      <Footer/>
    </div>
  )
}

export default Home
