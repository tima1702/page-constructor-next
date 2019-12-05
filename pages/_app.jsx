import React from 'react'
import "../components/styles/App.scss"

export default function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />
}