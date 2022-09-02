import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=``;
class Camera extends WComponent{
  static title = 'Camera';
  static description = 'Access device\'s camera video.';
  static tagName = 'camera';
  static attributes = {
    width: {
      name: 'width', defaultValue: 640, min: 480, max: 4096,
      possibleValues: '{480,720,10}',
      parser: (value, attr) => AttributeParser.parseIntAttr(
        value, attr.defaultValue, attr.min, attr.max
      )
    },
    height: {
      name: 'height', defaultValue: 480, min: 320, max: 2160,
      possibleValues: '{320,480,10}',
      parser: (value, attr) => AttributeParser.parseIntAttr(
        value, attr.defaultValue, attr.min, attr.max
      )
    },
    autoplay: {
      name: 'autoplay', defaultValue: true,
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static methods = {
    start: {
      name: 'start', args: null
    },
    stop: {
      name: 'stop', args: null
    },
    pause: {
      name: 'pause', args: null
    },
    takePicture: {
      name: 'takePicture', args: new Map([
        ['options', {
          required:false,
          type:"object",
          format:{
            download:'true|false'
          }
        }]
      ])
    }
  };
  static childComponents = null;
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  init(){
    this.root=DOM.create('div', {}, this.shadowRoot);
    this.video=null;
    if(this.autoplay){
      this.start();
    }
  }
  update({ name, newValue } = {}){
    const value=this.parseAttributeValueByName(name, newValue);
    switch(name){
      case 'width':
      case 'height':
        this[name]=value;
        if(this.video!==null){
          this.video[name]=value;
        }
        break;
    }
  }
  start(){
    if(this.video===null){
      window.navigator.mediaDevices.getUserMedia({audio:false, video:true}).then((stream)=>{
        DOM.modify(this.root, {props:{textContent:''}});
        this.video=DOM.create('video', {props:{
          width:this.width, height:this.height
        }}, this.root);
        this.video.srcObject=stream;
        this.video.play();
      }).catch((e)=>{
        DOM.modify(this.root, {props:{textContent:e}});
      });
    }else{
      this.video.play();
    }
  }
  stop(){
    if(this.video===null){
      return;
    }
    this.video.srcObject.getTracks().forEach(function(track) {
      if(track.readyState==='live'){
        track.stop();
      }
    });
    this.video.srcObject=null;
    this.video.remove();
    this.video=null;
  }
  pause(){
    if(this.video===null){
      return;
    }
    this.video.pause();
  }
  takePicture(options={}){
    if(this.video===null){
      return;
    }
    const ctx=DOM.create('canvas', {props:{
      width:this.video.width, height:this.video.height
    }}).getContext('2d');
    ctx.drawImage(this.video, 0, 0);
    if(options.download){
      ctx.canvas.toBlob((blob)=>{
        const url=URL.createObjectURL(blob);
        const link=DOM.create('a', {props:{
          download:`picture-${Date.now()}.jpg`, href:url
        }});
        link.click();
      }, 'image/jpeg');
    }else{
      return new Promise((resolve, reject)=>{
        try{
          ctx.canvas.toBlob((blob)=>{
            resolve(blob);
          }, 'image/jpeg');
        }catch(e){
          reject(e);
        }
      });
    }
  }
}
Camera.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(Camera);

export default Camera;