import React from 'react';

// function to render object to jsx
export const LogObj = ({ value, replacer = null, space = 2 }: any) => (
    <pre>
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )