const DOM={
  create:function(tagName, settings, element, mode = this.CREATE_MODE.APPEND){
    const createdElement=document.createElement(tagName);
    this.modify(createdElement, settings);
    if(element instanceof Element || element instanceof DocumentFragment){
      if(mode === this.CREATE_MODE.APPEND) {
        element.appendChild(createdElement);
      } else if(mode === this.CREATE_MODE.BEFORE) {
        element.before(createdElement);
      } else if(mode === this.CREATE_MODE.AFTER) {
        element.after(createdElement);
      }
    }
    return createdElement;
  },
  createAfter:function(tagName, settings, siblingElement){
    const element=document.createElement(tagName);
    this.modify(element, settings);
    if(siblingElement instanceof Element || siblingElement instanceof DocumentFragment){
      siblingElement.after(element);
    }
    return element;
  },
  modify:function(element, settings){
    if(!settings) { return element; }
    
    if(settings.props){
      this.setProperties(element, settings.props);
    }
    if(settings.attrs){
      this.setAttributes(element, settings.attrs);
    }
    if(settings.styles){
      this.setStyles(element, settings.styles);
    }
    if(settings.events){
      this.addListeners(element, settings.events);
    }
    return element;
  },
  replace:function(element, parentElement){
    if(parentElement instanceof Element || parentElement instanceof DocumentFragment){
      parentElement.appendChild(element);
    }
    return element;
  },
  setProperties:function(element, properties){
    for(const name in properties){
      element[name]=properties[name];
    }
    return element;
  },
  setAttributes:function(element, attributes){
    for(const name in attributes){
      element.setAttribute(name, attributes[name]);
    }
    return element;
  },
  setStyles:function(element, styles){
    for(const name in styles){
      element.style[name]=styles[name];
    }
    return element;
  },
  addListeners:function(element, listeners, useCapture){
    for(const name in listeners){
      if(listeners[name] instanceof Array){
        listeners[name].forEach((handler)=>{
          element.addEventListener(name, handler, useCapture);
        });
      }else{
        element.addEventListener(name, listeners[name], useCapture);
      }
    }
    return element;
  }
};
DOM.CREATE_MODE = {
  APPEND: 'APPEND',
  BEFORE: 'BEFORE',
  AFTER: 'AFTER'
};
export default DOM;