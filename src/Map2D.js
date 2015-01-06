/*global Heuristic, Node2D */

/**
 * A 2D Grid Map
 * @param {int} width   Width of the map area
 * @param {int} height  Height of the map area
 * @param {object} options  Extra options for the Map object
 *   - blockSize        {integer}
 *   - nodeConstructor  {Node2D}
 *   - heuristic        {Heuristic}
 */
var Map2D = function (width, height, options) {
    "use strict";
    options = options || {};

    this.width = width;
    this.height = height;

    if (options.blockSize) {
        this.blockSize = options.blockSize;
    }
    if (options.nodeConstructor) {
        this.nodeConstructor = options.nodeConstructor;
    }
    if (options.heuristic) {
        this.heuristic = options.heuristic;
    }

    this.reset();
};
Map2D.prototype.blockSize = 10;
Map2D.prototype.nodeConstructor = Node2D;
Map2D.prototype.heuristic = Heuristic;

Object.defineProperty(
    Map2D.prototype,
    "list",
    {
        get: function () {
            "use strict";
            var i,
                l,
                items = [];
            for (i = 0, l = this.nodes.length; i < l; i += 1) {
                items = items.concat(this.nodes[i].list);
            }
            return items;
        }
    }
);

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
        this.map[i] = {};
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
    for (i = 0, l = this.nodes.length; i < l; i += 1) {
        this.nodes[i].clear();
    }
};
/**
 * Adds a sprite to the map
 * @param {object} sprite  A sprite object with x, y, and a defined size
 */
Map2D.prototype.add = function (sprite) {
    "use strict";
    var x = Math.floor(sprite.x / this.blockSize),
        y = Math.floor(sprite.y / this.blockSize);

    if (!this.map[x] || !this.map[x][y]) {
        return false;
    }

    this.map[x][y].add(sprite);
    return true;
};
/**
 * Removes a sprite from the map
 * @param  {object} sprite  A sprite object with x, y and a defined size
 */
Map2D.prototype.remove = function (sprite) {
    "use strict";

    var x = Math.floor(sprite.x / this.blockSize),
        y = Math.floor(sprite.y / this.blockSize);

    if (!this.map[x] || !this.map[x][y]) {
        return false;
    }

    this.map[x][y].remove(sprite);
    return true;
};
/**
 * Runs a command against all sprites
 * @param  {Function(sprite)} fn  A command that recieves a sprite
 */
Map2D.prototype.all = function (fn) {
    "use strict";
    var i, l;
    for (i = 0, l = this.nodes.length; i < l; i += 1) {
        fn(this.nodes[i]);
    }
};

////////////////////
// Path functions //
////////////////////

/**
 * Generates a path from a sprites current location to end coordinates
 * @param  {object} sprite  A sprite object with x, y
 * @param  {object} end     A bounds object with x, y
 * @return {Path}           A path from the current node to the end node
 */
Map2D.prototype.pathTo = function (sprite, end) {
    "use strict";

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
    var collisions = [];

    return collisions;
};