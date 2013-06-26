$(document).ready(function () {
    var isIE = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
    var ieVer = new Number(RegExp.$1);
    if (isIE && (ieVer < 9)) {
        $('.signup').corner();
    }
});

