/**
 * replace_proxytools.js
 * 同时关闭广告弹窗 + 导航按钮
 */
let body = $response.body;

if (typeof body === "string") {
    // 1. 关闭广告弹窗提示
    body = body.replace(/\/\*ProxyTools\*\//g, "localStorage.setItem('limbo_ad_notice_closed', '1');");

    // 2. 关闭右下角导航按钮（核心）
    body = body.replace(
        /settingCookie\('daohangMode_global',\s*'true',\s*'400'\);/g,
        "settingCookie('daohangMode_global', 'false', '400');"
    );

    // 可选：彻底禁用导航功能（连快捷唤起也关掉）
    // body = body.replace(/daohang_build\(\);/g, "// daohang_build();");

    $done({ body });
} else {
    $done({});
}
