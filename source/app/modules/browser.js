export const Browser = {
    language : () => navigator.language,
    OS       : () => navigator.platform,
    Chrome   : () => navigator.userAgent.indexOf("Chrome")  != -1,
    IE       : () => navigator.userAgent.indexOf("MSIE")    != -1,
    Safari   : () => navigator.userAgent.indexOf("Safari")  != -1,
    Mozilla  : () => navigator.userAgent.indexOf("Firefox") != -1,
};