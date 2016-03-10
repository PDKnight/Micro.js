/* ********************************************************* *\
|  Micro.js framework made by PDKnight. All rights reserved.  |
|               For more information please visit             |
|             https://github.com/PDKnight/Micro.js.           |
\* ********************************************************* */

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
if (!String.prototype.endsWith)
	String.prototype.endsWith = function(s) {
		return this.indexOf(s) == this.length - 1 - s.length;
	}
if (!Object.keys)
	Object.keys = function(obj) {
		var keys = [];
		for (var i in obj)
			if (obj.hasOwnProperty(i))
				keys.push(i);
		return keys;
	};

var Micro = new function() {
	this.e;
	this.version = '1.2 - SNAPSHOT';
	this.CSSprops = ['all','background','background-attachment','background-clip','background-color','background-image','background-origin','background-position','background-repeat','background-size','border','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-style','border-bottom-width','border-collapse','border-color','border-image','border-image-outset','border-image-repeat','border-image-slice','border-image-source','border-image-width','border-left','border-left-color','border-left-style','border-left-width','border-radius','border-right','border-right-color','border-right-style','border-right-width','border-spacing','border-style','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-style','border-top-width','border-width','bottom','box-shadow','caption-side','clear','clip','color','content','counter-increment','counter-reset','cursor','direction','display','empty-cells','float','font','font-family','font-size','font-size-adjust','font-stretch','font-style','font-synthesis','font-variant','font-weight','height','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','min-height','min-width','opacity','orphans','outline','outline-color','outline-style','outline-width','overflow','padding','padding-bottom','padding-left','padding-right','padding-top','page-break-after','page-break-before','page-break-inside','position','quotes','right','table-layout','text-align','text-decoration','text-indent','text-transform','top','transform','transform-origin','transition','transition-delay','transition-duration','transition-property','transition-timing-function','unicode-bidi','vertical-align','visibility','white-space','widows','width','word-spacing','z-index'];
	var d = document,
		sel = function(s, b) {
			return b ? d.querySelectorAll(s) : d.querySelector(s);
		},
		NO_XHR_MSG,XHR_FAILED_MSG;

	var c = sel('*', true),
		cs = [],i,j;
	for (i = 0; i < c.length; i++)
		if (c[i].hasAttribute('m-enable'))
			cs.push(c[i]);
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
			throw new Error(NO_XHR_MSG);
		}
	},
	getResponse = function(url, func, boole) {
		var xhr = createXHR(),
			bool = typeof boole == 'undefined' ? true : boole;
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4) {
				if((xhr.status >= 200 && xhr.status < 300)
						|| xhr.status == 304) {
					var allText = xhr.responseText;
					if (typeof func != 'undefined')
						func(allText);
					else
						return allText;
				} else {
					this.e.innerHTML = XHR_FAILED_MSG 
						+ '  [status:'+xhr.status+']';
				}
			}
		}.bind(this)
		xhr.open("get", url, bool);
		xhr.send(null);
	}.bind(this),
	C = { // Composer
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
	},
	R = { // Reader
		check: function(id) {
			var keys = Object.keys(this.properties);
			if (typeof id !== 'number') return '';
			if (id >= 0 && id < keys.length) {
				var val = this.properties[keys[id]];
				return val == 'on' ? true 
					: (val == 'off' ? false : val);
			}
			return '';
		},
		gl: function(removeComments) { // get line
			return removeComments 
				? this.lns[this.ln - 1].replace(/#.*/,'')
				: this.lns[this.ln - 1];
		},
		lnl: function() { // lines length
			return this.lns.length;
		},
		hasNext: function () {
			return this.ln - 1 < this.lnl();
		},
		lineToElement: function(createElement) {
			var pureElement = this.gl(true).replace(/\s+[\s\S]*/,'');
			console.log(pureElement);
			return createElement
				? C.createElement(pureElement)
				: pureElement;
		}
	},
	A = { // Appender
		New: function(x) {
			x.unshift(R.ln);
			this.arr.push(x);
			if (x[1] == 'element_start')
				this.tag_level += 1;
			if (this.tag_level > 0 && x[1] == 'element_end')
				this.tag_level -= 1;
		},
		print: function() {
			return this.arr;
		},
		together: function(el) {
			if (R.check(1))
				console.log('------------- APPENDER  -----------');
			var els = A.print(),
				inner = '',
				tags = [];
			for (i = 0; x = els[i]; i++) {
				if (R.check(1))
					console.log(els[i]);
				var type = els[i][1],
					value = els[i][2];
				switch(type) {
					case 'element_start':
						tags.push(value);
						inner += '<' + value + '>';
						break;
					case 'text':
						if (
							(i != els.length - 1 
								&& !value.endsWith('\\')
								&& els[i + 1][1] != ']'
							))
							inner += value,
							R.check(1) ? 
								console.log('!!! 1') : void(0);
						else inner += /\\+/.test(value) 
									? value : value.replace(/\\+$/, ''),
								R.check(1) ? 
									console.log('!!! 2') : void(0);
						break;
					case 'EOL': // End Of Line
						if ((i > 0 && els[i - 1][1] != 'element_start' 
									&& els[i - 1][1] != 'element_end') 
							&& (i > 1 && els[i - 2][1] != 'element_start'
									&& els[i - 2][1] != 'element_end'
									&& /\s+/.test(els[i - 1][2])) )
							inner += '<br>';
						if (R.check(1))
							console.log((i > 0 && els[i - 1][1] != 'element_start'), 
								(i > 1 && els[i - 2][1] != 'element_start'
									&& /\s+/.test(els[i - 1][2])));
						break;
					case 'element_end':
						if (tags.length == 0) {
							C.error(els[i][0], 'There\'s an unwanted closing parenthesis in your .mi file.', el);
							return;
						}
						inner += '</' + tags[tags.length - 1] + '>';
						tags.pop();
						break;
				}
			}
			return inner;
		}.bind(this)
	}

	this.render = function(r, el) {
		R.ln = 1;
		R.lns = [];
		R.properties = {
			'remove_spaces_at_start': 'on',
			'console_output': 'off'
		};
		A.arr = [];
		A.tag_level = 0;
		R.lns = r.split(/\n/g); // /\n/g
		var l, tag = '', ch, newTag, val_prop, value, property;
		while (R.hasNext()) {
			l = R.gl(true);
			if (/@.+:\s*.+/.test(l)) {
				val_prop = l.split(/:\s*/);
				value = val_prop[0].replace(/^@/,'');
				if (!R.properties.hasOwnProperty(value)) {
					C.error(R.ln, 'Unknown property: ' + value + '.', el);
					return;
				}
				property = val_prop[1].replace(/\s+$/,'');
				R.properties[value] = property;
				R.ln++;
				continue;
			}
			if (A.arr.length > 0 
					&& A.tag_level > 0
					&& R.check(0))
				l = l.replace(/^(\t| {4})/, '');

			//tag = ''; // reset tag
			for (i = 0; i < l.length; i++) {
				ch = l[i];
				if (ch == '#') break; // stop after the beginning of the comment

				var consoleLog = '%c- ' + R.ln + ', \'' + ch
						+ '\', ' + ch.charCodeAt(0);
				if (ch != ']') {
					R.check(1) ? 
						console.log('@ -',/^.+[\s\n]+$/.test(tag)) : void(0);
					if (/^.+[\s\n]+$/.test(tag)) {
						if (/[\s\n]/.test(ch))
							tag += ch,
							R.check(1) ?
									console.log('!! 0') : void(0);
						else if (ch == '[')
							A.New(['element_start', tag.replace(/^\s*|\s*$/g,'')]),
							tag = '',
							R.check(1) ?
								console.log('!! 1') : void(0);
						else
							A.New(['text', tag]),
							tag = ch,
							R.check(1) ?
								console.log('!! 2') : void(0);
					} else {
						if (/[a-zA-Z0-9-\s\n]/.test(ch)) {
							tag += ch;
							if (i == l.length - 1)
								A.New(['text', tag]),
								tag = '',
								A.New(['EOL', '']),
								R.check(1) ?
									console.log('!! 3') : void(0);
						} else if (ch == '\\') {
							//ch += '\\';
							if (tag.length > 0 && tag.endsWith('\\'))
								tag += ch,
								R.check(1) ?
									console.log('!! 4 - 1', tag) : void(0);
							else 
								A.New(['text', tag]),
								tag = ch,
								R.check(1) ?
									console.log('!! 4 - 2', tag) : void(0);
						} else {
							A.New(['text', 
								(tag.endsWith('\\') ? tag.replace(/\\?$/,'') : tag)
								+ ch]),
							tag = '',
							R.check(1) ?
								console.log('!! 5') : void(0);
						}
					}
				}
				else if (tag != '\\')
					A.New(['text', tag]),
					A.New(['element_end', '']),
					tag = '',
					R.check(1) ?
						console.log('!! 6') : void(0);
				else A.New(['text', ch]),
					tag = '',
					R.check(1) ? 
						console.log('!! 7') : void(0);

				R.check(1) ? 
					console.log(consoleLog + ', "' + tag + '"',
						'color: white;font-weight:bolder;background:#aaa;padding:0 10px;')
					: void(0);
			}
			R.ln++;
		}
		R.ln--;
		A.New(['text', tag]);

		if (A.print().length == 0) return;
		el.innerHTML = '';
		var newInner = A.together(el);
		if (typeof newInner !== 'undefined') el.innerHTML += newInner;

	}
	if (typeof this.e !== 'undefined')
		getResponse(this.e.getAttribute('m-enable') + '.mi',
			function(r, el){
				this.render(r, el);
			}.bind(this),
			true);
}