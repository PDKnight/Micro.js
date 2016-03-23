# Micro.js
`v1.2 - SNAPSHOT`

Micro.js, simple and easy to use framework made by PDKnight.

### [Try it yourself!](http://pdknight.github.io/Micro/tester)

## Features:
### Compatibility
Works with every browser.
### Simple syntax
For example, if we want to create a `header` element we can do
```html
header [this text is inside a header!]
```
Pretty easy, huh? It's more simple than it seems like. 

## Syntax
### Components
How to write components? Let's use a primitive `b` tag:
```html
b [This is a text.]
```
![Result](http://i.imgur.com/liUm0EM.png)

To use a component, you have to keep this structure:
```html
component(space needed)[content (new components or text)]
```
For now are allowed all the HTML tags.

#### Examples
```
b [text]
```
Is valid.
```
b[text]
```
Is not valid, because there's not at least one whitespace character (space, tab etc.) between `b` and left square bracket.
```
b
[text]
```
Is not valid for now, because there's a linebreak between `b` and left square bracket.
```
b [text]]
```
Is not valid, because your code contains extra closing square bracket.

To avoid the code, use a backslash before like `b [text]\]`.

#### Comments
To write a comment use `#` character.
```html
a [
	text # This is a comment.
]
```
Simple. Everything after the hashtag will be hidden.

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

### Custom render
In the versions 1.2 and newer you can render your code with `render(text, element)` function:
```javascript
Micro.render('h1 [Hello, world!]', document.body); // Will render big header in body element.
```

### Debugging
In the case `micro.js` will print an error, find it in the table below:

| Error | Description | Example | Solution |
|-----------------------------------------------------------|--------------------------------------|------------------------|-----------------------|
| There's an unwanted closing parenthesis in your .mi file. | You have somewhere an extra `]`. | `a [b]]` | `a [b]` |
| Unknown property: [property]. | Micro.js doesn't know your property. | `@console_outputt: on` | `@console_output: on` |

If not, then keep these steps:

1. First of all, turn `console_output` to `on` in your `.mi` file.
2. Press `F12` key to open browser DEV tools.
3. Refresh your page.
4. Copy the output in the **console** tab in your DEV tools.
5. Create a new post in **issues** section with code included.
6. That's it!
