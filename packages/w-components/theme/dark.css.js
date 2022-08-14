const DarkThemeStylesheet=`
:root {
  /* Font Family */
  --font-family:-apple-system, "Segoe UI", "Roboto", "San Francisco", "Helvetica", sans-serif;

  font-family:var(--font-family);

  /* Colors */
  --color-gray-100:#E5F2FF;
  --color-gray-90:#CEE0F2;
  --color-gray-80:#B8CFE5;
  --color-gray-70:#99B2CC;
  --color-gray-60:#7D98B2;
  --color-gray-50:#637E99;
  --color-gray-40:#4D6680;
  --color-gray-30:#384F66;
  --color-gray-20:#26394D;
  --color-gray-10:#172533;
  --color-gray-0:#0F1B26;

  --color-primary-100:#B2D9FF;
  --color-primary-90:#7FBEFE;
  --color-primary-80:#4CA5FE;
  --color-primary-70:#1A8CFF;
  --color-primary-60:#0079F2;
  --color-primary-50:#006CD9;
  --color-primary-40:#0059B2;
  --color-primary-30:#004D99;
  --color-primary-20:#004080;
  --color-primary-10:#003366;

  --color-critical-100:#FFC2B2;
  --color-critical-90:#FF9980;
  --color-critical-80:#FF704D;
  --color-critical-70:#E54017;
  --color-critical-60:#CC2900;
  --color-critical-50:#BF2600;
  --color-critical-40:#B22400;
  --color-critical-30:#991F00;
  --color-critical-20:#801900;
  --color-critical-10:#661400;

  --color-warning-100:#FFECB2;
  --color-warning-90:#FFDF80;
  --color-warning-80:#FFD24D;
  --color-warning-70:#FFC61A;
  --color-warning-60:#FFBF00;
  --color-warning-50:#D9A300;
  --color-warning-40:#B28600;
  --color-warning-30:#997300;
  --color-warning-20:#806000;
  --color-warning-10:#664D00;

  --color-success-100:#C7E5B8;
  --color-success-90:#97D678;
  --color-success-80:#7FC75B;
  --color-success-70:#65BD39;
  --color-success-60:#4FB21D;
  --color-success-50:#37A600;
  --color-success-40:#339900;
  --color-success-30:#2F8C00;
  --color-success-20:#267300;
  --color-success-10:#226600;

  color: var(--color-gray-100);

  /* Box Shadow */
  --box-shadow-10:0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 8px rgba(0, 0, 0, 0.1);
  --box-shadow-20:0px 0px 2px 2px rgba(0, 0, 0, 0.2), 0px 2px 12px rgba(0, 0, 0, 0.15);
  --box-shadow-30:0px 0px 3px 3px rgba(0, 0, 0, 0.2), 0px 3px 16px rgba(0, 0, 0, 0.2);

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