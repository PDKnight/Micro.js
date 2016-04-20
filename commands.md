#Commands
Since version `1.4` you can also use commands. This is how does basic command statement look like:
```html
{command arguments}
```
Multiline comments are allowed, too:
```html
{first args
second args}
```
Note that you can use as much spaces and linebreaks as you like, so this example is valid, too :)
```html
{
    first args
    second args
        third args
    fourth args
}
```

##Available commands

| Command | Description | Example | Note |
----------|-------------|---------|------|
| get | Gets contents of file. | `get ./myfile.txt` ||
| echo | Prints out the arguments. | `echo a b` ||
| rand | Chooses random option from arguments given. | `rand a b` ||
| def | Defines a property. | `define myVariable myValue` ||
| set-cookie | Sets a cookie. | `set-cookie name value` ||
| get-cookie | Gets the cookie. | `get-cookie name` ||
| eval | Evaluates the arguments and prints out the result. | `eval 1 + 2` | Use only JavaScript code as arguments. |
| exec | Executes the code and **doesn't** print the result. | `eval alert('Hello, world!')` | Use only JavaScript code as arguments. |
| upper | Uppercases the text. | `upper hello` ||
| lower | Lowercases the text. | `lower HelLO` ||
| capitalize | Capitalizes the text. | `capitalize this is some text.` ||
| reverse | Reverses the text. | `reverse hello!` ||
| newline | Prints a new line. | `newline` ||
| repeat | Starts a repeat. | `repeat 2 echo test` | Uses to be in form `repeat count [optional command]` |
| end-repeat | Ends the repeat. | `end-repeat` ||
| if | Starts a condition. | `if 10 > 5` ||
| end-if | Ends the condition. | `end-if` ||


##Variables
Variables could be defined with `def` command. To use them type `@variable-name`. Example:
```html
{
    def name value
    echo @name
}
```
Output:
```html
value
```

##Repeat
To repeat some text multiple times use `repeat` and `end-repeat` commands.
###One-line repeat
You **do not** need `end-repeat` command.
Syntax: 
```html
repeat count command arguments
```
Example:
```html
repeat 5 rand one two three four
```
Output:
```html
threetwothreethreetwo
```
###Repeat in more lines
You **need** `end-repeat` command.
Syntax:
```html
repeat count
    command args
    another-command args
end-repeat
```
Example:
```html
repeat 50
    rand 0 1
end-repeat
```
Output:
```html
11111101011001001100110111010001101011001100111110
```

##Conditions
In case of conditions you have to use one of the following operators:
* == - equal
* != - not equal
* < - lower than
* <= - lower or equal
* > - greater than
* >= - greater or equal

You have to use `end-if` command.
Syntax:
```html
if arg1 operator arg2
    command args
    another-command args
end-if
```
Example:
```html
if 5 < 10
    echo works!
end-if
```
Output:
```html
works!
```

##Commands inside commands
The great thing on Micro.js commands is that you can execute a command inside another command. To do it do following:
```html
command {command args}
```
Example:
```html
set-cookie count 5 # set count to 5
repeat {get-cookie count}
    echo works!
    newline
end-repeat
```
Output:
```html
works!
works!
works!
works!
works!
```
You can use them everywhere in Micro.js code. Really. For example, this code will choose random background for a website:
```html
grand (
    type: full
    z-index: 9999
) [
    grand-content (
        background:url({rand first-bg.png second-bg.png})
        background-size: cover
    ) []
]
```
