#Micro.js documentation

####[Commands](https://github.com/PDKnight/Micro.js/blob/master/commands.md)

####Components
To use an a component, you have to keep this structure:
```html
component (optional_properties) [content]
```
Note that `style` and `script` tags are denied.

To avoid the code, use a backslash before like `b [text]\]`.

####Comments
To write a comment use `#` character.
```html
a [
    Micro.js will render this code. # But this not.
]
```
Simple. Everything after the hashtag will be hidden.

####Properties
Since v1.2 there was added ability to use properties for components. Here's the example how the property should be written:
```html
component (property: value) [content]
```
Note that you can use as much spaces and new lines as you wish. This code below is valid as well:
```html
element (
    property: value
    another-property: value
) [content]
```
#####Difference between CSS properties and HTML attributes
**[W3Schools - CSS Reference](http://www.w3schools.com/cssref/)**

In Micro.js are CSS properties and HTML attributes written as properties of element, so you can combine them together. This code below will print a red link to `https://github.com/PDKnight/Micro.js`:
```html
a (
    color: red
    href:https://github.com/PDKnight/Micro.js
) [Micro.js framework]
```
Pretty easy, isn't it? There are some elements that **have the same CSS property as HTML element**. To avoid this problem you have to prefix your property with `!` to tell `Micro.js` it's an attribute:
```html
table (!border:1) [ # border: 1 will set a CSS border property, 
                    # so if we want to be border as attribute we use `!` at the start.
    tr [
        td [I'm a cell!]
    ]
]
```

####Custom properties
You have also ability to use custom properties. Here's list of all the custom properties: 
* fixed - on/off (only for menu)
* transparent - on/off (only for menu)
* hidden - on/off
* align - left/center/right
* box - white/black
* block-type - compact/box
* padding-type - s/m/l/xl/xxl
* margin-type - s/m/l/xl/xxl
* radius - s/m/l/xl/xxl/full
* type:
 * for buttons - success/error/warning/info
 * for divs (table layout system) - t-12/t-6/t-4/t-3/t-2/t-1/t-row
Example:
```html
Example: 
title ( 
    block-type: compact 
    padding-type: xxl 
    color: khaki 
    background: rgba(0, 0, 0, 0.27) 
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15) inset 
) [ 
    Micro.js 
] 
```

---

###Imports, Titles & Favicons
####Import
* Imports `.css` or `.js` file.
```html
@import file
```
Note that file must have `.css` or `.js` extension.

####Title
* Changes page title.
```html
@title Page title
```

####Favicon
* Changes page favicon image. Supports all image extensions.
```html
@favicon link/to/your/favicon.png
```

Simple? I think so.

---

###Components
Components are the best part of the whole framework. They shorten your code alot. You can use them whenever you want, but you have to download and include [components.css](https://github.com/PDKnight/Micro.js/blob/master/src/assets/components.css) file as well. To use them, keep the following structure:
```html
@import path/to/components.css
# Your code...
component-name (optional_properties) [content]
another-component (optional_properties) [content]
```
####Available components:
* dark
* menu
* menu-brand
* menu-item
* clear
* grand
* grand-content
* title
* sub-title
* code
* middle
* sh

####Example:
```html
@import ../assets/components.css
menu [
    # Your code...
    menu-brand(src:http://pdknight.github.io/Micro/img/logo.png)[]
    menu-item [Home]
    menu-item [About us]
]
```
![Example result](http://i.imgur.com/v8FzfmF.png)

---

### Options
You can use options for your .mi file. They go to the start of the file and they have the following structure:
```html
@option: value
```
| Option | Value | Description |
|---------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| console\_output | on, off | Checks if the debug code will be printed to console. In case you have a bug report for the author please turn on the console_output in the start of the file. |
| remove\_spaces\_at\_start | on, off | Removes 4 spaces or a tab at the start of the line of the text which is inside the component. |
