'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create one sheet per request on the server
  const [styledComponentsStyleSheet] = React.useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // clear the tag to avoid streaming duplication
    styledComponentsStyleSheet.instance.clearTag(); 
    return <>{styles}</>;
  });

  // On the client, just render children
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  // On the server, collect styles
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}