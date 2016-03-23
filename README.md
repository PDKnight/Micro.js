# Micro.js
`v1.2`

Micro.js, simple and easy to use framework made by PDKnight.

### [Try it yourself!](http://pdknight.github.io/Micro/tester)

## Features:
### Compatibility
Works with every browser.
### Syntax
#### Components
To use an a component, you have to keep this structure:
```html
component (element properties) [content]
```
For now are allowed all the HTML tags, but `style` and `script` tags won't affect the website for now.

To avoid the code, use a backslash before like `b [text]\]`.

#### Comments
To write a comment use `#` character.
```html
a [
	text # This is a comment.
]
```
Simple. Everything after the hashtag will be hidden.

#### Properties
Since v1.2 there was added ability to use properties for elements/components. Here's the example how the property should be written:
```html
element (property: value) [content]
```
Note that you can use as much spaces and new lines as you wish. This code below is valid as well:
```html
element (
	property: value
) [content]
```
##### Difference between CSS properties and HTML attributes
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
table (!border:1) [ # border: 1 won't work, because Micro.js thinks it's a CSS property :/
	tr [td [I'm a cell!]]
]
```

---


#### Options
You can use options for your .mi file. They go to the start of the file and they have the following structure:
```html
@option: value
```
| Option | Value | Description |
|---------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| console\_output | on, off | Checks if the debug code will be printed to console. In case you have a bug report for the author please turn on the console_output in the start of the file. |
| remove\_spaces\_at\_start | on, off | Removes 4 spaces or a tab at the start of the line of the text which is inside the component. |

#### Custom functions
##### Micro.read(text, [show_miliseconds])
Converts Micro.js text to HTML.
- text: Text to convert to HTML.
- show\_miliseconds (optional): If set to true, framework will output an array: `[miliseconds, converted_text]`.

Example:
```javascript
Micro.read('h1 [Hello, world!]', true); // Will print out: [1, "<h1>Hello, world!</h1>"]
```

##### Micro.render(text, element, [element2])
Renders the text.
- text: Text to convert to HTML.
- elmeent: Element to write the result HTML.
- element2 (optional): Element to write time it took Micro.js to process the text.

Example:
```javascript
Micro.render('h1 [Hello, world!]', document.body); // Will render big header in body element.
```

### Debugging
In the case `micro.js` will print an error, find it in the table below:

| Error | Description | Example | Solution |
|-----------------------------------------------------------|--------------------------------------|------------------------|-----------------------|
| There's an unwanted closing parenthesis in your .mi file. | You have somewhere an extra `]`. | `a [b]]` | `a [b]` |
| Unknown property: [property]. | Micro.js doesn't know your property. | `@console_outputt: on` | `@console_output: on` |
| Wrong syntax. Use pattern -> property: value. | You used wrong property pattern. | `a (b) [d]` | `a (b:c) [d]` |
| Unsupported property syntax: &lt;syntax&gt;. | You didn't use an alphanumeric property. | `a (*:y) [d]` | `a (x:y) [d]` |

If not, then keep these steps:

1. First of all, turn `console_output` to `on` in your `.mi` file.
2. Press `F12` key to open browser DEV tools.
3. Refresh your page.
4. Copy the output in the **console** tab in your DEV tools.
5. Create a new post in **issues** section with code included.
6. That's it!
