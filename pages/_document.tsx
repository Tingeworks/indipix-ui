import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="style.css" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logoLight.s2vg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logoLight.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logoLight.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
