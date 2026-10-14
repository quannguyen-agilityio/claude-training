/// <reference types="vite/client" />

declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export function isV4(): boolean;
export { v4 } from './uuid';
