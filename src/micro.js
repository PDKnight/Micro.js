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
	this.version = '1.2.5';
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
	},
	getResponse = function(url, func, err, boole) {
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
					/*val == 'on' ? true 
					: (val == 'off' ? false : val)*/;
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
			read: function(r, err, version) {
				if (r.length == 0) return [[1, 'text', '']];
				this.R.lns = r.split(/\n/);

				var l, tag = '', ch, newTag, val_prop, value, property;
				while (this.R.hasNext()) {
					l = this.R.gl();
					if (/^@.+/.test(l)) {
						var importRe = /^@import\s+([^\s\n]+)\s*$/,
							titleRe = /^@title\s+(.+)\s*$/;
						if (importRe.test(l)) {
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
						} else if (/^@[^:]+:\s*.+/.test(l)) { // console_output RE: ([\s\n]+if\s*\(this\.R\.check\(1\)\))?[\s\n]+console\.log\(([^;]|\n)+;[^\n]*
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
					for (i = 0; i < l.length; i++) {
						ch = l[i];
						if (ch == '#' 
							&& !this.A.brackets.started()) break; // stop after the beginning of the comment

						var consoleLog = '%c- ' + this.R.ln + ', \'' + ch
								+ '\', ' + ch.charCodeAt(0),
							elz = this.A.arr;

						if ((elz.length > 0 
									&& (
										(ch == '(' && this.A.brackets.level == 0)
										|| (ch == ')' && this.A.brackets.level == 1)
										|| this.A.brackets.started()
									)
								) || (elz.length == 0 && this.R.tagRe.test(tag)
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
										tag += ch.charCodeAt(0) == 13/* && this.R.ln == this.R.lns.length*/
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
							}
						}

						if (ch != ']') {
							if (/^[a-zA-Z0-9-]+[\s\n]+$/.test(tag)) {
								if (/[\s\n]/.test(ch)) {
									tag += ch;
								} else if (ch == '[') {
									this.A.New(['element_start', tag.replace(/^\s+|\s+$/g,'')]);
									tag = '';
								} else {
									this.A.New(['text', tag]);
									tag = ch;
								}
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
										//}
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
												this.A.New(['element_start', ''/*finalTag.replace(/^\s+|\s+$/g,'')*/]);
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
				'menu': ['div', 'class="menu"'],
				'menu-brand': ['img', 'class="menu-brand"'],
				'menu-item': ['div', 'class="menu-item"']
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
			together: function(err) {
				var els = this.A.print(),
					inner = '',
					tags = [],
					startedBrackets = false, x;
				for (i = 0; x = els[i]; i++) {
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
								//|| /[^\[]*\[$/.test(value)
							)
						) {
						this.A.pReset();
					}

					switch(type) {
						case 'element_start':
							var tagname = this.A.tag,
								tagname_r = tagname.replace(/^\s+|\s+$/,''),
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

							if (this.A.components.hasOwnProperty(tagname_r)) {
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
								if (propsTranslated == 'err') return;
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
											failed = false,
											readd = Micro.read(value, false, false, function(e, ln) {
												ln = ln || 'unknown';
												failed = 'Error at line ' + ln + ': ' + e;
											});
										inner += '(' + readd + (closedProperties ? ')' : '');
										if (failed) return failed;
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
								var failed = false,
								readd = Micro.read(props 
										+ (props.split('\n').length > 1 
											? String.fromCharCode(13) : ''), false, false, function(e, ln) {
									ln = ln || 'unknown';
									failed = 'Error at line ' + ln + ': ' + e;
								}),
								inn = '(' + readd + (this.A.closedProperties ? ')' : '');
								if (failed) return failed;
								inner += inn;
								this.A.pReset();
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
									//continue;
								}
							}

							if (
								(i < els.length - 1 
									&& !value.endsWith('\\')
									&& els[i + 1][2] != ']'
									&& els.length > 1
								)) {
									inner += isFullEl && this.R.tagRe.test(value) ? '' : (tags.length > 0 
										? (
											!RegExp("<" 
													+ tags[tags.length - 1] 
													+ "\\s*(\\s*[a-zA-Z0-9-]+\\s*=\\s*(\"[^\"]*\"|'[^']*'))*>$").test(inner)
												&& whitespaceRE.test(value)
											? '' : value
										) : (
											i > 0
												? (
													/^\s*\[[\s\n]*$/.test(value)
														? (els[i - 1][1] == 'element_start' ? value : '')
														: value
												)
												: (/^\s*\[[\s\n]*$/.test(value) ? '' : value)
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
					}
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
			arr = core.R.read(r, err, this.version);
		if (b) return arr;
		var newInner = core.A.together(err),
			d2 = new Date().getTime(),
			ret = failed ? failed : newInner;
		return ms ? [d2 - d, ret, core.A.responses] : ret;
	}

	this.render = function(r, el, el2) {
		if (!r) return;
		if (!el) el = this.e;

		var inn = this.read(r, true),
			responses = inn[2], k, kk, l, ll,
			innerMatch = el.innerHTML.match(/[\s\S]+(?=(<style\s*(?:\s*[a-zA-Z0-9-]+\s*=\s*(?:\"[^\"]*\"|'[^']*'))*>[\s\S]+<\/style>.*|<script\s*(?:\s*[a-zA-Z0-9-]+\s*=\s*(?:\"[^\"]*\"|'[^']*'))*>[\s\S]+<\/script>.*))/),
			dd;
		if (el2) el2.innerHTML = inn[0] + 'ms';
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
		el.innerHTML = inn[1];
		if (dd) {
			el.innerHTML += dd.innerHTML;
			return;
		}
		if (responses) {
			if (responses.styles.length > 0)
				for (k = 0; kk = responses.styles[k]; k++) {
					getResponse(kk, function(r, kk) {
						el.innerHTML += '<style id="' + kk + '">' + r + '</style>';
					}, function(e) {
						el.innerHTML = e;
					}, true);
				}
			if (responses.scripts.length > 0)
				for (k = 0; kk = responses.scripts[k]; k++) {
					getResponse(kk, function(r) {
						eval(r);
					}, function(e) {
						el.innerHTML = e;
					}, true);
				}
		}
	}
	if (typeof this.e !== 'undefined')
		getResponse(this.e.getAttribute('m-enable') + '.mi',
			function(r){
				this.render(r);
			}.bind(this),
			function(e) {
				this.e.innerHTML = e;
			}.bind(this),
			true);
}
