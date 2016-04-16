## [v1.4](https://github.com/PDKnight/Micro.js/blob/81fe7a4cf9215b2f38ae36633f36296a3214b098/src/micro.js) *(commands update)*
* Changed use of `Micro.read` function.
* Now you can use AJAX request with `Micro.getResponse()`.
* Added custom property for `grand`: full.
* Added `upbar` component with property `type` (success, error, warning, info)
* Added `upbar-container` component.
* Added `container` component.
* **Added commands!**
* Added ability to use commands in properties.
* Added get, echo, rand, def, set-cookie, get-cookie, eval, exec, upper, lower, capitalize, reverse, newline, repeat, end-repeat, if and end-if commands.
* Added ability to use variables in code with `@variableName`.
* Added option to use commands inside commands.

## [v1.3](https://github.com/PDKnight/Micro.js/blob/7a332545c58d7b7115842cef1c3c0129be012a2f/src/micro.js) *(components update)*
* **Added more components!**
* **Added custom properties!**
* Added ability to use `m-enable="this"`.
* Added `@favicon` statement.
* Fixed website loading.
* *Bugfix #14:* `\ncomponent_name (a:b) [c]`
* *Bugfix #15:* bug with trimming tag names.
* *Bugfix #16:* `(a) b c[`
* *Bugfix #17:* `a b[(c)] d`
* *Bugfix #18:* `. b[]`

## [v1.2.5](https://github.com/PDKnight/Micro.js/blob/2f22626e4d2cfff903606f41dc37dea802d80081/src/micro.js) *(bugfix update)*
* **Added components!**
* Added `@import` statement.
* Added `@title` statement.
* Better browser support.
* Denied `style` and `script` elements.
* *Bugfix #4:* `* [x]`
* *Bugfix #5:* `a (b:#c) [d]`
* *Bugfix #6:* `a [b]\nc[d]`
* *Bugfix #7:* `a (b: rgb(0,0,0,1)) [c]`
* *Bugfix #8:* `@\na [b]`
* *Bugfix #9:* `@\na`
* *Bugfix #10:* `@console_output: o` - now console_output supports only on/of and true/false states.
* *Bugfix #11:* `#@console_output: on`
* *Bugfix #12:* `a (b)(c)`
* *Bugfix #13:* `([b`

And many more...

## [v1.2](https://github.com/PDKnight/Micro.js/blob/34e1b847b2cd6e015ac9d437b67cff6e3f93b843/src/micro.js) *(properties update)*
* Added `Micro.render()` and `Micro.read()` functions. Now you can easily convert .mi text to HTML with only one command.
* **Added properties for elements!**
* Added '!' prefix for element properties.
* Added more console.log() outputs for easier code debug.
* Completely changed the rendering system.
* Changed system of error functions.
* *Bugfix #3:* Tons of bugfixes.

## [v1.1](https://github.com/PDKnight/Micro.js/blob/c66f924bcd0591484c4ce43b6677774849e8deb2/src/micro.js)
* Added polyfills.
* Added error function.
* Added `\[` and `\]` statements.
* Added properties.
* Changed XHR messages.
* Changed `A.new()` and `get()` functions due to es5.
* Removed unwanted comments.
* *Bugfix #2:* Lots of bugfixes.

## v1.0
* Added appender.
* *Bugfix #1:* Bugfixes.

## v0.1
* Initial release.
