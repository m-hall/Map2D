
/**
 * A basic pathfinding algorithm for 2D grid space
 * @interface
 * @constructor
 * @param {Map2D} map  A 2D grid map
 */
var Heuristic = function (map) {
    "use strict";
    this.map = map;
};

/**
 * Nodes adjacent to the current node
 * @param  {Node2D}        node  A map Node
 * @return {Array<Node2D>}       A list of map nodes
 */
Heuristic.prototype.adjacent = function (node) {
    "use strict";
    return [];
};
/**
 * Calculates the distance between 2 nodes
 * @param  {Node2D} nodeA  A map node
 * @param  {Node2D} nodeB  A map node
 * @return {float}         A numeric distance
 */
Heuristic.prototype.distance = function (nodeA, nodeB) {
    "use strict";
    var x = nodeA.x - nodeB.x,
        y = nodeA.y - nodeB.y;
    return Math.sqrt(x * x + y * y);
};