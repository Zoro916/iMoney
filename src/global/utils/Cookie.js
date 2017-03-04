//判断是否是android平台,并且支持localstroage
var global_localstroage = !!window.localStorage;
export function readCookie(k) {
    if (global_localstroage) {
        return window.localStorage.getItem(k);
    } else {
        let cookie = document.cookie;
        let pattern = new RegExp(k + '=(.*?)(;|$)');
        let match = pattern.exec(cookie);
        return match && decodeURIComponent(match[1]) || null;
    }

}

export function eraseCookie(k) {
    if (global_localstroage) {
        window.localStorage.removeItem(k);
    } {
        document.cookie = k + '=';
    }
}

export function createCookie(k, v, remember) {
    if (global_localstroage) {
        window.localStorage.setItem(k, v);
    } else {
        let cookie = k + '=' + encodeURIComponent(v);
        cookie += '; max-age=' + (remember || 60 * 60 * 24 * 7);
        document.cookie = cookie;
    }
}