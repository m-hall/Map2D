/*global Heuristic */

/**
 * A 2D Grid Map
 * @param {int} width   Width of the map area
 * @param {int} height  Height of the map area
 * @param {object} options  Extra options for the Map object
 *   - blockSize {integer}
 *   - heuristic {Heuristic}
 *   - collision {Collision}
 */
var Map2D = function (width, height, options) {
    "use strict";
    options = options || {};

    this.width = width;
    this.height = height;

    this.blockSize = options.blockSize || 10;
    this.heuristic = options.heuristic || Heuristic;
    //this.collitions

    this.list = [];
    this.map = {};
};