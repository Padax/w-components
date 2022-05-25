import { DOM } from "../../WComponent.js";
import Dialog from "./Dialog.js";

const stylesheet=``;

class ConfirmDialog extends Dialog{
  static tagName = 'cofirm-dialog';
  
  constructor(){
    super();
  }
  init(){
    super.init();
  }
  open(handler, color="primary"){
    super.open({
      title:"",
      actions:{
        primary:{
          handler, color
        },
        secondary:{
          color
        }
      }
    })
  }
}
ConfirmDialog.prototype.stylesheet+=stylesheet;

DOM.defineCustomElement(ConfirmDialog);

export default ConfirmDialog;