// NextJS & React imports
import Head from "next/head";
import React from "react";

// Third Party imports

// Domestic imports

// Props interface for SEO
interface SEOPROPS {
  title: string;
}

/** Let's you set meta data as props for each page. `Mendatory for all pages for better SEO` */
const SEO: React.FC<SEOPROPS> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <style>
      </style>
    </Head>
  );
};

export default SEO;
