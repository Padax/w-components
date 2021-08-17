import { createWBaseComponent } from "../../WComponent.js";

class WInputComponent extends createWBaseComponent(HTMLInputElement, false) {
  static defaultValues = {
    checked: false,
    disabled: false
  };

  constructor() {
    super();
  }

}
export default WInputComponent;