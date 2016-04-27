![Micro.js logo](http://pdknight.github.io/Micro/img/logo2.png)

`v1.4.5`

Micro.js, simple and easy to use framework made by PDKnight.

> #[Documentation](https://github.com/PDKnight/Micro.js/blob/master/docs.md)

####[Try it yourself!](http://pdknight.github.io/Micro/tester)
####[Example of Micro.js website](http://pdknight.github.io/Micro/example)

![Micro.js tester](http://i.imgur.com/UEWpyii.png)
![Commands](http://i.imgur.com/6X5C1Q5.png)

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
###Simple syntax
Literally. Look at this example:
```html
Hello, b [world]!
```
###Custom functions
#####Micro.read(fn, text, [show_miliseconds])
Converts Micro.js text to HTML.
* Arguments:
 * **fn**: Function where will be the result parsed.
 * **text**: Text to convert to HTML.
 * **show\_miliseconds (optional)**: If set to true, framework will output an array: `[miliseconds, converted_text]`.

Example:
```javascript
Micro.read(function(r) {
    console.log(r);
}, 'h1 [Hello, world!]', true); // Will print to the console: [1, "<h1>Hello, world!</h1>"]
```

#####Micro.render(text, element, [element2])
Renders the text.
* Arguments:
 * **text**: Text to convert to HTML.
 * **element**: Element to write the result HTML.
 * **element2 (optional)**: Element to write time it took Micro.js to process the text.

Example:
```javascript
Micro.render('h1 [Hello, world!]', document.body); // Will render big header in body element.
```

#####Micro.getResponse(url, fn, err, bool)
Makes an AJAX request.
* Arguments:
 * **url**: A path to the file you want to get contents from.
 * **fn**: Function there the response text will be send to.
 * **err**: Error function which will be called when there was an error while getting file.
 * **bool**: true (asynchronous) or false (synchronous)

Example
```javascript
Micro.getResponse('myFile.txt', function(response) {
    console.log('Succes!', response);
}, function(e) {
    console.log('AJAX failed :( Error message:', e);
}, true);
```
 

##Debugging
In the case `micro.js` will print an error, find it in the table below:

| Error | Description | Example | Solution |
|-----------------------------------------------------------|--------------------------------------|------------------------|-----------------------|
| There's an unwanted closing parenthesis in your .mi file. | You have somewhere an extra `]`. | `a [b]]` | `a [b]` |
| Unknown property: [property]. | Micro.js doesn't know your property. | `@console_outputt: on` | `@console_output: on` |
| Wrong syntax. Use pattern -> property: value. | You used wrong property pattern. | `a (b) [d]` | `a (b:c) [d]` |
| Unsupported property syntax: &lt;syntax&gt;. | You didn't use an alphanumeric property. | `a (*:y) [d]` | `a (x:y) [d]` |
| Please import only .css or .js file(s). | Your import file doesn't end with `css` or `.js` extension. | `@import x` | `@import x.css` |
| Unknown command statement: &lt;statement&gt; | Your command statement is invalid. | `{echo}` | `{echo: a}` |
| File named &lt;name&gt; doesn't exist. | The file used with `get command` doesn't exist. |  | Check your file path. |
| Correct syntax: rand a b ... n | There must be at least one argument. | `{rand a}` | `{rand a b}` |
| Correct syntax: def a b | Invalid syntax. | `{def a}` | `{def a b}` |
| Only alphanumeric words (with optional hyphen) are supported. |  | `{def * b}` | `{def a b}` |
| Correct syntax: set-cookie name value. |  | `{set-cookie a}` | `{set-cookie a b}` |
| Correct syntax: repeat count [optional command]. |  | `{repeat *}` | `{repeat 2 echo a}` |
| Count must be an integer. |  | `{repeat *}` | `{repeat 2}` |
| Count must be an integer. |  | `{repeat *}` | `{repeat 2}` |
| You can't end a repeat without starting it. |  | `{end-repeat}` | `{}` |
| Condition must contain one of operators (==, !=, >, >=, <, <=). |  | `{if a}` | `{if 1 < 2}` |
| You can compare only integers with < operator. |  | `{if a > b}` | `{if 1 < 2}` |
| You can't end a condition without starting it. |  | `{end-if}` | `{}` |
| Unknown command: &lt;command&gt; |  | `{a b}` | `{}` |
| Unsupported element: &lt;tagname&gt; | Your code contains `style` or `script` tag. | `style[]` | ` ` |

If not, then keep these steps:

1. Create a new post in **[issues](https://github.com/PDKnight/Micro.js/issues)** section with code **and version of Micro.js** included.
2. That's it!
