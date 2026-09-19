/**
 * replace_proxytools.js
 * Quantumult X Response Body Replacement Script
 * Target: https://limbopro.com/Adguard/Adblock4limbo.user.js
 *
 * ========================================================
 * Quantumult X 配置文件追加（请复制下方内容至配置文件中）：
 *
 * [rewrite_local]
 * # 匹配 Adblock4limbo.user.js 并修改其响应体
 * ^https?://limbopro.com/Adguard/Adblock4limbo.user.js url script-response-body replace_proxytools.js
 *
 * [mitm]
 * # 必须配置 hostname 解密 HTTPS 流量
 * hostname = limbopro.com
 * ========================================================
 */
let body = $response.body;
// 确保 body 存在且为文本字符串
if (typeof body === "string") {
    // 原来的替换逻辑
    const replacement = "localStorage.setItem('limbo_ad_notice_closed', '1');";
    body = body.replace("/*ProxyTools*/", replacement);

    // 将 daohang_build(); 替换为 //daohang_build();
    body = body.replace("daohang_build();", "//daohang_build();");

    $done({ body });
} else {
    // 响应体为空或非字符串类型，不进行修改直接返回
    $done({});
}
