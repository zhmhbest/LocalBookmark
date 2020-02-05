/**
 * StringBuffer
 */
function StringBuffer() {
	this.__strings__ = new Array;
}
StringBuffer.prototype.append = function (str) {
	this.__strings__.push(str);
	return this;
};
StringBuffer.prototype.append = function (str, offset, length) {
	this.__strings__.push(str.substr(offset, length));
	return this;
};
StringBuffer.prototype.toString = function () {
	return this.__strings__.join("");
};

/**
 * String
 */
String.prototype.replaceall = function(_fd, _to) {
	return this.replace(new RegExp(_fd, "g"), _to);
}
String.prototype.toIntegerFromBinary = function() {
	return parseInt(this.replaceall(" ", ""), 2);
}

/**
 * Number
 */
Number.prototype.toBinaryString = function() {
	var str = this.toString(2);
	if(str.length < 8) {
		str = "0".repeat(8 - str.length) + str;
	}
	var mod = str.length % 4;
	var buf = new StringBuffer();
	if(0!=mod) {
		buf.append(str, 0, mod).append(" ");
	}
	for(i=mod; i<str.length; i+=4) {
		buf.append(str, i, 4).append(" ");
	}
	//console.log(buf.toString());
	return buf.toString();
}
Number.prototype.isNaN = function() {
	return isNaN(this);
}

/**
 * Cbinary
 */
function PrintCbin(id_cbin, num) {
		switch(num) {
		case 254: id_cbin[0].value = "0xFF << 1 & 0xFF"; id_cbin.show(); break;
		case 252: id_cbin[0].value = "0xFF << 2 & 0xFF"; id_cbin.show(); break;
		case 248: id_cbin[0].value = "0xFF << 3 & 0xFF"; id_cbin.show(); break;
		case 240: id_cbin[0].value = "0xFF << 4 & 0xFF"; id_cbin.show(); break;
		case 224: id_cbin[0].value = "0xFF << 5 & 0xFF"; id_cbin.show(); break;
		case 192: id_cbin[0].value = "0xFF << 6 & 0xFF"; id_cbin.show(); break;

		case 128: id_cbin[0].value = "0x01 << 7 = 0xFF << 7 & 0xFF"; id_cbin.show(); break;

		case 127: id_cbin[0].value = "0xFF >> 1"; id_cbin.show(); break;
		case 64 : id_cbin[0].value = "0x01 << 6"; id_cbin.show(); break;
		case 63 : id_cbin[0].value = "0xFF >> 2"; id_cbin.show(); break;
		case 32 : id_cbin[0].value = "0x01 << 5"; id_cbin.show(); break;
		case 31 : id_cbin[0].value = "0xFF >> 3"; id_cbin.show(); break;
		case 16 : id_cbin[0].value = "0x01 << 4"; id_cbin.show(); break;
		case 15 : id_cbin[0].value = "0xFF >> 4"; id_cbin.show(); break;
		case 8  : id_cbin[0].value = "0x01 << 3"; id_cbin.show(); break;
		case 7  : id_cbin[0].value = "0xFF >> 5"; id_cbin.show(); break;
		case 4  : id_cbin[0].value = "0x01 << 2"; id_cbin.show(); break;
		case 3  : id_cbin[0].value = "0xFF >> 6"; id_cbin.show(); break;
		case 2  : id_cbin[0].value = "0x01 << 1"; id_cbin.show(); break;
		case 1  : id_cbin[0].value = "0xFF >> 7"; id_cbin.show(); break;
		default:
			id_cbin.hide();
			break;
		}
}

$(function(){
	var id_bin = $('#text_bin');
	var id_cbin = $('#text_cbin'); id_cbin.hide();
	var id_oct = $('#text_oct');
	var id_dec = $('#text_dec');
	var id_hex = $('#text_hex');
	var id_texts = [id_bin, id_oct, id_dec, id_hex];
	var id_his = $('#caculate_history');

	text_hex.onchange = text_dec.onchange = text_oct.onchange = text_bin.onchange = function() {
		//PrintHistory
		id_his.prepend(
			'<tr>' +
				'<td>' + id_texts[0][0].value + '</td>' +
				'<td>' + id_texts[1][0].value + '</td>' +
				'<td>' + id_texts[2][0].value + '</td>' +
				'<td>' + id_texts[3][0].value + '</td>' +
			'</tr>'
		);
	}

	//二进制
	text_bin.onkeyup = function(){
		console.log('bin');
		var num = (id_bin[0].value).toIntegerFromBinary();
		if(num.isNaN()) {
			return;
		}
		//id_bin[0].value = num.toBinaryString();
		id_oct[0].value = num.toString(8);
		id_dec[0].value = num.toString(10);
		id_hex[0].value = num.toString(16);
		PrintCbin(id_cbin, num);
	};

	//八进制
	text_oct.onkeyup = function(){
		console.log('oct');
		var num = parseInt(id_oct[0].value, 8);
		if(num.isNaN()) {
			return;
		}
		id_bin[0].value = num.toBinaryString();
		//id_oct[0].value = num.toString(8);
		id_dec[0].value = num.toString(10);
		id_hex[0].value = num.toString(16);
		PrintCbin(id_cbin, num);
	};

	//十进制
	text_dec.onkeyup = function(){
		console.log('dec');
		var num = parseInt(id_dec[0].value, 10);
		if(num.isNaN()) {
			return;
		}
		id_bin[0].value = num.toBinaryString();
		id_oct[0].value = num.toString(8);
		//id_dec[0].value = num.toString(10);
		id_hex[0].value = num.toString(16);
		PrintCbin(id_cbin, num);
	};

	//16进制
	text_hex.onkeyup = function(){
		console.log('hex');
		var num = parseInt(id_hex[0].value, 16);
		if(num.isNaN()) {
			return;
		}
		id_bin[0].value = num.toBinaryString();
		id_oct[0].value = num.toString(8);
		id_dec[0].value = num.toString(10);
		//id_hex[0].value = num.toString(16);
		PrintCbin(id_cbin, num);
	};

});