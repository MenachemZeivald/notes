import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    --bg-color: #FFDD63;
    --panel-color: #f9e8b7;
    --note-color: #FF65B3;
    --tag-color: #ffae00;
}

body {
    margin: 0;
    background: ${p => p.theme.bgColor};
    color: ${p => p.theme.textColor};}


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
