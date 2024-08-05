import React from 'react';
import { Helmet } from 'react-helmet-async';



export default function AppTitle({ meta }) {
  const metaAppTitle = meta;

  return (
    <Helmet>
      <title>{metaAppTitle.appTitle}</title>
    </Helmet>
  );
}
