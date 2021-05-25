const DOM={
	create:function(tagName, settings, parentElement){
		const element=document.createElement(tagName);
		this.modify(element, settings);
		if(parentElement instanceof Element || parentElement instanceof DocumentFragment){
			parentElement.appendChild(element);
		}
		return element;
	},
	modify:function(selectorOrElement, settings){
		const element=(typeof selectorOrElement==="string"?this.get(selectorOrElement):selectorOrElement);
		if(settings.prps){
			this.setProperties(element, settings.prps);
		}
		if(settings.atrs){
			this.setAttributes(element, settings.atrs);
		}
		if(settings.stys){
			this.setStyles(element, settings.stys);
		}
		if(settings.evts){
			this.addListeners(element, settings.evts);
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
	addListeners:function(selectorOrElement, listeners, useCapture){
		const element=(typeof selectorOrElement==="string"?this.get(selectorOrElement):selectorOrElement);
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
export default DOM;