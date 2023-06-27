import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
    margin: 0;
    background: ${p => p.theme.bgColor};
    color: ${p => p.theme.textColor};
    overflow-x: hidden;
  }


*, *::before, *::after {
  box-sizing: border-box;
  text-decoration: none;
  user-select: none;
}
a{
  text-decoration: none;
}
`;

export default GlobalStyle;
