import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <title>Page Constructor</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="apple-touch-icon" href="/constructor-192.png"/>
          <meta name="theme-color" content="#FFFFFF"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="description" content="Test page constructor application" />
        </Head>
        <body>
        <Main />
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument