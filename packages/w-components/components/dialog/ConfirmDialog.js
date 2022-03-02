import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
import Dialog from "./Dialog.js";
const stylesheet=``;
class ConfirmDialog extends Dialog{
  constructor(){
    super();
  }
  init(){
    super.init();
  }
  open(handler){
    super.open({
      title:"",
      actions:{
        primary:{
          handler
        },
        secondary:{}
      }
    })
  }
}
ConfirmDialog.prototype.stylesheet+=stylesheet;
export default ConfirmDialog;