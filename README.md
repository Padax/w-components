# W-Components
Styled and Easy-to-Use Web Components  
Demo: https://padax.github.io/w-components/

### Get Started
Add a module script in your HTML file.
```
<script type="module">
  import wc from "./wc.js";
  wc.init();
</script>
```

### Button
Add a button.
```
<wc-button>Open</wc-button>
```

### Dialog
Add a dialog. Try to set attribute 'open' to true or false.
```
<wc-dialog open="false">
  <div slot="head" class="head">這是標題</div>
  <div slot="main" class="main">
    大家好，我是彭彭。
  </div>
</wc-dialog>
```

### Calendar
Add a calendar
```
<wc-calendar></wc-calendar>
```
