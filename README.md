# W-Components
Styled and Easy-to-Use Web Components  
Demo: https://padax.github.io/w-components/

## Get Started
Add a module script in your HTML file.
```
<script type="module">
  import wc from "./wc.js";
  wc.init();
</script>
```

## Basic

### Heading
Add a heading.
```
<wc-heading level="1" underlined="true>This is a heading.</wc-heading>
```

### HyperLink
Add hyperlinks.
```
<wc-link href="https://github.com/Padax/w-components">Link</wc-link>
<wc-link target="_blank" href="https://github.com/Padax/w-components">
  <img src="https://training.pada-x.com/images/ntu.png" width="30" height="30" />
</wc-link>
```

### Button
Add a button.
```
<wc-button>Open</wc-button>
```

### List

### Code

## Form

## Integrated

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
