declare namespace JSX {
  interface IntrinsicElements {
    // General definition for any custom element, allowing any props
    [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      [propName: string]: any; // This allows any property name with any value
    };
  }
}