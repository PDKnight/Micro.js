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
	this.version = '1.2';
	var d = document,
		sel = function(s, b) {
			return b ? d.querySelectorAll(s) : d.querySelector(s);
		},
		NO_XHR_MSG,XHR_FAILED_MSG;

	var c = sel('*', true),
		cs = [];
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
	Core = function() {
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
				return removeComments && !this.A.brackets.started()
					? this.R.lns[this.R.ln - 1].replace(/#.*/,'')
					: this.R.lns[this.R.ln - 1];
			}.bind(this),
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
			},
			read: function(r, err) {
				this.R.ln = 1;
				this.R.lns = [];
				this.R.properties = {
					'remove_spaces_at_start': 'on',
					'console_output': 'off'
				};
				this.A.arr = [];
				this.A.tag_level = 0;
				this.R.lns = r.split(/\n/);
				this.A.brackets = {
					started: false,
					text: '',
					state: -1,
					append: function(s) {
						this.text += s;
					},
					started: function() {
						return this.state > -1;
					}
				};

				var l, tag = '', ch, newTag, val_prop, value, property;
				while (this.R.hasNext()) {
					l = this.R.gl(true);
					if (/@.+:\s*.+/.test(l)) {
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
					if (this.A.arr.length > 0 
							&& this.A.tag_level > 0
							&& this.R.check(0))
						l = l.replace(/^(\t| {4})/, '');

					//tag = ''; // reset tag
					for (i = 0; i < l.length; i++) {
						ch = l[i];
						//if (ch == '#' && !this.A.brackets.started()) break; // stop after the beginning of the comment

						var consoleLog = '%c- ' + this.R.ln + ', \'' + ch
								+ '\', ' + ch.charCodeAt(0);

						if (this.A.brackets.started()) {
							if (ch == '\)'
									|| (i == l.length - 1 && this.R.ln == this.R.lns.length)
								) {
								this.A.brackets.state = -1;
								this.A.New(['properties', tag + (ch == '\)' ? '' : ch)]);
								tag = '';
								this.R.check(1) ?
									console.log('!! 2 - 3') : void(0);
							} else
								tag += ch + (i == l.length - 1 ? '\n' : ''),
								this.R.check(1) ?
									console.log('!! 2 - 2') : void(0);
							this.R.check(1) ? 
								console.log(consoleLog + ', "' + tag + '"',
									'color: white;font-weight:bolder;background:#aaa;padding:0 10px;')
								: void(0);
							continue;
						} else {
							if (ch == '\(') {
								this.A.brackets.state = 0;
								this.A.New(['text', tag]);
								tag = '';
								this.R.check(1) ?
									console.log('!! 2 - 1') : void(0);
								this.R.check(1) ? 
									console.log(consoleLog + ', "' + tag + '"',
										'color: white;font-weight:bolder;background:#aaa;padding:0 10px;')
									: void(0);
								continue;
							}
						}

						if (ch != ']') {
							this.R.check(1) ? 
								console.log('@ -',/^[^\s\n]+[\s\n]+$/.test(tag)) : void(0);
							if (/^[^\s\n]+[\s\n]+$/.test(tag)) {
								if (/[\s\n]/.test(ch))
									tag += ch,
									this.R.check(1) ?
											console.log('!! 0') : void(0);
								else if (ch == '[')
									this.A.New(['element_start', tag.replace(/^\s*|\s*$/g,'')]),
									tag = '',
									this.R.check(1) ?
										console.log('!! 1') : void(0);
								else
									this.A.New(['text', tag]),
									tag = ch,
									this.R.check(1) ?
										console.log('!! 3') : void(0);
							} else {
								if (/[a-zA-Z0-9-\s\n]/.test(ch)) {
									tag += ch;
									if (i == l.length - 1)
										this.A.New(['text', tag]),
										tag = '',
										this.A.New(['EOL', '']),
										this.R.check(1) ?
											console.log('!! 4') : void(0);
								} else if (ch == '\\') {
									//ch += '\\';
									if (tag.length > 0 && tag.endsWith('\\'))
										tag += ch,
										this.R.check(1) ?
											console.log('!! 5 - 1', tag) : void(0);
									else 
										this.A.New(['text', tag]),
										tag = ch,
										this.R.check(1) ?
											console.log('!! 5 - 2', tag) : void(0);
								} else if (ch == '[') {
									this.A.New(['element_start', 
										(tag.endsWith('\\') 
											? tag.replace(/\\?$|^\s*|\s*$/g,'') 
											: tag.replace(/^\s*|\s*$/g,''))]),
									tag = '',
									this.R.check(1) ?
										console.log('!! 6') : void(0);
								} else {
									this.A.New(['text', 
										(tag.endsWith('\\') ? tag.replace(/\\?$/,'') : tag)
										+ ch]),
									tag = '',
									this.R.check(1) ?
										console.log('!! 7') : void(0);
								}
							}
						}
						else if (tag != '\\')
							this.A.New(['text', tag]),
							this.A.New(['element_end', '']),
							tag = '',
							this.R.check(1) ?
								console.log('!! 8', this.A.arr) : void(0);
						else this.A.New(['text', ch]),
							tag = '',
							this.R.check(1) ? 
								console.log('!! 9') : void(0);

						this.R.check(1) ? 
							console.log(consoleLog + ', "' + tag + '"',
								'color: white;font-weight:bolder;background:#aaa;padding:0 10px;')
							: void(0);
					}
					this.R.ln++;
					/*if (/^[\s\n]*$/.test(l) && !this.A.brackets.started()) {
						this.A.New(['text', tag]),
						tag = '',
						this.A.New(['EOL', '']),
						this.R.check(1) ?
							console.log('!! 10') : void(0);
					}*/
				}
				this.R.ln--;
				if (!/^[\s\n]*$/.test(tag))
					this.A.New(['text', tag]);

				return this.A.arr;
			}.bind(this)
		};
		this.A = { // Appender
			tag: '',
			properties: '',
			propsLine: 0,
			tag_level: 0, // for Reader
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
				var k, foundStart = false, startTag = '';
				for (k = i + 1; kk = els[k]; k++) {
					if (els[i][2] == 'c ')
						console.log(kk, foundStart, startTag);
					if (!foundStart) {
						if (kk[1] == 'EOL'
								|| (b ? kk[1] == 'properties' : false)
							)
							continue;
						if (kk[1] == 'text') {
							if (/^[^\\]*\]$/.test(kk[2]))
								return false;
							if (/^[\s\n]*$/.test(kk[2]))
								continue;
							else if (/^\s*\[$/.test(kk[2]))
								foundStart = true;
							else {
								/*if (!startTag) startTag = kk[2];
								else */return false;
							}
						} else if (kk[1] == 'element_start') {
							if (/^[\s\n]*$/.test(kk[2]))
								foundStart = true;
							else return false;
						} else if (kk[1] == 'element_end')
							return false;
					} else {
						if ( (kk[1] == 'text' && /^[^\\]*\]$/.test(kk[2]))
								|| kk[1] == 'element_end' )
							return true;
					}
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
					parts = kk.split(/\s*:(.*)\s*/);
					prop = parts[0].replace(/^\s+|\s+$/,'').toLowerCase();
					val = parts[1].replace(/^\s+|\s+$/,'');
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
			together: function(err) {
				if (this.R.check(1))
					console.log('------------- APPENDER  -----------');
				var els = this.A.print(),
					inner = '',
					tags = [],
					startedBrackets = false;

				if (this.R.check(1))
						console.log('Elements length:',els.length);
				for (i = 0; x = els[i]; i++) {
					if (this.R.check(1))
						console.log(i, x);
					var type = x[1],
						value = x[2];

					if ((type == 'text' 
							&& !/(^\s*\[$|^[\s\n]*$)/.test(value))
							|| (type == 'element_start' && !/^[\s\n]*$/.test(value)) ) {

						this.A.tag = value;
					} else if (type != 'properties'
							&& !/(^\s*\[$|^[\s\n]*$)/.test(value)) {
						this.A.tag = '';
					}

					if (type == 'properties') {
						this.A.properties = value;
						this.A.propsLine = x[0];
					} else if (
						type == 'text' && (
								!/[^\[]*\[$/.test(value)
								&& !/[\s\n]+/.test(value)
								//|| /[^\[]*\[$/.test(value)
							)
						) {
						this.A.properties = '';
					}

					switch(type) {
						case 'element_start':
							if (!/^[\s\n]*$/.test(value)) tags.push(value);
							if (this.R.check(1))
								console.log(this.A.tg_level(tags),
									this.A.tag.length,
									inner,
									inner.endsWith('>'));
							var tagname = this.A.tag,
								tagname_r = tagname.replace(/^\s+|\s+$/,''),
								props = this.A.properties;

							if (props.length > 0) {
								var re = RegExp('('+ tagname +')((<br>|\\s|\\n)*)$'),
									replace = inner.replace(re, '');
								inner = replace;
								this.R.check(1) ? 
									console.log("Replaced last inner: '"+inner+"', '"+tagname+"'," +re+", '"+replace+"'") : void(0);
								inner += '<' + tagname_r;
								tags.push(tagname_r);
								this.R.check(1) ? 
									console.log("%cFound properties: '" + props + "'", 'color: white;font-weight:bolder;background:#5a5;padding:0 10px;') : void(0);
								var propsTranslated = this.A.readProperties(props, this.A.propsLine, err, true);
								if (propsTranslated == 'err') return;
								if (this.R.check(1)) console.log(propsTranslated);
								inner += propsTranslated == null ? '' : propsTranslated
									+ '>';
								this.A.properties = '';
								this.A.tag = '';
								if (this.R.check(1))
									console.log(this.A.print(inner));
								continue;
							}
							if (i > 0 && els[i - 1][1] == 'element_start'
									&& tags.length > 1
									&& els[i - 1][2] == tags[tags.length - 2]
									&& !RegExp("<" 
												+ tags[tags.length - 1] 
												+ "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner)) {
								inner += '>';
								if (this.R.check(1))
									console.log('!!! 0');
							}

							if (value.length == 0)
								inner += '<' + tagname_r,
								tags.push(tagname_r);
							else inner += '<' + value;

							this.A.tag = value;
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

							if (i > 1 && this.A.tag
									&& this.A.properties) {
								var props = this.A.properties;
								if (this.A.isNearElement(els, i)
										&& /^(<br>|\s|\n)*$/.test(value))
									continue;

								if (/^\s*\[$/.test(value)) {
									var tagname = this.A.tag,
										tagname_r = tagname.replace(/^\s+|\s+$/,''),
										re = RegExp('('+ tagname +')((<br>|\\s|\\n)*)$'),
										replace = inner.replace(re, '');
									inner = replace;
									this.R.check(1) ? 
										console.log("Replaced last inner: '"+inner+"', '"+tagname+"'," +re+", '"+replace+"'") : void(0);
									inner += '<' + tagname_r;
									tags.push(tagname_r);
									this.R.check(1) ? 
										console.log("%cFound properties: '" + props + "'", 'color: white;font-weight:bolder;background:#5a5;padding:0 10px;') : void(0);
									inner += '>';
									this.A.properties = '';
									if (this.R.check(1))
										console.log(this.A.print(inner));
									continue;
								} else {
									var failed = false,
										inn = '(' + Micro.read(props, false, false, function(e, ln) {
											ln = ln || 'unknown';
											failed = 'Error at line ' + ln + ': ' + e;
										}) + ')';
									if (failed) return failed;
									if (this.R.check(1))
										console.log(tags, i, this.R.properties);
									inner += inn;
									this.A.properties = '';
								}
							} else if (i > 0 && els[i - 1][1] == 'element_start'
									&& !RegExp("<" 
										+ tags[tags.length - 1] 
										+ "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner) )
								inner += '>',
								this.R.check(1) ? 
									console.log('!!! 1') : void(0);
							if (this.R.check(1))
								console.log('isFullEl:',isFullEl);

							if (
								(i < els.length - 1 
									&& !value.endsWith('\\')
									&& els[i + 1][2] != ']'
									&& (
										els.length > 1
									)
								)) {
									inner += isFullEl ? '' : (tags.length > 0 
										? (
											!RegExp("<" 
													+ tags[tags.length - 1] 
													+ "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner)
												&& whitespaceRE.test(value)
											? '' : value
										)
										: value);
									if (this.R.check(1))
										console.log('!!! 2');
								}
							else inner += /\\+/.test(value) 
										? value : value.replace(/\\+$/, ''),
									this.R.check(1) ? 
										console.log('!!! 3') : void(0);
							break;
						case 'EOL': // End Of Line
							var isNearElement = this.A.isNearElement(els, i);
							if (isNearElement && this.A.tag)
								inner += this.A.tag,
								this.A.tag = '';
							if ((i > 0 
									? (els[i - 1][1] != 'element_start' 
										&& els[i - 1][1] != 'element_end')
									: true ) 
								&& (i > 1 ? els[i - 2][1] != 'element_start' : true)
								/*&& (
									i > 2 
										&& this.A.tag 
											? (els[i - 1][1] == 'text'
												? this.A.properties.length > 0
													? !isNearElement
													: isNearElement
												: true)
											: true
								*/)
								inner += '<br>';
							if (this.R.check(1))
								console.log(i, (i > 0 && els[i - 1][1] != 'element_start'), 
									i > 1 ? els[i - 2][1] != 'element_start' : true
										/*&& /\s+/.test(els[i - 1][2])*/,
										isNearElement);
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
					}
					if (this.R.check(1))
						console.log(this.A.print(inner));
				}
				return inner;
			}.bind(this)
		};
	};
	this.read = function(r, ms, b, err) {
		var d = new Date().getTime(),
			failed = false;
		if (!err) err = function(e, ln) {
			ln = ln || 'unknown';
			failed = 'Error at line ' + ln + ': ' + e;
		}
		var core = new Core(),
			arr = core.R.read(r, err);
		if (b) return arr;
		if (arr.length == 0) return '';
		var newInner = core.A.together(err),
			d2 = new Date().getTime(),
			ret = failed ? failed : newInner;
		return ms ? [d2 - d, ret] : ret;
	}

	this.render = function(r, el, el2) {
		if (!r) return;
		if (!el) el = this.e;

		var inn = this.read(r, true);
		if (el2) el2.innerHTML = inn[0] + 'ms';
		el.innerHTML = inn[1];
	}
	if (typeof this.e !== 'undefined')
		getResponse(this.e.getAttribute('m-enable') + '.mi',
			function(r, el){
				this.render(r, el);
			}.bind(this),
			true);
}
