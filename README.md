![Micro.js logo](http://pdknight.github.io/Micro/img/logo2.png)

`v1.3`

Micro.js, simple and easy to use framework made by PDKnight.

###[Try it yourself!](http://pdknight.github.io/Micro/tester)
###[Example of Micro.js website](http://pdknight.github.io/Micro/example)

![Micro.js tester](http://i.imgur.com/UEWpyii.png)

##Install
* Download [the latest minified version](https://github.com/PDKnight/Micro.js/blob/master/src/micro.min.js) of micro.js file.
* Include it in your HTML file and enable Micro.js for an element (for example `body`) with `m-enable` attribute: 
```html
<body m-enable="path/to/your/index">
    <script src="path/to/your/micro.min.js"></script>
</body>
```
* That's it! Now you can edit your .mi file and watch the magic! :)

Note: you don't have to put .mi at the end of the `m-enable` attribute, so if we use `index`, Micro.js tries to find `index.mi` file.

##Features:
###Compatibility
Works with every browser.
###Syntax
### Custom functions
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

## Debugging
In the case `micro.js` will print an error, find it in the table below:

| Error | Description | Example | Solution |
|-----------------------------------------------------------|--------------------------------------|------------------------|-----------------------|
| There's an unwanted closing parenthesis in your .mi file. | You have somewhere an extra `]`. | `a [b]]` | `a [b]` |
| Unknown property: [property]. | Micro.js doesn't know your property. | `@console_outputt: on` | `@console_output: on` |
| Wrong syntax. Use pattern -> property: value. | You used wrong property pattern. | `a (b) [d]` | `a (b:c) [d]` |
| Unsupported property syntax: &lt;syntax&gt;. | You didn't use an alphanumeric property. | `a (*:y) [d]` | `a (x:y) [d]` |
| Please import only .css or .js file(s). | Your import file doesn't end with `css` or `.js` extension. | `@import x` | `@import x.css` |

If not, then keep these steps:

1. First of all, turn `console_output` to `on` in your `.mi` file.
2. Press `F12` key to open browser DEV tools.
3. Refresh your page.
4. Copy the output in the **console** tab in your DEV tools.
5. Create a new post in **[issues](https://github.com/PDKnight/Micro.js/issues)** section with code included.
6. That's it!
