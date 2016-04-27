/* ********************************************************* *\
|  Micro.js framework made by PDKnight. All rights reserved.  |
|               For more information please visit             |
|             https://github.com/PDKnight/Micro.js.           |
\* ********************************************************* */

// Use strict!
'use strict';
/*@cc_on @*/

/*** POLYFILLS **********************************************

/* 
 * Mozilla's bind() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind 
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype; 
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}
if (typeof window.console !== 'object') {
    window.console = {
        log: function() {}
    };
}
if (!String.prototype.startsWith)
    String.prototype.startsWith = function(s) {
        return this.indexOf(s) == 0;
    }
if (!String.prototype.endsWith)
    String.prototype.endsWith = function(s) {
        return this.indexOf(s) == this.length - 1 - s.length;
    }
if (!String.prototype.escape)
    String.prototype.escape = function() {
        return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
if (!String.prototype.tr)
    String.prototype.tr = function() {
        return this.replace(/^\s*|\s*$/g,'');
    }
if (!Object.keys)
    Object.keys = function(obj) {
        var keys = [];
        for (var i in obj)
            if (obj.hasOwnProperty(i))
                keys.push(i);
        return keys;
    };
if (!Array.prototype.indexOf)
    Array.prototype.indexOf = function(obj, start) {
        for (var p = (start || 0), q = this.length; p < q; p++)
            if (this[p] === obj) return p;
        return -1;
    }

var Micro = new function() {
    this.e;
    this.version = '1.4.5';
    this.tooltip = {
        added: false,
        html: 'if(!Micro.tooltip.added){var e=document.createElement("div");e.id="ttDiv",e.style.position="fixed",e.style.color="white",e.style.fontSize="14px",e.style.background="rgba(25, 25, 25, 0.75)",e.style.padding="5px 12px",e.style.fontFamily="helvetica",e.style.borderRadius="2px",e.style.display="none",document.body.appendChild(e),Micro.addEvent(document,"mousemove",function(t){var i=t.target;if(e.style.display="none",i.hasAttribute("tooltip")){var n=i.getAttribute("tooltip");if(0!=n.length){var d={x:t.pageX+15,y:t.pageY+15,w:window.innerWidth-this.x,h:window.innerHeight-this.y};e.style.top=d.y+"px",e.style.left=d.x+"px",e.style.maxWidth=d.w+"px",e.style.maxHeight=d.h+"px",e.innerHTML=n,e.style.display=""}}},!1),Micro.addEvent(document,"mouseout",function(t){t=t?t:window.event;var i=t.relatedTarget||t.toElement;i&&"HTML"!=i.nodeName||(e.style.display="none")},!1),Micro.tooltip.added=!0}',
    };
    this.addEvent = function(e, n, fn) {
        if (e.addEventListener)
            e.addEventListener(n, fn, false);
        else if (e.attachEvent)
            e.attachEvent('on' + n, fn);
        else e['on' + n] = fn;
    };
    var d = document,
        sel = function(s, b) {
            return b ? d.querySelectorAll(s) : d.querySelector(s);
        },
        NO_XHR_MSG,XHR_FAILED_MSG;

    var c = sel('*', true),
        cs = [], p;
    for (p = 0; p < c.length; p++)
        if (c[p].hasAttribute('m-enable'))
            cs.push(c[p]);
    if (cs.length > 1) {
        throw new Error('Please use only one element with \'m-enable\' attribute!');
        return;
    } else if (cs.length == 1) this.e = cs[0];

    NO_XHR_MSG = 'Error: Your browser can\'t create an AJAX request. ';
    XHR_FAILED_MSG = 'Error: The AJAX failed. Check your console for more information. ';
    var createXHR = function () {
        if (typeof XMLHttpRequest!= "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject!="undefined") {
            if (typeof arguments.callee.activeXString!= "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                "MSXML2.XMLHttp"];
                                
                for (var i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (ex){
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            err(NO_XHR_MSG);
        }
    };
    this.getResponse = function(url, func, err, boole) {
        var xhr = createXHR(err),
            bool = typeof boole == 'undefined' ? true : boole;
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4) {
                if((xhr.status >= 200 && xhr.status < 300)
                        || xhr.status == 304) {
                    var allText = xhr.responseText;
                    if (typeof func != 'undefined')
                        func(allText, url);
                    else
                        return allText;
                } else {
                    err(XHR_FAILED_MSG 
                        + '  [status:'+xhr.status+']');
                }
            }
        }.bind(this)
        xhr.open("get", url, bool);
        xhr.send(null);
    }.bind(this);
    var Core = function() {
        var i,j;
        this.CSSprops = ['all','background','background-attachment','background-clip','background-color','background-image','background-origin','background-position','background-repeat','background-size','border','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-style','border-bottom-width','border-collapse','border-color','border-image','border-image-outset','border-image-repeat','border-image-slice','border-image-source','border-image-width','border-left','border-left-color','border-left-style','border-left-width','border-radius','border-right','border-right-color','border-right-style','border-right-width','border-spacing','border-style','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-style','border-top-width','border-width','bottom','box-shadow','text-shadow','caption-side','clear','clip','color','content','counter-increment','counter-reset','cursor','direction','display','empty-cells','float','font','font-family','font-size','font-size-adjust','font-stretch','font-style','font-synthesis','font-variant','font-weight','height','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','min-height','min-width','opacity','orphans','outline','outline-color','outline-style','outline-width','overflow','padding','padding-bottom','padding-left','padding-right','padding-top','page-break-after','page-break-before','page-break-inside','position','quotes','right','table-layout','text-align','text-decoration','text-indent','text-transform','top','transform','transform-origin','transition','transition-delay','transition-duration','transition-property','transition-timing-function','unicode-bidi','vertical-align','visibility','white-space','widows','width','word-spacing','z-index'];
        this.C = { // Composer
            createElement: function(s) {
                return d.createElement(s);
            }.bind(this),
            arrToEl: function(arr, b) {
                el = this.createElement(arr[0].replace(/\s+$/,''));
                el.innerHTML = arr[2];
                el.innerHTML = el.innerHTML.replace(/(^\n|\n$)/gm,'');
                return b ? el.outerHTML : el;
            },
            error: function(l, s, el) {
                el.innerHTML = 'Error at line ' + l + ': ' + s;
            }.bind(this)
        };
        this.R = { // Reader
            ln: 1,
            lns: [],
            tagRe: /^\s*[a-zA-Z0-9-]+[\s\n]*$/,
            properties: {
                'remove_spaces_at_start': 'on',
                'console_output': 'off'
            },
            togglable: [
                'remove_spaces_at_start',
                'console_output'
            ],
            isTogglable: function(id) {
                if (typeof id !== 'number') return false;
                var keys = Object.keys(this.properties);
                if (id < 0 || id >= keys.length) return false;
                return this.togglable.indexOf(keys[id]) > -1;
            },
            check: function(id) {
                var tgb = this.isTogglable(id);
                if (typeof id !== 'number')
                        return tgb ? false : '';
                var keys = Object.keys(this.properties);
                if (id < 0 || id >= keys.length)
                    return false;
                var val = this.properties[keys[id]];

                return tgb ? val == 'on' || val == 'true' : val;
            },
            gl: function() { // get line
                return this.R.lns[this.R.ln - 1];
            }.bind(this),
            lnl: function() { // lines length
                return this.lns.length;
            },
            hasNext: function () {
                return this.ln - 1 < this.lnl();
            },
            lineToElement: function(createElement) {
                var pureElement = this.gl(true).replace(/\s+[\s\S]*/,'');
                return createElement
                    ? C.createElement(pureElement)
                    : pureElement;
            },
            read: function(r, err, micro, version) {
                if (r.length == 0) return [[1, 'text', '']];
                this.R.lns = r.split(/\n/);

                var l, tag = '', ch, newTag, val_prop, value, property;
                while (this.R.hasNext()) {
                    l = this.R.gl();
                    if (/^@.+/.test(l)) {
                        var importRe = /^@import\s+([^\s\n]+)\s*$/,
                            titleRe = /^@title\s+(.+)\s*$/,
                            faviconRe = /^@favicon\s+(.+)\.(.+)\s*$/;
                        if (faviconRe.test(l)) {
                            var match = l.match(faviconRe),
                                path = match[1],
                                extension = match[2],
                                linkIcon = sel('link#favicon');
                            if (linkIcon 
                                && (linkIcon.hasAttribute('href')
                                    ? linkIcon.getAttribute('href') != path + '.' + extension
                                    : true)) linkIcon.remove();
                            var linkTag = document.createElement('link');
                                linkTag.id = 'favicon';
                                linkTag.rel = 'icon';
                                linkTag.type = 'image/' + extension;
                                linkTag.href = path + '.' + extension;
                            if (document.head) document.head.appendChild(linkTag);
                            this.R.ln++;
                            continue;
                        } else if (importRe.test(l)) {
                            var url = l.match(importRe)[1];
                            if (!/.+(.css|.js)$/.test(url)) {
                                err('Please import only .css or .js file(s).', this.R.ln);
                                return;
                            }
                            this.A.responses[url.indexOf('.css') == (url.length - 4)
                                ? 'styles' : 'scripts'].push(url);
                            this.R.ln++;
                            continue;
                        } else if (titleRe.test(l)) {
                            var title = l.match(titleRe)[1];
                            if (document.title) document.title = title;
                            this.R.ln++;
                            continue;
                        } else if (/^@[^:]+:\s*.+/.test(l)) { // console_output RE: ([\s\n]+if\s*\(this\.R\.check\(1\)\)([\s\n]+if\s+\(version\))?)?[\s\n]+console\.log\(([^;]|\n)+;[^\n]*
                            val_prop = l.split(/:\s*/);
                            value = val_prop[0].replace(/^@/,'');
                            if (!this.R.properties.hasOwnProperty(value)) {
                                err('Unknown property: ' + value + '.', this.R.ln);
                                return;
                            }
                            property = val_prop[1].replace(/\s+$/,'');
                            this.R.properties[value] = property;
                            this.R.ln++;
                            continue;
                        }
                    }
                    if (this.A.arr.length > 0 
                            && this.A.tag_level > 0
                            && this.R.check(0))
                        l = l.replace(/^(\t| {4})/, '');

                    //tag = ''; // reset tag
                    if (l.length == 0 || l.charCodeAt(l.length - 1) != 13)
                        l += this.R.ln != this.R.lns.length
                            ? String.fromCharCode(13)
                            : (this.A.brackets.started() ? String.fromCharCode(10) : '');

                    var pps = ''; // props for statements like a (b: {echo c}) [d] -> 'b: '
                    for (i = 0; i < l.length; i++) {
                        ch = l[i];
                        if (ch == '#' 
                            && (i > 0
                                ? l[i - 1] != '\\'
                                : true)
                            && !this.A.brackets.started()) break; // stop after the beginning of the comment

                        var consoleLog = '%c- ' + this.R.ln + ', \'' + ch
                                + '\', ' + ch.charCodeAt(0),
                            elz = this.A.arr;


                        // commands
                        if ( (ch == '{' && this.A.commands.level == 0)
                                || (ch == '}' && this.A.commands.level == 1)
                                || this.A.commands.started()
                                || (elz.length == 0 && this.R.tagRe.test(tag)
                                    && ch == '{')
                            ) {
                            if (tag && !this.A.commands.started()) {
                                if (this.A.brackets.started())
                                    pps = tag;
                                else this.A.New(['text', tag]);
                                tag = '';
                            }

                            if (this.A.commands.started()) {
                                if (ch == '}'
                                        || (i == l.length - 1 
                                            && this.R.ln == this.R.lns.length
                                        )
                                    ) {
                                    this.A.commands.level--;
                                    if (!this.A.commands.level 
                                            || (i == l.length - 1 && this.R.ln == this.R.lns.length)) {
                                        var tag2 = tag 
                                                + (this.A.commands.level || ch != '}' ? ch : '');
                                        if (this.A.brackets.started()) {
                                            var old_tags = this.A.print();
                                            this.A.arr = [[1, 'command', tag2, true]];
                                            this.A.together(function(e){err(e);}, micro, function(r) {
                                                tag = pps + r;
                                                this.A.arr = old_tags;
                                            }.bind(this));
                                        } else this.A.New(['command', tag2,
                                            !this.A.commands.level && ch == '}']),
                                            tag = '';
                                    } else {
                                        tag += '}';
                                    }
                                } else if (ch == '{') {
                                    this.A.commands.level++;
                                    tag += '{';
                                } else {
                                    tag += ch.charCodeAt(0) == 13
                                         ? '\n' : ch;
                                }
                            } else {
                                if (ch == '{') {
                                    this.A.commands.level++;
                                    if (i == l.length - 1 && this.R.ln == this.R.lns.length)
                                        tag += '{';
                                }
                            }
                            continue;
                        }

                        if ( (ch == '(' && this.A.brackets.level == 0)
                                || (ch == ')' && this.A.brackets.level == 1)
                                || this.A.brackets.started()
                                || (elz.length == 0 && this.R.tagRe.test(tag)
                                    && ch == '(')
                            ) {
                            if (tag && !this.A.brackets.started())
                                this.A.New(['text', tag]),
                                tag = '';

                            var m, mm, finalTag = ''; // there MUST be a tag before
                            for (m = elz.length - 1; m >= 0; m--) {
                                mm = elz[m];
                                if (mm[1] == 'text') {
                                    if (this.R.tagRe.test(mm[2])) {
                                        finalTag = mm[2];
                                        break;
                                    } else if (!/^\s*$/.test(mm[2])) break;
                                }
                            }

                            if (finalTag) {
                                if (this.A.brackets.started()) {
                                    if (ch == ')'
                                            || (i == l.length - 1 
                                                && this.R.ln == this.R.lns.length
                                            )
                                        ) {
                                        this.A.brackets.level--;
                                        if (!this.A.brackets.level 
                                                || (i == l.length - 1 && this.R.ln == this.R.lns.length)) {
                                            this.A.brackets.state = -1;
                                            this.A.New(['properties', tag 
                                                    + (this.A.brackets.level || ch != ')' ? ch : ''),
                                                !this.A.brackets.level && ch == ')']);
                                            tag = '';
                                        } else {
                                            tag += ')';
                                        }
                                    } else if (ch == '(') {
                                        this.A.brackets.level++;
                                        tag += '(';
                                    } else {
                                        tag += ch.charCodeAt(0) == 13
                                             ? '\n' : ch;
                                    }
                                } else {
                                    if (ch == '(') {
                                        this.A.brackets.state = 0;
                                        this.A.brackets.level++;
                                        if (i == l.length - 1 && this.R.ln == this.R.lns.length)
                                            tag += '(';
                                    }
                                }
                                continue;
                            } else if (this.A.isSpace(tag)) {
                                this.A.New(['text', '(']),
                                tag = '';
                                continue;
                            }
                        }

                        if (ch != ']') {
                            if (/^[^\s\n]+[\s\n]+$/.test(tag)) {
                                if (/[\s\n]/.test(ch)) {
                                    tag += ch;
                                } else if (ch == '[') {
                                    this.A.New(['element_start', tag.replace(/^\s+|\s+$/g,'')]);
                                    tag = '';
                                } else {
                                    this.A.New(['text', tag]);
                                    tag = ch;
                                }
                            } else if(this.A.isSpace(tag) && /[a-zA-Z0-9-]/.test(ch)) {
                                this.A.New(['text', tag]);
                                tag = ch;
                            } else {
                                if (/[a-zA-Z0-9-\s\n]/.test(ch)) {
                                    tag += ch;
                                    if (i == l.length - 1) {
                                        this.A.New(['text', tag]);
                                        tag = '';
                                        this.A.New(['EOL', '']);
                                    }
                                } else if (ch == '\\') {
                                    //ch += '\\';
                                    if (tag.length > 0 && tag.endsWith('\\')) {
                                        tag += ch;
                                    } else {
                                        this.A.New(['text', tag]);
                                        tag = ch;
                                    }
                                } else if (ch == '[') {
                                    if (this.R.tagRe.test(tag)) {
                                        var elz = this.A.arr;
                                        if (/^\s+[a-zA-Z0-9-]+[\s\n]*$/.test(tag)) {
                                            var spaces = tag.match(/^(\s+)/)[1];
                                            this.A.New(['text', spaces]);
                                            tag = tag.replace(/^\s+/,'');
                                        }
                                        this.A.New(['element_start', 
                                            (tag.endsWith('\\') 
                                                ? tag.replace(/\\?$|^\s+|\s+$/g,'') 
                                                : tag.replace(/^\s+|\s+$/g,''))]);
                                        tag = '';
                                    } else {
                                        var elz = this.A.arr;
                                        if (!/^\s*$/.test(tag)
                                            || (elz.length > 1
                                                ? elz[elz.length - 1][1] == 'properties'
                                                : false
                                            )
                                        ) {
                                            if (elz.length > 1 && elz[elz.length - 1][1] == 'properties') {
                                                var m, mm, finalTag = '';
                                                for (m = elz.length - 1; m >= 0; m--) {
                                                    mm = elz[m];
                                                    if (mm[1] == 'text') {
                                                        if (this.R.tagRe.test(mm[2])) {
                                                            finalTag = mm[2];
                                                            m = 0;
                                                        } else m = 0;
                                                    }
                                                }
                                                this.A.New(['element_start', '']);
                                                tag = '';
                                            } else {
                                                this.A.New(['text', tag]);
                                                tag = '';
                                                this.A.New(['element_start', '']);
                                            }
                                        } else {
                                            if (elz.length > 1) {
                                                var m, mm = '', finalTag = '', f, propss, wasBracketBefore;
                                                for (m = elz.length - 1; m >= 0; m--) {
                                                    mm = elz[m];
                                                    if (mm[1] == 'EOL') continue;
                                                    if (mm[1] == 'properties') {
                                                        propss = mm[2];
                                                        continue;
                                                    } else if (mm[1] == 'text') {
                                                        if (this.A.isSBracket(mm[2]))
                                                            continue;
                                                        wasBracketBefore = false;
                                                        if (this.A.isSpace(mm[2]) && m > 0) {
                                                            var n, nn;
                                                            for (n = m - 1; n >= 0; n--) {
                                                                nn = elz[n];
                                                                if (nn[1] == 'EOL') continue;
                                                                if (nn[1] == 'text') {
                                                                    if (this.A.isSBracket(nn[2])) {
                                                                        wasBracketBefore = true;
                                                                        break;
                                                                    } else if (!this.A.isSpace(nn[2])
                                                                        && !this.R.tagRe.test(nn[2])) break;
                                                                } else break;
                                                            }
                                                        }
                                                        if (!wasBracketBefore) {
                                                            if (this.R.tagRe.test(mm[2])) {
                                                                finalTag = mm[2];
                                                                this.A.arr.splice(m);
                                                                this.A.properties = propss;
                                                                this.A.New(['element_start', finalTag.replace(/^\s+|\s+$/g,'')]);
                                                                f = true;
                                                                break;
                                                            }
                                                        } else break;
                                                    } else break;
                                                }
                                                if (!f) {
                                                    this.A.New(['text', '[']);
                                                }
                                            } else {
                                                this.A.New(['text', '[']);
                                            }
                                        }
                                    }
                                } else if (tag) {
                                    this.A.New(['text', 
                                        (tag.endsWith('\\') ? tag.replace(/\\?$/,'') : tag)
                                        + ch]);
                                    tag = '';
                                } else tag += ch;
                            }
                        } else if (tag != '\\') {
                            this.A.New(['text', tag]);
                            this.A.New(['element_end', '']);
                            tag = '';
                        } else {
                            this.A.New(['text', ch]);
                            tag = '';
                        }
                    }
                    this.R.ln++;
                    var a_arr = this.A.arr;
                    if (!this.A.brackets.started()
                            && !this.A.commands.started()
                            && (a_arr.length > 1
                                ? a_arr[a_arr.length - 1][1] != 'EOL'
                                : true)
                        ) {
                        this.A.New(['text', tag]);
                        tag = '';
                        this.A.New(['EOL', '']);
                    }
                }
                this.R.ln--;
                if (!/^[\s\n]*$/.test(tag))
                    this.A.New(['text', tag]);

                return this.A.arr;
            }.bind(this)
        };
        this.A = { // Appender
            tv: { // together variables
                els: [],
                inner: '',
                append: function(s, tags, inner) {
                    this.inner += (
                        (tags.length > 0
                            ? RegExp("<" 
                                + tags[tags.length - 1] 
                                + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*$").test(inner)
                            : ''
                        ) ? '>' : ''
                    ) + s;
                },
                tags: [],
                startedBrackets: false,
                reset: function() {
                    this.A.tv.els = this.A.print();
                    this.A.tv.inner = '';
                    this.A.tv.tags = [];
                    this.A.tv.startedBrackets = false;
                }.bind(this),
                variables: {}
            },
            isSpace: function(s) {
                return /^[\s\n]*$/.test(s);
            },
            tag: '',
            isTag: function(s) {
                return /^\s*[a-zA-Z0-9-]+[\s\n]*$/.test(s);
            },
            isSBracket: function(s) {
                return /^\s*\[[\s\n]*$/.test(s);
            },
            banned_tags: ['style', 'script'],
            components: {
                'container': ['div', ''],
                'menu': ['div', 'class="menu"'],
                'menu-brand': ['img', 'class="menu-brand"'],
                'menu-item': ['a', 'class="menu-item"'],
                'clear': ['div', 'class="clear"'],
                'dark': ['div', 'class="dark"'],
                'grand': ['div', 'class="grand"'],
                'grand-content': ['div', 'class="grand-content"'],
                'title': ['div', 'class="title"'],
                'sub-title': ['div', 'class="sub-title"'],
                'code': ['div', 'class="code"'],
                'middle': ['div', 'class="middle"'],
                'sh': ['span', 'class="sh"'],
                'upbar-container': ['div', 'class="upbar-container"'],
                'upbar': ['div', 'class="upbar" onclick="this.remove();"']
            },
            responses: {
                styles: [],
                scripts: []
            },
            properties: '',
            closedProperties: false,
            pReset: function() { // properties reset
                this.properties = '';
                this.closedProperties = false;
            },
            propsLine: 0,
            tag_level: 0, // for Reader
            arr: [],
            brackets: {
                started: false,
                text: '',
                state: -1,
                level: 0,
                append: function(s) {
                    this.text += s;
                },
                started: function() {
                    return this.state > -1;
                }
            },
            commands: {
                started: false,
                text: '',
                level: 0,
                append: function(s) {
                    this.text += s;
                },
                started: function() {
                    return this.level > 0;
                }
            },
            tg_level: function(tags) {
                return tags.length;
            }, // for .together()
            New: function(x) {
                x.unshift(this.R.ln);
                this.A.arr.push(x);
                if (x[1] == 'element_start')
                    this.A.tag_level += 1;
                if (this.A.tag_level > 0 && x[1] == 'element_end')
                    this.A.tag_level -= 1;
            }.bind(this),
            print: function(inner) {
                return typeof inner == 'string' ? 'inner: '+inner
                        +', tag: '+this.A.tag
                        +', properties: '+this.A.properties
                        +', propsLine: '+this.A.propsLine
                    : this.A.arr;
            }.bind(this),
            hasNextElementWithVal: function(els, i, id, value) {
                if (els.length < 2
                        || i >= els.length - 2) return false;
                var k;
                for (k = i + 1; kk = els[k]; k++) {
                    if (kk[1] == 'EOL' 
                            || (kk[1] == 'text' && /^[\s\n]*$/.test(kk[2])))
                        continue;
                    if (new RegExp(value).test(kk[id]))
                        return true;
                }
                return false;
            },
            isNearElement: function(els, i, b) {
                if (els.length < 2
                        || i >= els.length - 2) return false;
                var k, kk;
                for (k = i + 1; kk = els[k]; k++) {
                    if (kk[1] == 'EOL'
                            || (b ? kk[1] == 'properties' : false)
                        )
                        continue;
                    if (kk[1] == 'text') {
                        if (/^[^\\]*\]$/.test(kk[2]))
                            break;
                        if (/^[\s\n]*$/.test(kk[2]))
                            continue;
                        else if (/^\s*\[$/.test(kk[2]))
                            return true;
                        else break;
                    } else if (kk[1] == 'element_start') {
                        if (this.isSpace(kk[2]))
                            return true;
                        else break;
                    } else if (kk[1] == 'element_end')
                        break;
                }
                return false;
            },
            isBeforeElement: function(els, i) {
                if (els.length < 2 && i < 2) return false;
                var n, nn;
                for (n = i - 1; n >= 0; n--) {
                    nn = els[n];
                    if (nn[1] == 'EOL' || nn[1] == 'properties') continue;
                    if (nn[1] == 'text') {
                        if (this.isTag(nn[2])) return true;
                        else if (this.isSpace(nn[2])) continue;
                        else break;
                    } else break;
                }
                return false;
            },
            readProperties: function(s, ln, err, b) {
                if (/^[\s\n]*$/.test(s)) return null;
                var properties = {},
                    styles = {},
                    lines = s.split('\n'), k, kk, kkk,
                    parts, prop, val;
                for (k = 0; k < lines.length; k++) {
                    kk = lines[k];
                    if (/^[\s\n]*$/.test(kk)) continue;
                    if (!/^\s*[^:]+\s*:\s*.+\s*$/.test(kk)) {
                        err('Wrong syntax. Use pattern -> property: value.', ln-lines.length+k+1);
                        return 'err';
                    }
                    parts = kk.split(/\s*:\s*/);
                    val = parts[1];
                    if (parts.length > 2)
                        for (var m = 2; m < parts.length; m++)
                            val += ':' + parts[m];
                    prop = parts[0].replace(/^\s+|\s+$/,'').toLowerCase();
                    val = val.replace(/^\s+|\s+$/,'');
                    if (!/^\!?[a-zA-Z0-9-]+$/.test(prop)) {
                        err('Unsupported property syntax: ' + prop + '.', ln-lines.length+k+1 );
                        return 'err';
                    }
                    if (!prop.startsWith('!') && this.CSSprops.indexOf(prop) > -1)
                        styles[prop] = val;
                    else properties[prop.replace(/^\!/,'')] = val;
                }
                if (!b) return properties;
                var keys = Object.keys(properties),
                    skeys = Object.keys(styles),
                    p = '', ss = '';
                if (skeys.length > 0)
                    for (k = 0; k < skeys.length; k++)
                        kk = skeys[k], kkk = styles[kk],
                        ss += kk + ':' + kkk 
                            + (k == skeys.length-1 ? '' : ';');
                p += ss.length == 0 ? '' : ' style="' + ss + '"';
                for (k = 0; k < keys.length; k++)
                    kk = keys[k], kkk = properties[kk],
                    p += ' ' + kk + '="' + kkk + '"';
                return p;
            }.bind(this),
            cmdLineLoop: function(k, cmds, tags, inner, repeat, cond, err, micro, fn) {
                if (k >= cmds.length){fn(inner); return;}
                var kk = cmds[k].tr();

                var mtch, mtch2, cmd, argz,
                    endCmdLoop = false,
                    oneLineCommands = ['end-repeat', 'newline', 'end-if'],
                    Continue = function() {
                        this.A.cmdLineLoop(++k, cmds, tags, inner, repeat, cond, err, micro, fn);
                    }.bind(this),
                    append = function(s) {
                        this.A.tv.append(s, tags, inner);
                        inner = this.A.tv.inner;
                    }.bind(this),
                    getVariables = function(s) {
                        var spl = s.split('@'), vars = [], i;
                        if (spl.length < 2) return [];
                        for (i = 1; i < spl.length; i++) {
                            var variable = spl[i].split(/[^a-zA-Z0-9-]/)[0];
                            if ((spl[i - 1].length > 0 
                                    ? spl[i - 1].indexOf('\\') 
                                        != spl[i - 1].length - 1
                                    : true)
                                    && variable.length > 0
                                    && this.A.tv.variables.hasOwnProperty(variable)) {
                                vars.push(variable);
                            }
                        }
                        return vars;
                    }.bind(this),
                    replaceVariables = function(s) {
                        var vars = getVariables(s), i = 0,v;
                        for (; i < vars.length; i++) {
                            v = vars[i];
                            s = s.replace(new RegExp('@' + v, 'g'), 
                                this.A.tv.variables[v]);
                        }
                        return s;
                    }.bind(this),
                    parse = function(s) {
                        var p = 0, tag = '', result = '', ch, cmdLevel = 0,
                            cmdStarted = function() {
                                return cmdLevel > 0;
                            };
                        for (; p < s.length; p++) {
                            ch = s[p];
                            if ( (ch == '{' && cmdLevel == 0)
                                    || (ch == '}' && cmdLevel == 1)
                                    || cmdStarted()
                                ) {
                                if (tag && !cmdStarted()) {
                                    result += tag;
                                    tag = '';
                                }

                                if (cmdStarted()) {
                                    if (ch == '}' || i == s.length - 1) {
                                        cmdLevel--;
                                        if (!cmdLevel || i == s.length - 1) {
                                            var tag2 = tag 
                                                    + (cmdLevel || ch != '}' ? ch : '');
                                            var old_tags = this.A.print(),
                                                property = this.R.properties['console_output'],
                                                inner2 = this.A.tv.inner;
                                            this.R.properties['console_output'] = 'off';
                                            this.A.arr = [[1, 'command', tag2, true]];
                                            this.A.together(function(e){err(e);}, micro, function(r) {
                                                result += r;
                                                tag = '';
                                                this.A.arr = old_tags;
                                                this.R.properties['console_output'] = property;
                                                this.A.tv.inner = inner2;
                                            }.bind(this));
                                        } else {
                                            tag += '}';
                                        }
                                    } else if (ch == '{') {
                                        cmdLevel++;
                                        tag += '{';
                                    } else {
                                        tag += ch.charCodeAt(0) == 13
                                             ? '\n' : ch;
                                    }
                                } else {
                                    if (ch == '{') {
                                        cmdLevel++;
                                        if (i == s.length - 1)
                                            tag += '{';
                                    }
                                }
                            } else result += ch;
                            if (p == s.length - 1) return result;
                        }
                    }.bind(this),
                    getCookie = function(name) {
                        var nameEQ = name + "=",
                            ca = document.cookie.split(';'), q = 0,c;
                        for(; q < ca.length;q++) {
                            c = ca[q];
                            while (c.charAt(0)==' ') c = c.substring(1,c.length);
                            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                        }
                        return '';
                    };
                    if (this.A.isSpace(kk)){Continue(); return;}
                    mtch = kk.match(/^(\S+)\s+(.+)$/);
                    mtch2 = kk.match(/^(\S+)$/);
                    if ((mtch == null 
                                || typeof mtch[2] === 'undefined'
                                || this.A.isSpace(mtch[2])
                            ) && (mtch2 == null || oneLineCommands.indexOf(mtch2[1]) == -1)
                        ) {
                        err('Unknown command statement: ' + kk, this.R.ln);
                        return;
                    }
                    if (mtch)
                        cmd = mtch[1],
                        argz = parse(replaceVariables(mtch[2]));
                    else cmd = mtch2[1], argz = '';

                    if (repeat.is) {
                        if (cmd != 'end-repeat') {
                            repeat.text += kk + '\n';
                            Continue();
                            return;
                        }
                    }
                    if (cond.is) {
                        if (cmd != 'end-if') {
                            cond.text += kk + '\n';
                            Continue();
                            return;
                        }
                    }
                Micro.read(function(args) {
                    //var args = argz;
                    args = args.replace(/&lt;/g, '<').replace(/&gt;/g,'>');
                    switch(cmd) {
                        case 'echo':
                            append(args);
                            break;
                        case 'get':
                            endCmdLoop = true;
                            micro.getResponse(args, function(r) {
                                append(r);
                                this.A.loopElements(i + 1, err, micro, function(inner) {
                                    fn(inner);
                                });
                                return;
                                }.bind(this),
                                function(e) {
                                    err(e + ": File named '" + args + "' doesn't exist.", this.R.ln);
                                    this.A.loopElements(i + 1, err, micro, function(inner) {
                                        fn(inner);
                                    });
                                    return;
                                }.bind(this),
                                true);
                            break;
                        case 'rand':
                            var spl = args.split(/\s/g);
                            if (spl.length == 1){err('Correct syntax: rand a b ... n', this.R.ln); break;}
                            var ri = spl[Math.floor(Math.random() * spl.length)];
                            append(ri);
                            break;
                        case 'def':
                            var mtchh = args.match(/(\S+)\s*(.+)/);
                            if (mtchh == null){err('Correct syntax: def a b', this.R.ln); break;}
                            if (!/^[a-zA-Z0-9-]+$/.test(mtchh[1])) {err('Only alphanumeric words (with optional hyphen) are supported.', this.R.ln); break;}
                            this.A.tv.variables[mtchh[1]] = mtchh[2];
                            break;
                        case 'set-cookie':
                            var mtchh = args.match(/(\S+)\s*(.+)/);
                            if (mtchh == null){err('Correct syntax: set-cookie name value.', this.R.ln); break;}
                            if (!/^[a-zA-Z0-9-]+$/.test(mtchh[1])) {err('Only alphanumeric name (with optional hyphen) is supported.', this.R.ln); break;}
                            document.cookie = mtchh[1] +'='+ mtchh[2] +'; Path=/;';
                            break;
                        case 'get-cookie':
                            if (!/^[a-zA-Z0-9-]+$/.test(args)) {err('Only alphanumeric name (with optional hyphen) is supported.', this.R.ln); break;}
                            append(getCookie(args));
                            break;
                        case 'eval':
                            var evalResult = '';
                            try {
                                evalResult = eval("(function(){" 
                                    + (!~args.indexOf('return') ? 'return ' : '')
                                    + "'" + eval(args) + "'"
                                    + "})")();
                            } catch (e) {
                                evalResult = e;
                            }
                            append(evalResult);
                            break;
                        case 'exec':
                            eval(args);
                            break;
                        case 'upper':
                            append(args.toUpperCase());
                            break;
                        case 'lower':
                            append(args.toLowerCase());
                            break;
                        case 'reverse':
                            var t = "",
                                u = args.length;
                            while (u>0)
                                t += args.substring(u-1,u),
                                u--;
                            append(t);
                            break;
                        case 'capitalize':
                            append(
                                args.toLowerCase().replace(/\b\w/g, function (m) {
                                    return m.toUpperCase();
                                })
                            );
                            break;
                        case 'repeat':
                            if (repeat.is) {err("You can't start a repeat inside a repeat.", this.R.ln); break;}
                            var mtchh = args.match(/(\S+)\s*(.*)/);
                            if (!/^\d+$/.test(mtchh[1])) {err('Count must be an integer.', this.R.ln); break;}
                            if (this.A.isSpace(mtchh[2])) {
                                repeat.is = true;
                                repeat.count = parseInt(mtchh[1]);
                                break;
                            }
                            for (var h = 0, hh = parseInt(mtchh[1]); h < hh; h++) {
                                var property = this.R.properties['console_output'],
                                    inner2 = this.A.tv.inner;
                                this.R.properties['console_output'] = 'off';
                                this.A.arr = [[1, 'command', mtchh[2], true]];
                                this.A.together(function(e){err(e);}, micro, function(r) {
                                    this.R.properties['console_output'] = property;
                                    this.A.tv.inner = inner2;
                                    append(r);
                                }.bind(this));
                            }
                            break;
                        case 'end-repeat':
                            if (repeat.is) {
                                repeat.is = false;
                                for (var h = 0; h < repeat.count; h++) {
                                    var property = this.R.properties['console_output'],
                                        inner2 = this.A.tv.inner;
                                    this.R.properties['console_output'] = 'off';
                                    this.A.arr = [[1, 'command', repeat.text, true]];
                                    this.A.together(function(e){err(e);}, micro, function(r) {
                                        this.R.properties['console_output'] = property;
                                        this.A.tv.inner = inner2;
                                        append(r);
                                        this.A.cmdLineLoop(++k, cmds, tags, inner, repeat, cond, err, micro, fn);
                                    }.bind(this));
                                }
                                endCmdLoop = true;
                            } else err("You can't end a repeat without starting it.", this.R.ln);
                            break;
                        case 'newline':
                            append('<br>');
                            break;
                        case 'if':
                            if (cond.is) {err("You can't start a condition inside a condition.", this.R.ln); break;}
                            if (!/^((?!(==|!=|<|<=|>|>=)).)+(==|!=|<|<=|>|>=).+/.test(args))
                                {err('Condition must contain one of operators (==, !=, >, >=, <, <=).', this.R.ln); break;}
                            cond.is = true;
                            cond.condition = args;
                            break;
                        case 'end-if':
                            if (cond.is) {
                                cond.is = false;
                                var resultCondition = false, q = cond.condition,
                                    splits = [
                                        q.split('=='),
                                        q.split('!='),
                                        q.split(/<(?!=)/),
                                        q.split('<='),
                                        q.split(/>(?!=)/),
                                        q.split('>=')
                                    ];
                                if (splits[0].length > 1)
                                {
                                    resultCondition = 
                                        splits[0][0] == splits[0][1];

                                } else if (splits[1].length > 1)
                                {
                                    resultCondition = 
                                        splits[1][0] != splits[1][1];

                                } else if (splits[2].length > 1)
                                {
                                    splits[2][0] = splits[2][0].tr();
                                    splits[2][1] = splits[2][1].tr();
                                    if (!/^[+-]?\d+$/.test(splits[2][0])
                                            || !/^[+-]?\d+$/.test(splits[2][1])
                                    ) {
                                        err('You can compare only integers with < operator.', this.R.ln);
                                        break;
                                    }
                                    resultCondition = parseInt(splits[2][0]) < parseInt(splits[2][1]);

                                } else if (splits[3].length > 1)
                                {
                                    splits[3][0] = splits[3][0].tr();
                                    splits[3][1] = splits[3][1].tr();
                                    if (!/^[+-]?\d+$/.test(splits[3][0])
                                            || !/^[+-]?\d+$/.test(splits[3][1])
                                    ) {
                                        err('You can compare only integers with <= operator.', this.R.ln);
                                        break;
                                    }
                                    resultCondition = parseInt(splits[3][0]) <= parseInt(splits[3][1]);

                                } else if (splits[4].length > 1)
                                {
                                    splits[4][0] = splits[4][0].tr();
                                    splits[4][1] = splits[4][1].tr();
                                    if (!/^[+-]?\d+$/.test(splits[4][0])
                                            || !/^[+-]?\d+$/.test(splits[4][1])
                                    ) {
                                        err('You can compare only integers with > operator.', this.R.ln);
                                        break;
                                    }
                                    resultCondition = parseInt(splits[4][0]) > parseInt(splits[4][1]);

                                } else if (splits[5].length > 1)
                                {
                                    splits[5][0] = splits[5][0].tr();
                                    splits[5][1] = splits[5][1].tr();
                                    if (!/^[+-]?\d+$/.test(splits[5][0])
                                            || !/^[+-]?\d+$/.test(splits[5][1])
                                    ) {
                                        err('You can compare only integers with >= operator.', this.R.ln);
                                        break;
                                    }
                                    resultCondition = parseInt(splits[5][0]) >= parseInt(splits[5][1]);
                                }
                                if (resultCondition) {
                                    var property = this.R.properties['console_output'],
                                        inner2 = this.A.tv.inner;
                                    this.R.properties['console_output'] = 'off';
                                    this.A.arr = [[1, 'command', cond.text, true]];
                                    this.A.together(function(e){err(e);}, micro, function(r) {
                                        this.R.properties['console_output'] = property;
                                        this.A.tv.inner = inner2;
                                        append(r);
                                        this.A.cmdLineLoop(++k, cmds, tags, inner, repeat, cond, err, micro, fn);
                                    }.bind(this));
                                    endCmdLoop = true;
                                }
                            } else err("You can't end a condition without starting it.", this.R.ln);
                            break;
                        default:
                            err('Unknown command: ' + cmd, this.R.ln);
                            break;
                    }
                    if (endCmdLoop) return;
                    this.A.cmdLineLoop(++k, cmds, tags, inner, repeat, cond, err, micro, fn);
                }.bind(this), argz, false, false, function(e, ln) {
                    ln = ln || 'unknown';
                    failed = 'Error at line ' + ln + ': ' + e;
                });
            }.bind(this),
            loopElements: function(i, err, micro, fn) {
                var x, els = this.A.tv.els,
                    inner = this.A.tv.inner,
                    tags = this.A.tv.tags,
                    startedBrackets = this.A.tv.startedBrackets,
                    endCmdLoop = false;
                for (; i < els.length; i++) {
                    x = els[i];
                    var type = x[1],
                        value = x[2];

                    if ((type == 'text' 
                                && !/(^\s*\[$|^[\s\n]*$)/.test(value)
                                && /^\s*[a-zA-Z0-9-]+\s*$/.test(value))
                            || (type == 'element_start' && !/^[\s\n]*$/.test(value)) ) {
                        this.A.tag = value;
                    } else if (type != 'properties'
                            && !/(^\s*\[$|^[\s\n]*$)/.test(value)) {
                        this.A.tag = '';
                    }

                    if (type == 'properties') {
                        this.A.properties = value;
                        this.A.closedProperties = x[3];
                        this.A.propsLine = x[0];
                    } else if (
                        type == 'text' && (
                                !/[^\[]*\[$/.test(value)
                                && !/[\s\n]*/.test(value)
                            )
                        ) {
                        this.A.pReset();
                    }

                    switch(type) {
                        case 'element_start':
                            var tagname = this.A.tag,
                                tagname_r = tagname.tr(),
                                re = RegExp('('+ tagname +')((<br>|\\s|\\n)*)$'),
                                components = this.A.components,
                                tagname_c_props = '',
                                props = this.A.properties;
                            if (tags.length > 0
                                    ? RegExp("<" 
                                        + tags[tags.length - 1] 
                                        + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*$").test(inner)
                                    : false
                                    ){
                                inner += '>';
                            }

                            if (this.A.banned_tags.indexOf(tagname_r) > -1) {
                                err('Unsupported element: ' + tagname_r + '.', x[0]);
                                return;
                            }

                            if (components.hasOwnProperty(tagname_r)) {
                                tagname_c_props = ' ' + components[tagname_r][1];
                                tagname_r = components[tagname_r][0];
                            }

                            if (!/^[\s\n]*$/.test(value) && !props) tags.push(tagname_r);



                            if (!tagname) break;
                            if (!this.A.isTag(tagname_r)) {
                                inner += re.test(inner) ? '' : tagname
                                    + '[';
                                this.A.tag = '';
                                this.A.pReset();
                                break;
                            }
                            if (i > 0 && els[i - 1][1] == 'element_start'
                                    && /^\s*$/.test(els[i - 1][2]))
                                inner += '[';

                            if (props) {
                                var replace = inner.replace(re, '');
                                inner = replace;
                                inner += '<' + tagname_r + tagname_c_props;
                                tags.push(tagname_r);
                                var propsTranslated = this.A.readProperties(props, this.A.propsLine, err, true);
                                if (propsTranslated == 'err') {
                                    fn('');
                                    return;
                                }
                                inner += propsTranslated == null ? '' : propsTranslated;
                                this.A.pReset();
                                continue;
                            }

                            if (value.length == 0) {
                                if (!RegExp("<" 
                                        + tags[tags.length - 1] 
                                        + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner)) {
                                    inner += '<' + tagname_r + tagname_c_props,
                                    tags.push(tagname_r);
                                }
                            } else inner += '<' + tagname_r + tagname_c_props;

                            this.A.tag = tagname_r;
                            break;
                        case 'properties':
                            if (i < els.length - 1) {
                                var m, mm;
                                for (m = i + 1; m < els.length; m++) {
                                    mm = els[m];
                                    if (mm[1] == 'EOL' 
                                        || (mm[1] == 'text' && /^\s*$/.test(mm[2]))
                                    ) continue;
                                    else if (mm[1] == 'properties') {
                                        var closedProperties = x[3],
                                            failed = false;
                                            Micro.read(function(readd) {
                                                inner += '(' + readd + (closedProperties ? ')' : '');
                                                if (failed) return failed;
                                            }, value, false, false, function(e, ln) {
                                                ln = ln || 'unknown';
                                                failed = 'Error at line ' + ln + ': ' + e;
                                            });
                                        break;
                                    } else break;
                                }
                            }
                            break;
                        case 'text':
                            var whitespaceRE = /(^\s*\[$|^[\s\n]*$)/,
                                isFullEl = this.A.isNearElement(els, i, true);
                            value = value.replace(/[<>]/g, function(x) {
                                switch (x) {
                                    case '<': return '&lt;';
                                    case '>': return '&gt;';
                                }
                            });

                            if (i > 1 && (
                                        this.A.properties
                                        || (i > 0
                                            ? els[i - 1][1] == 'properties'
                                            : false
                                        )
                                    )
                                ) {
                                var props = this.A.properties;
                                if (this.A.isNearElement(els, i)
                                        && /^(<br>|\s|\n)*$/.test(value)) {
                                    continue;
                                }
                                var failed = false;
                                micro.read(function(readd) {
                                    var inn = '(' + readd + (this.A.closedProperties ? ')' : '');
                                    if (failed) return failed;
                                    if (tags.length > 0
                                            ? RegExp("<" 
                                                + tags[tags.length - 1] 
                                                + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*$").test(inner)
                                            : false
                                        ) {
                                        inner += '>';
                                    }
                                    inner += inn;
                                    this.A.pReset();
                                }.bind(this), props 
                                        + (props.split('\n').length > 1 
                                            ? '' : ''), false, false, function(e, ln) {
                                    ln = ln || 'unknown';
                                    failed = 'Error at line ' + ln + ': ' + e;
                                });
                            } else if (
                                    !this.A.isBeforeElement(els, i)
                                    && (i > 0 
                                    ? (tags.length > 0
                                            ? els[i - 1][1] == 'element_start' 
                                                || (els[i - 1][1] == 'text'
                                                    && /^\s*\[[\s\n]*$/.test(els[i - 1][2])
                                                )
                                            : true
                                    ) : true)
                                ) {
                                if (tags.length > 0
                                        ? RegExp("<" 
                                            + tags[tags.length - 1] 
                                            + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*$").test(inner)
                                        : false
                                    ) {
                                    inner += '>' 
                                        + (/^\s*\[[\s\n]*$/.test(value) ? '[' : '');
                                    this.A.tag = ''; this.A.pReset();
                                } else if (/^\s*\[[\s\n]*$/.test(value) || (
                                        i > 0
                                            ? els[i - 1][1] == 'element_start' && /^\s*$/.test(els[i - 1][2])
                                            : false
                                    )) {
                                    inner += '[';
                                    this.A.tag = ''; this.A.pReset();
                                }
                            }

                            if (
                                (i < els.length - 1 
                                    && !value.endsWith('\\')
                                    && els[i + 1][2] != ']'
                                    && els.length > 1
                                )) {
                                    inner += this.A.isSpace(value)
                                        ? value
                                        : (
                                            isFullEl && this.R.tagRe.test(value) 
                                            ? '' 
                                            : (tags.length > 0 
                                                ? (
                                                    !RegExp("<" 
                                                            + tags[tags.length - 1] 
                                                            + "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner)
                                                        && whitespaceRE.test(value)
                                                    ? '' : value
                                                )
                                                : (
                                                    i > 0
                                                        ? (
                                                            /^\s*\[[\s\n]*$/.test(value)
                                                                ? (els[i - 1][1] == 'element_start' ? value : '')
                                                                : value
                                                        )
                                                        : (/^\s*\[[\s\n]*$/.test(value) ? '' : value)
                                                )
                                            )
                                        );
                                }
                            else { inner += /\\+/.test(value) 
                                        ? value : value.replace(/\\+$/, '');
                            }
                            break;
                        case 'EOL': // End Of Line
                            var isNearElement = this.A.isNearElement(els, i);
                            if (isNearElement && this.A.tag)
                                break;
                            if ((i > 0 
                                        ? (els[i - 1][1] != 'element_start' 
                                            && els[i - 1][1] != 'element_end')
                                        : true ) 
                                    && (i > 1 && tags.length > 0
                                            ? (els[i - 2][1] != 'element_end'
                                                    && els[i - 2][1] != 'element_start'
                                                ? !isNearElement
                                                : false)
                                            : true
                                        )
                                    && i != els.length - 1
                                )
                                inner += '<br>';
                            break;
                        case 'element_end':
                            if (tags.length == 0) {
                                err('There\'s an unwanted closing parenthesis in your .mi file.', this.R.ln);
                                return;
                            }
                            inner += '</' + tags[tags.length - 1] + '>';
                            tags.pop();
                            this.A.tag = '';
                            break;
                        case 'command':
                            var cmds = value.tr().split('\n'),
                                repeat = {
                                    text: '',
                                    is: false,
                                    count: 0
                                },
                                cond = {
                                    text: '',
                                    is: false,
                                    condition: ''
                                };
                            this.A.cmdLineLoop(0, cmds, tags, inner, repeat, cond, err, micro, function(q) {
                                this.A.tv.inner = q;
                                inner = q;
                            }.bind(this));
                            break;
                    }
                    this.A.tv.els = els;
                    this.A.tv.inner = inner;
                    this.A.tv.tags = tags;
                    this.A.tv.startedBrackets = startedBrackets;

                    if (i == els.length - 1) fn(inner);

                    if (endCmdLoop) break;
                }
            }.bind(this),
            together: function(err, micro, fn) {
                if (!micro) return '';
                this.A.tv.reset();
                var inner = '';
                this.A.loopElements(0, err, micro, function(inner) {
                    fn(inner);
                });
            }.bind(this)
        };
    };
    this.read = function(fn, r, ms, b, err) {
        if (typeof r != 'string') throw new Error('Unexpected argument (1). Please use at least 2 arguments (function, string).');
        if (r.length == 0){
            fn('');
            return;
        }
        var d = new Date().getTime(),
            failed = false;
        err = err || function(e, ln) {
            ln = ln || 'unknown';
            failed = 'Error at line ' + ln + ': ' + e;
        }
        var core = new Core(),
            arr = core.R.read(r, err, this, this.version);
        if (b) return arr;
        core.A.together(err, this, function(newInner) {
            var ret = failed ? failed : newInner;
            fn(ms ? [new Date().getTime() - d,
                ret, core.A.responses] : ret);
        });
    }

    this.render = function(r, el, el2) {
        if (!r) return;
        el = el || this.e;

        this.read(function(inn) {
            var responses, k, kk, l, ll,
                innerMatch = el.innerHTML.match(/[\s\S]+(?=(<style\s*(?:\s*[a-zA-Z0-9-]+\s*=\s*(?:\"[^\"]*\"|'[^']*'))*>[\s\S]+<\/style>.*|<script\s*(?:\s*[a-zA-Z0-9-]+\s*=\s*(?:\"[^\"]*\"|'[^']*'))*>[\s\S]+<\/script>.*))/),
                dd;
            if (inn instanceof Array) responses = inn[2];
            if (el2 && inn instanceof Array) el2.innerHTML = inn[0] + 'ms';
            if (innerMatch != null) {
                dd = document.createElement('div');
                dd.innerHTML = innerMatch[1];
                var styles = dd.querySelectorAll('style'),
                    ddInner = '';
                if (responses && responses.styles.length > 0)
                    for (l = 0; l < styles.length; l++)
                        if (styles[l].hasAttribute('id')
                                && responses.styles.indexOf(styles[l].id) > -1) {
                            ddInner += styles[l].outerHTML;
                        }
                dd.innerHTML = ddInner;
            }
            el.style.display = 'none';
            el.innerHTML = inn instanceof Array ? inn[1] : inn;
            if (dd) {
                el.innerHTML += dd.innerHTML;
                eval(this.tooltip.html);
                el.style.display = '';
                return;
            }
            if (responses 
                    && (responses.hasOwnProperty('styles') 
                        || responses.hasOwnProperty('scripts'))
            ) {
                if (responses.styles.length > 0)
                    for (k = 0; kk = responses.styles[k]; k++) {
                        this.getResponse(kk, function(r, kk) {
                            el.innerHTML += '<style id="' + kk + '">' + r + '</style>';
                            if (responses.scripts.length == 0 
                                    && k == responses.styles.length)
                                el.style.display = '';
                        }, function(e) {
                            el.innerHTML = e;
                        }, true);
                    }
                if (responses.scripts.length > 0)
                    for (k = 0; kk = responses.scripts[k]; k++) {
                        this.getResponse(kk, function(r) {
                            eval(r);
                            if (k == responses.scripts.length)
                                el.style.display = '';
                        }, function(e) {
                            el.innerHTML = e;
                        }, true);
                    }
            }
            eval(this.tooltip.html);
            if (!responses 
                    || (responses 
                            && (responses.hasOwnProperty('styles') 
                                || responses.hasOwnProperty('scripts'))
                        && responses.styles.length == 0
                            && responses.scripts.length == 0)
                    ) 
                el.style.display = '';
        }.bind(this), r, true);
    }
    if (typeof this.e !== 'undefined') {
        var link = this.e.getAttribute('m-enable');
        if (link == 'this')
            this.render(this.e.innerHTML.replace(/&amp;/g, '&'), this.e);
        else
            this.getResponse(link + '.mi',
                function(r){
                    this.render(r);
                }.bind(this),
                function(e) {
                    this.e.innerHTML = e;
                }.bind(this),
                true);
    }
}
