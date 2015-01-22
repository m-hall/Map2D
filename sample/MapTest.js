(function () {
    "use strict";

    var canvas,
        context;
    function init() {
        canvas = document.createElement('canvas');
        canvas.style.width = "500px";
        canvas.style.height = "500px";
        canvas.width = 1000;
        canvas.height = 1000;
        document.body.appendChild(canvas);

        context = canvas.getContext('2d');
    }
    function load() {
        init();

    }

    window.addEventListener('load', load, false);
}());