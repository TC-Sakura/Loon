/*
  Surge / Loon 脚本实现 QX 的 response-body、request-body 重写类型
  
  示例：
  argument=false->true
  支持正则：argument=\w+->test
  支持正则修饰符：argument=/\w+/g->test
  支持多参数：argument=匹配值1->替换值1&匹配值2->替换值2
  
  必须开启 requires-body=true
*/

function getRegexp(re_str) {
	let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
	if (regParts) {
		return new RegExp(regParts[1], regParts[2]);
	} else {
		return new RegExp(re_str);
	}
}

let body;
if (typeof $argument == "undefined") {
	console.log("requires $argument");
} else {
	if ($script.type === "http-response") {
		body = $response.body;
	} else if ($script.type === "http-request") {
		body = $request.body;
	} else {
		console.log("script type error");
	}
}

if (body) {
	$argument.split("&").forEach((item) => {
		let [match, replace] = item.split("->");
		let re = getRegexp(match);
		body = body.replace(re, replace);
	});
	$done({ body });
} else {
	console.log("Not Modify");
	$done({});
}
