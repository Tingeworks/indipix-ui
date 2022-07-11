import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
      <Html>
        <Head>
          {/* nunito font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,800;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          {/* inter font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,800;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          {/* helvetica font */}
          <link
            href="http://fonts.cdnfonts.com/css/helvetica-neue-9"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}

