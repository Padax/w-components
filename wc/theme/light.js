const sharedStylesheet=`
  a{
    color:var(--color-primary-60);
    text-decoration:none;
  }
  a:hover, a:active{
    text-decoration:underline;
  }
  input[is="w-checkbox"], input[is="w-radio"] {
    width: 0; hieght: 0;
    margin: 0;
  }
`;
export default sharedStylesheet;