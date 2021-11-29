const DarkThemeStylesheet=`
@font-face {
  font-family:"Icons";
  src:url("https://padax.github.io/w-components/wc/theme/icon-font.ttf") format("truetype");
}
@font-face {
  font-family:"Icons-Filled";
  src:url("https://padax.github.io/w-components/wc/theme/icon-font-filled.ttf") format("truetype");
}
:root {
  /* Font Family */
  --font-family:-apple-system, "Segoe UI", "Roboto", "San Francisco", "Helvetica", sans-serif;

  font-family:var(--font-family);

  /* Colors */
  --color-gray-100:#FFFFFF;
  --color-gray-90:#F2F5F7;
  --color-gray-80:#E6E8EB;
  --color-gray-70:#D4D7D9;
  --color-gray-60:#B8BBBF;
  --color-gray-50:#939699;
  --color-gray-40:#787C80;
  --color-gray-30:#606366;
  --color-gray-20:#46494D;
  --color-gray-10:#2F3133;
  --color-gray-0:#222426;

  --color-primary-100:#E6F2FF;
  --color-primary-90:#B2D8FE;
  --color-primary-80:#7FBFFE;
  --color-primary-70:#4DA6FF;
  --color-primary-60:#1A8CFF;
  --color-primary-50:#0079F2;
  --color-primary-40:#0066CC;
  --color-primary-30:#0053A6;
  --color-primary-20:#00468C;
  --color-primary-10:#003366;

  --color-critical-100:#FFE6E0;
  --color-critical-90:#FFC9BC;
  --color-critical-80:#FFAD99;
  --color-critical-70:#EB6B4B;
  --color-critical-60:#E04B26;
  --color-critical-50:#CC2900;
  --color-critical-40:#A32100;
  --color-critical-30:#871B00;
  --color-critical-20:#691500;
  --color-critical-10:#4D0F00;

  --color-warning-100:#FFF2CC;
  --color-warning-90:#FFDC73;
  --color-warning-80:#FFBF00;
  --color-warning-70:#F0B400;
  --color-warning-60:#E0A800;
  --color-warning-50:#B38600;
  --color-warning-40:#8C6900;
  --color-warning-30:#735600;
  --color-warning-20:#594300;
  --color-warning-10:#4D3900;

  --color-success-100:#DDFFCC;
  --color-success-90:#A9EF86;
  --color-success-80:#79DE47;
  --color-success-70:#52CC15;
  --color-success-60:#40BF00;
  --color-success-50:#439919;
  --color-success-40:#3B8019;
  --color-success-30:#267300;
  --color-success-20:#226600;
  --color-success-10:#194D00;

  color: var(--color-gray-100);

  /* Font Size */
  --font-size-small: 14px;
  --font-size-normal: 16px;
  
  font-size: var(--font-size-normal);

  /* Font Weight */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;
  
  font-weight: var(--font-weight-regular);

  /* Line Height */
  --line-height-normal-ratio: 1.5;
  --line-height-normal: calc(1rem * var(--line-height-normal-ratio));
  
  line-height: var(--line-height-normal);

  /* Icon Font*/
  --icon-font-regular: 'Icons';
  --icon-font-filled: 'Icons-Filled';
  --icon-font-size: 1.5rem;
}
body{
  margin:0px;
}
a{
  color:var(--color-primary-60);
  text-decoration:none;
}
a:hover, a:active{
  text-decoration:underline;
}
`;
export default DarkThemeStylesheet;