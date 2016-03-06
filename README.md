# Micro.js
`v1.1 - SNAPSHOT`

Micro.js, simple and easy to use framework made by PDKnight.

## Features:
### Simple syntax
For example, if we want to create a `header` element we can do
```html
header [this text is inside a header!]
```
Pretty easy, huh? It's more simple than it seems like. 

Now let's try something other. What about this code:
```html
a [
    b [ i [this is simple table!]]
    <table border="1">
        tr [
            td [first!]
            td [second!]
        ]
    </table>
]
```
`Micro.js` will print this:

![Result](http://i.imgur.com/e7i9h1M.png)
