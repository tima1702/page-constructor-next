import React from 'react';
import Head from 'next/head'

import ConstructorApp from '../components/ConstructorApp';

import '../components/styles/Button.scss'

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Page Constructor</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
    </Head>
    <ConstructorApp />
  </React.Fragment>
);

export default Index;