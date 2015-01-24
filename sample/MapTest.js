(function () {
    "use strict";

    var canvas,
        context,
        map,
        nSprites = 200,
        theSprite;

    function makeSprite() {
        var r = 5 + Math.random() * 20;
        return {
            x: Math.random() * (1000 - r * 2) + r,
            y: Math.random() * (1000 - r * 2) + r,
            radius: r
        };
    }
    function init() {
        var i;
        canvas = document.createElement('canvas');
        canvas.style.width = "500px";
        canvas.style.height = "500px";
        canvas.width = 1000;
        canvas.height = 1000;
        document.body.appendChild(canvas);

        context = canvas.getContext('2d');
        map = new Map2D(1000, 1000);
        for (i = 0; i < nSprites; i++) {
            map.add(makeSprite());
        }
        theSprite = makeSprite();
    }
    function renderSprite(sprite) {
        context.moveTo(sprite.x + sprite.radius, sprite.y);
        context.arc(sprite.x, sprite.y, sprite.radius, 0, Math.PI * 2);
    }
    function render() {
        var collisions,
            i,
            l;

        context.clearRect(0, 0, 1000, 1000);

        context.beginPath();
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        map.all(renderSprite);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "rgba(0, 255, 0, 0.5)";
        collisions = map.collisions(theSprite);
        for (i = 0, l = collisions.length; i < l; i++) {
            renderSprite(collisions[i]);
        }
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "rgba(0, 0, 255, 0.5)";
        renderSprite(theSprite);
        context.fill();
        context.closePath();

    }
    function load() {
        init();
        render();
    }

    window.addEventListener('load', load, false);
}());