/**
 * Constructor for Node2D objects
 * @constructor
 * @param {Map2D} map  A Map object for the node to reside in
 */
var Node2D = function (map, x, y) {
    "use strict";
    this.list = [];
    this.map = map;
    this.x = x;
    this.y = y;
};
/**
 * Adds a sprite to the Node
 * @param {object} sprite  An object with x, y
 * @return {int}           Index of the sprite in the Node's list
 */
Node2D.prototype.add = function (sprite) {
    "use strict";
    var i = this.list.indexOf(sprite);
    if (i === -1) {
        i = this.list.length;
        this.list.push(sprite);
    }
    return i;
};
/**
 * Removes a sprite from the Node
 * @param  {object} sprite  An object with x, y
 */
Node2D.prototype.remove = function (sprite) {
    "use strict";
    var i = this.list.indexOf(sprite);
    if (i === -1) {
        return;
    }
    this.list.splice(i, 1);
};
/**
 * Clears the sprites from the Node
 */
Node2D.prototype.clear = function () {
    "use strict";
    this.list = [];
};

/**
 * Runs a command against all sprites
 * @param  {Function(sprite)} fn  A command that recieves a sprite
 */
Node2D.prototype.all = function (fn) {
    "use strict";
    var i, l;
    for (i = 0, l = this.list.length; i < l; i += 1) {
        fn(this.list[i]);
    }
};
