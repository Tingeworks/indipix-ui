// NextJS & React imports
import type { NextPage } from 'next'
import Image from 'next/image'

// Third Party imports

// Domestic imports
import { SEO } from '../Components/SEO'

const Home: NextPage = () => {
  return (
    <div>
      <SEO 
        title="Indipix"
        description="" 
      />
    </div>
  )
}

export default Home
