/**
 * 航旅纵横开屏广告拦截
 * 根据请求头 rpid 判断是否为广告请求
 */
const headers = $request.headers || {};
const rpid = (headers.rpid || headers.Rpid || headers.RPID || "").toString();

if (rpid.includes("1000002") || rpid.includes("1000019")) {
  $done({
    response: {
      status: 404,
      headers: { "Content-Type": "text/plain" },
      body: ""
    }
  });
} else {
  $done({});
}
