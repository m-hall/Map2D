(function () {
    "use strict";

    var canvas,
        context,
        width = 500,
        height = 500,
        map,
        nSprites = 50,
        theSprite,
        lastTime;

    function makeSprite() {
        var r = 5 + Math.random() * 20;
        return {
            x: Math.random() * (width - r * 2) + r,
            y: Math.random() * (height - r * 2) + r,
            radius: r,
            velocity: (50 + Math.random() * 100) / 1000,
            angle: Math.PI * 2 * Math.random()
        };
    }
    function init() {
        var i;
        canvas = document.createElement('canvas');
        canvas.style.width = "500px";
        canvas.style.height = "500px";
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        context = canvas.getContext('2d');
        map = new Map2D(width, height, {blockSize: 50});
        for (i = 0; i < nSprites; i++) {
            map.add(makeSprite());
        }
        theSprite = makeSprite();
        theSprite.radius = 50;
    }
    function renderSprite(sprite) {
        context.moveTo(sprite.x + sprite.radius, sprite.y);
        context.arc(sprite.x, sprite.y, sprite.radius, 0, Math.PI * 2);
    }
    function updateSprite(delta, sprite) {
        var distance = sprite.velocity * delta,
            x = Math.sin(sprite.angle) * distance,
            y = Math.cos(sprite.angle) * distance;
        sprite.x = (sprite.x + x) % width;
        sprite.y = (sprite.y + y) % height;
        if (sprite.x < 0) {
            sprite.x = width;
        }
        if (sprite.y < 0) {
            sprite.y = height;
        }
    }
    function updateMapSprite(delta, sprite) {
        map.remove(sprite);
        updateSprite(delta, sprite);
        map.add(sprite);
    }
    function render() {
        var delta = lastTime ? Date.now() - lastTime : 0,
            collisions,
            i,
            l,
            perf;

        perf = window.performance.now();
        updateSprite(delta, theSprite);
        map.all(updateMapSprite.bind(this, delta));

        collisions = map.collisions(theSprite);
        console.log(collisions.length, window.performance.now() - perf);

        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        map.all(renderSprite);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "rgba(0, 255, 0, 0.5)";
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
        lastTime = Date.now();
        window.requestAnimationFrame(render);
    }
    function load() {
        init();
        render();
    }

    window.addEventListener('load', load, false);
}());