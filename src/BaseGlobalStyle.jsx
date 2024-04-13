import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const BaseGlobalStyle = createGlobalStyle`/* 
font-color:#3F3A3A #8B572A
border-color:#979797
background-color:#313538
*/

/***** base *****/

* {
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family: Noto Sans TC;
}
:root {
  height: 100%;
}
html {
  margin: 0 auto;
}

body {
  font-weight: 400;
  overflow: hidden;
  line-height: 2rem;
}

ul,
ol {
  list-style: none
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}


.hide {
  display: none;
}

${theme.breakpoints.sm} {
  .hide {
    display: none;
  }

}
`;

export default BaseGlobalStyle;
