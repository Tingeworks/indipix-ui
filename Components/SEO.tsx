// NextJS & React imports
import Head from "next/head";
import React from "react";

// Third Party imports

// Domestic imports

// Props interface for SEO
interface SEOPROPS {
  title: string;
  keywords: string;
  description: string;
}

/** Let's you set meta data as props for each page. `Mendatory for all pages for better SEO` */
const SEO: React.FC<SEOPROPS> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.keywords} />
      <meta name="description" content={props.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

SEO.defaultProps = {
  title: "Indipix",
  keywords:
    "photo, images, free photo, premium photo, creative photo, professional photo",
  description: "Get the best Photos with high quality",
};

export default SEO;
