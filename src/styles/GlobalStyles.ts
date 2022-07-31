import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
   font-family: "Noto Sans KR", system, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "애플 SD 산돌고딕 Neo", sans-serif, serif;
 }
/*  h1{
   font-family: 'GothicA1-Black', sans-serif;
 }
 button {
  font-family: 'GothicA1-Medium', sans-serif;
 } */
 #root, html, body {
   height: 100%;
 }
 ul{
  list-style: none;
 }
 a {
  text-decoration: none;
 }
 button, svg, input, select, label, li {
  cursor: pointer;
 }
`;

export default GlobalStyles;
