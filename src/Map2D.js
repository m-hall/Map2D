/*global Node2D */

/**
 * A 2D Grid Map
 * @param {int} width   Width of the map area
 * @param {int} height  Height of the map area
 * @param {object} options  Extra options for the Map object
 *   - blockSize        {integer}
 *   - nodeConstructor  {Node2D}
 */
var Map2D = function (width, height, options) {
    "use strict";
    options = options || {};

    this.width = width;
    this.height = height;
    this.list = [];

    if (options.blockSize) {
        this.blockSize = options.blockSize;
    }
    if (options.nodeConstructor) {
        this.nodeConstructor = options.nodeConstructor;
    }

    this.reset();
};
Map2D.prototype.blockSize = 10;
Map2D.prototype.nodeConstructor = Node2D;

/**
 * Fills the map with nodes based on width, height and blockSize
 */
Map2D.prototype.fill = function () {
    "use strict";

    var nodes = [],
        map = {},
        N = this.nodeConstructor,
        b = this.blockSize,
        w = this.width / b,
        h = this.height / b,
        node,
        i,
        j;

    for (i = 0; i < w; i += 1) {
        map[i] = {};
        for (j = 0; j < h; j += 1) {
            node = new N(this, i, j);
            nodes.push(node);
            map[i][j] = node;
        }
    }
    this.nodes = nodes;
    this.map = map;
};
/**
 * Resets the map
 */
Map2D.prototype.reset = function () {
    "use strict";
    this.clear();
    this.fill();
};
/**
 * Removes all sprites from the map
 */
Map2D.prototype.clear = function () {
    "use strict";
    var i,
        l;
    if (!this.nodes) {
        return;
    }
    for (i = 0, l = this.nodes.length; i < l; i += 1) {
        this.nodes[i].clear();
    }
};
/**
 * Gets the nodes in which a sprite resides
 * @param  {object} sprite A sprite object
 * @return {Array<Node2D>} A collection of nodes
 */
Map2D.prototype.whichNodes = function (sprite) {
    "use strict";
    var map = this.map,
        lx = Math.max(Math.floor((sprite.x - sprite.radius) / this.blockSize), 0),
        ly = Math.max(Math.floor((sprite.y - sprite.radius) / this.blockSize), 0),
        mx = Math.min(Math.ceil((sprite.x + sprite.radius) / this.blockSize), Math.ceil(this.width / this.blockSize)),
        my = Math.min(Math.ceil((sprite.y + sprite.radius) / this.blockSize), Math.ceil(this.height / this.blockSize)),
        b = this.blockSize,
        rect = {
            x: 0,
            y: 0,
            width: b,
            height: b
        },
        nodes = [],
        x,
        y;
    for (x = lx; x < mx; x++) {
        for (y = ly; y < my; y++) {
            rect.x = x * b;
            rect.y = y * b;
            if (map[x] && map[x][y] && this.distancePointRectangle(sprite, rect) < sprite.radius) {
                nodes.push(map[x][y]);
            }
        }
    }
    return nodes;
};
/**
 * Adds a sprite to the map
 * @param {object} sprite  A sprite object with x, y, and a defined size
 */
Map2D.prototype.add = function (sprite) {
    "use strict";
    var index = this.list.indexOf(sprite),
        nodes,
        i,
        l;
    if (index >= 0) {
        return false;
    }
    nodes = this.whichNodes(sprite);
    for (i = 0, l = nodes.length; i < l; i++) {
        nodes[i].add(sprite);
    }
    this.list.push(sprite);
    return nodes.length > 0;
};
/**
 * Removes a sprite from the map
 * @param  {object} sprite  A sprite object with x, y and a defined size
 */
Map2D.prototype.remove = function (sprite) {
    "use strict";
    var index = this.list.indexOf(sprite),
        nodes,
        i,
        l;
    if (index < 0) {
        return false;
    }
    nodes = this.whichNodes(sprite);
    for (i = 0, l = nodes.length; i < l; i++) {
        nodes[i].remove(sprite);
    }
    this.list.splice(index, 1);
    return nodes.length > 0;
};
/**
 * Runs a command against all sprites
 * @param  {Function(sprite)} fn  A command that recieves a sprite
 */
Map2D.prototype.all = function (fn) {
    "use strict";
    var i, l;
    for (i = 0, l = this.nodes.length; i < l; i += 1) {
        this.nodes[i].all(fn);
    }
};

/////////////////////////
// Collision functions //
/////////////////////////

/**
 * Calculates distance from a point to a rectangle
 * @param  {object} point  Point with x, y
 * @param  {object} rect   Rectangle with x, y, width, height
 * @return {float}         Distance value
 */
Map2D.prototype.distancePointRectangle = function (point, rect) {
    "use strict";

    var dx = Math.max(Math.min(point.x, rect.x + rect.width), rect.x),
        dy = Math.max(Math.min(point.y, rect.y + rect.height), rect.y);
    return Math.sqrt((point.x - dx) * (point.x - dx) + (point.y - dy) * (point.y - dy));
};
/**
 * Calculates the distance between 2 points
 * @param  {object} pointA  Point with x, y
 * @param  {object} pointB  Point with x, y
 * @return {float}          Distance value
 */
Map2D.prototype.distancePointPoint = function (pointA, pointB) {
    "use strict";
    var dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y;
    return Math.sqrt(dx * dx + dy * dy);
};
/**
 * Checks if a sprite collides with any other nodes in the map
 * @param  {object} sprite  A Sprite object with x, y and a defined size
 * @return {Array<object>}  A list of any other sprites this one collides with
 */
Map2D.prototype.collisions = function (sprite) {
    "use strict";
    var collisions = [],
        nodes = this.whichNodes(sprite),
        compare = this.compare.bind(this, collisions, sprite),
        i,
        l;

    for (i = 0, l = nodes.length; i < l; i++) {
        nodes[i].all(compare);
    }
    for (i = collisions.length; i--;) {
        if (collisions.indexOf(collisions[i]) !== i) {
            collisions.splice(i, 1);
        }
    }

    return collisions;
};
/**
 * Compares 2 sprites assuming that the first is a radial object
 * @param  {Array} collisions A collection to push collisions to
 * @param  {object} sprite1    A Sprite object with x, y and radius
 * @param  {object} sprite2    A Sprite object with x, y and a defined height
 */
Map2D.prototype.compare = function (collisions, sprite1, sprite2) {
    "use strict";
    if (sprite1 === sprite2) {
        return;
    } else if (this.distancePointPoint(sprite1, sprite2) < sprite1.radius + sprite2.radius) {
        collisions.push(sprite2);
    }
};
