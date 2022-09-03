const DOM={
  create:function(tagName, settings, parentElement){
    const element=document.createElement(tagName);
    this.modify(element, settings);
    if(parentElement instanceof Element || parentElement instanceof DocumentFragment){
      parentElement.appendChild(element);
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
    if(attributes.removes instanceof Array){
      attributes.removes.forEach((name)=>{
        element.removeAttribute(name);
      });
      delete attributes.removes;
    }
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
  },
  defineCustomElement(component) {
    const tag = `${customElementPrefix}-${component.tagName}`;
    if(!customElements.get(tag)) {
      customElements.define(tag, component);
    }
  }
};

const customElementPrefix = 'w';

export default DOM;