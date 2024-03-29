const LightThemeStylesheet=`
:root {
  /* Font Family */
  --font-family:-apple-system, "Segoe UI", "Roboto", "San Francisco", "Helvetica", sans-serif;

  font-family:var(--font-family);

  /* Colors */
  --color-gray-0:#FFFFFF;
  --color-gray-0-button:#FFFFFF;
  --color-gray-10:#F2F5F7;
  --color-gray-20:#E6E8EB;
  --color-gray-30:#D4D7D9;
  --color-gray-40:#B8BBBF;
  --color-gray-50:#939699;
  --color-gray-60:#787C80;
  --color-gray-70:#606366;
  --color-gray-80:#46494D;
  --color-gray-90:#2F3133;
  --color-gray-100:#222426;

  --color-primary-10:#E6F2FF;
  --color-primary-20:#B2D8FE;
  --color-primary-30:#7FBFFE;
  --color-primary-40:#4DA6FF;
  --color-primary-50:#1A8CFF;
  --color-primary-60:#0079F2;
  --color-primary-70:#0066CC;
  --color-primary-80:#0053A6;
  --color-primary-90:#00468C;
  --color-primary-100:#003366;

  --color-critical-10:#FFE6E0;
  --color-critical-20:#FFC9BC;
  --color-critical-30:#FFAD99;
  --color-critical-40:#EB6B4B;
  --color-critical-50:#E04B26;
  --color-critical-60:#CC2900;
  --color-critical-70:#A32100;
  --color-critical-80:#871B00;
  --color-critical-90:#691500;
  --color-critical-100:#4D0F00;

  --color-warning-10:#FFF2CC;
  --color-warning-20:#FFDC73;
  --color-warning-30:#FFBF00;
  --color-warning-40:#F0B400;
  --color-warning-50:#E0A800;
  --color-warning-60:#B38600;
  --color-warning-70:#8C6900;
  --color-warning-80:#735600;
  --color-warning-90:#594300;
  --color-warning-100:#4D3900;

  --color-success-10:#DDFFCC;
  --color-success-20:#A9EF86;
  --color-success-30:#79DE47;
  --color-success-40:#52CC15;
  --color-success-50:#40BF00;
  --color-success-60:#439919;
  --color-success-70:#3B8019;
  --color-success-80:#267300;
  --color-success-90:#226600;
  --color-success-100:#194D00;

  color: var(--color-gray-100);

  /* Box Shadow */
  --box-shadow-10:0px 1px 1px rgba(70, 73, 77, 0.2), 0px 1px 8px rgba(70, 73, 77, 0.1);
  --box-shadow-20:0px 2px 2px rgba(70, 73, 77, 0.2), 0px 2px 12px rgba(70, 73, 77, 0.15);
  --box-shadow-30:0px 3px 3px rgba(70, 73, 77, 0.2), 0px 3px 16px rgba(70, 73, 77, 0.2);

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
export default LightThemeStylesheet;