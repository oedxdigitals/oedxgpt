import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

components={{
  code({children}){

    return (

      <SyntaxHighlighter
        style={oneDark}
        language="javascript"
      >
        {String(children)}
      </SyntaxHighlighter>

    );
  }
}}
