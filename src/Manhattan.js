/*global Heuristic */

/**
 * A pathfinding algorithm based on the Manhattan algorithms
 * @constructor
 * @implements {Heuristic}
 * @param {Map2D} map  A 2D grid map
 */
var Manhattan = function (map) {
    "use strict";
    this.map = map;
};
Manhattan.prototype = new Heuristic();
/**
 * Calculates the distance between 2 nodes
 * @param  {Node2D} nodeA  A map node
 * @param  {Node2D} nodeB  A map node
 * @return {float}         A numeric distance
 */
Manhattan.prototype.distance = function (nodeA, nodeB) {
    "use strict";
    var x = Math.abs(nodeA.x - nodeB.x),
        y = Math.abs(nodeA.y - nodeB.y);
    return x + y;
};