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

    this.list = [];
    this.map = {};

    this.reset();
};
Map2D.prototype.blockSize = 10;
Map2D.prototype.nodeConstructor = Node2D;
Map2D.prototype.heuristic = Heuristic;

/**
 * Fills the map with nodes based on width, height and blockSize
 */
Map2D.prototype.fill = function () {
    "use strict";

};
/**
 * Resets the map
 */
Map2D.prototype.reset = function () {
    "use strict";
    this.fill();
};
/**
 * Removes all sprites from the map
 */
Map2D.prototype.clear = function () {
    "use strict";
};
/**
 * Adds a sprite to the map
 * @param {object} sprite  A sprite object with x, y, and a defined size
 */
Map2D.prototype.add = function (sprite) {
    "use strict";
};
/**
 * Removes a sprite from the map
 * @param  {object} sprite  A sprite object with x, y and a defined size
 */
Map2D.prototype.remove = function (sprite) {
    "use strict";

};
/**
 * Runs a command against all sprites
 * @param  {Function(sprite)} fn  A command that recieves a sprite
 */
Map2D.prototype.all = function (fn) {
    "use strict";
    var i, l;
    for (i = 0, l = this.list.length; i < l; i += 1) {
        fn(this.list[i]);
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