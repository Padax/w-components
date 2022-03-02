import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
import Dialog from "./Dialog.js";
const stylesheet=``;
class AlertDialog extends Dialog{
  constructor(){
    super();
  }
  init(){
    super.init();
  }
  open(){
    super.open({
      title:"",
      actions:{
        primary:{
          color:"critical"
        }
      }
    })
  }
}
AlertDialog.prototype.stylesheet+=stylesheet;
export default AlertDialog;