declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.mp3' {
  const content: any;
  export default content;
}
declare module '*.wav' {
  const src: string;
  export default src;
}
declare module '*.json' {
  const content: any;
  export default content;
}
declare module '*.css' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: any;
  export default content;
}
declare module '*.sass' {
  const content: any;
  export default content;
}
declare module '*.less' {
  const content: any;
  export default content;
}
