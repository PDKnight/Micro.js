/* ********************************************************* *\
|  Micro.js framework made by PDKnight. All rights reserved.  |
|               For more information please visit             |
|             https://github.com/PDKnight/Micro.js.           |
\* ********************************************************* */


var Micro = new function() {
	this.e;
	this.version = '1.1';
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
	if (cs.length != 1) {
		throw new Error('Please use only one element with \'m-enable\' attribute!');
		return;
	}
	this.e = cs[0];

	NO_XHR_MSG = 'No XHR, no more fun.';
	XHR_FAILED_MSG = 'The XHR failed :(';
	var createXHR =  function () {
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
	get = function(url, func, boole) {
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
					throw new Error(XHR_FAILED_MSG 
						+ '  [status:'+xhr.status+']');
				}
			}
		}
		xhr.open("get", url, bool);
		xhr.send(null);
	},
	C = { // Composer
		createElement: function(s) {
			return d.createElement(s);
		}.bind(this),
		arrToEl: function(arr, b) {
			el = this.createElement(arr[0].replace(/\s+$/,''));
			el.innerHTML = arr[2];
			el.innerHTML = el.innerHTML.replace(/(^\n|\n$)/gm,'');
			return b ? el.outerHTML : el;
		}
	},
	R = { // Reader
		ln: 0,
		lns: [],
		gl: function(removeComments) { // get line
			return removeComments 
				? this.lns[this.ln].replace(/#.*/,'')
				: this.lns[this.ln];
		},
		lnl: function() { // lines length
			return this.lns.length;
		},
		hasNext: function () {
			return this.ln < this.lnl();
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
		arr: [],
		new: function(x) {
			x.unshift(R.ln);
			this.arr.push(x);
		},
		print: function() {
			return this.arr;
		},
		together: function() {
			console.log('------------- APPENDER  -----------');
			var els = A.print(),
				inner = '',
				tags = [];
			for (i = 0; x = els[i]; i++) {
				console.log(els[i]);
				var type = els[i][1],
					value = els[i][2];
				switch(type) {
					case 'element_start':
						tags.push(value);
						inner += '<' + value + '>';
						break;
					case 'text':
						inner += value;
						break;
					case 'EOL': // End Of Line
						if ((i > 0 && els[i - 1][1] != 'element_start' 
									&& els[i - 1][1] != 'element_end') 
							&& (i > 1 && els[i - 2][1] != 'element_start'
									&& els[i - 2][1] != 'element_end'
									&& /\s+/.test(els[i - 1][2])) )
							inner += '<br>';
						console.log((i > 0 && els[i - 1][1] != 'element_start'), 
							(i > 1 && els[i - 2][1] != 'element_start'
									&& /\s+/.test(els[i - 1][2])));
						break;
					case 'element_end':
						if (tags.length == 0) {
							this.e.innerHTML = 'Error at line '+els[i][0]+': There\'s an unwanted closing parenthesis in your .mi file.';
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


	get(this.e.getAttribute('m-enable') + '.mi', function(r) {

	/*if (/[\s\S]*header\s*(\[[\s\S]*\])?[\s\S]* /.test(r)) { // vymazat medzeru pred ukoncenim regexu
		var header = C.createElement('header');
		this.e.appendChild(header);
	}*/

	R.lns = r.split(/\n/g);
	var l, tag, ch, newTag,
		els 	= [], // elements in .mi file
		inn		= ''; // new innerHTML
	while (R.hasNext()) {
		l = R.gl(true);
		/*if (els.length == 0) {
			els.push(R.lineToElement(true));
		}*/
		if (els.length > 0 
				&& els[els.length - 1][1] == 'r')
			l = l.replace(/^(\t| {4})/, '');

		tag = ''; // reset tag
		for (i = 0; i < l.length; i++) {
			ch = l[i];
			if (ch == '#') break; // stop after the beginning of the comment
			var consoleLog = '%c- \'' + ch
					+ '\', ' + ch.charCodeAt(0) + ' ' +
					+ (els.length == 0 
						|| (els.length>0 ? els[els.length - 1][1] != 'r' : false));
			console.log(consoleLog,
					'color: white;font-weight:bolder;background:#aaa;padding:0 10px;');

			if (ch != ']') {
				console.log('%c!-! \''+tag+'\' '+(/^.+[\s\n]*$/.test(tag))+', '+(/[\s\n]/.test(ch))+', '+(/[a-zA-Z0-9-\s\n]/.test(ch)),'color:red;');
				if (/^.+[\s\n]+$/.test(tag)) {
					if (/[\s\n]/.test(ch)) {
						tag += ch;
						if (i == l.length - 1)
							console.log('toto je BOD 1!'),
							A.new(['text', tag]);
					} else if (ch == '[')
						A.new(['element_start', tag.replace(/^\s*|\s*$/g,'')]),
						tag = '';
					else
						console.log('%c   !! ' + tag, 'color:blue;font-weight: bolder;'),
						A.new(['text', tag]),
						tag = ch;
				} else {
					if (/[a-zA-Z0-9-\s\n]/.test(ch)) {
						console.log('!--! \''+tag+"' '"+ch+"'"+", '"+(tag+ch)+"', "+ch.charCodeAt(0)),
						tag += ch;
						if (i == l.length - 1)
							console.log('toto je BOD 3!'),
							A.new(['text', tag]),
							A.new(['EOL', '']);
					} else
						console.log('toto je BOD 2!'),
						A.new(['text', tag + ch]),
						tag = '';
				}
				console.log(' ',tag, /^.+[\s\n]+$/.test(tag));
			}
			else
				console.log('!!! tag:',tag),
				A.new(['text', tag]),
				A.new(['element_end', '']),
				tag = '';

			/*console.log(' ',els.length, tag.length, 
				!!els[0] ? els[0] : [], 
				!!els[1] ? els[1] : [], 
				!!els[2] ? els[2] : []);*/
		}
		R.ln++;
	}

	/*if (els.length == 0) return;
	for (i = 0; i < els.length; i++) {
		inn += C.arrToEl(els[i], true);
	}*/
	if (A.print().length == 0) return;
	this.e.innerHTML = '';
	this.e.innerHTML += A.together();

	}.bind(this), true);
}