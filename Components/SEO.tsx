// NextJS & React imports
import React from "react"
import Head from 'next/head'

// Third Party imports

// Domestic imports


// Props interface for SEO
interface SEOPROPS {
    title: string;
    description: string;
}


/** Let's you set meta data as props for each page. `Mendatory for all pages for better SEO` */
export const SEO: React.FC<SEOPROPS> = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description}/>
            <link rel="icon" href="/favicon.ico" />    
        </Head>
    )
}