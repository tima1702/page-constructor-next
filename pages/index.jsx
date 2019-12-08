import React from 'react';
import Head from 'next/head'

import ConstructorApp from '../components/ConstructorApp';

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Page Constructor</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content="#FFFFFF"/>
      <link rel="manifest" href="/manifest.json"/>
    </Head>
    <ConstructorApp />
  </React.Fragment>
);

export default Index;