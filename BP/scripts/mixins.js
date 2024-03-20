import { Player, Block } from "@minecraft/server";

Player.prototype.applyImpulse = function (vector) {
    const horizontal = Math.sqrt(vector.x * vector.x + vector.z * vector.z) * 2.0;
    this.applyKnockback(vector.x, vector.z, horizontal, vector.y < 0.0 ? 0.5 * vector.y : vector.y);
};



/**
 * Gets adjacent blocks connected to the current block.
 * @this {Block}
 * @param {function(Block):void} filter A filter to apply to the search.
 * @memberof Block
 * @param {number} maxSearch The maximum number of blocks to search.
 * @returns {Block[]} - An array of adjacent blocks.
 */
Block.prototype.getAdjacent = function (filter, maxSearch) {
    const connectedBlocks = [];
    const visited = new Set();
    // Fix issue with directly passing in this.location to vec3 function
    const { x, y, z } = this.location;
    const queue = [vec3(x, y, z)];

    while (queue.length > 0 && connectedBlocks.length < maxSearch) {
        const currentPosition = queue.shift();
        visited.add(currentPosition);

        try {
            for (const direction of Vec3.directions) {
                const newPosition = currentPosition.add(direction);
                if (!visited.has(newPosition)) {
                    const adjacentBlock = this.dimension.getBlock(
                        vec3(newPosition.x, newPosition.y, newPosition.z)
                    );
                    if (adjacentBlock && filter(adjacentBlock)) {
                        connectedBlocks.push(adjacentBlock);
                        queue.push(newPosition);
                    }
                }
            }
        } catch (err) {
            console.warn(err, err.stack);
        }
    }

    return connectedBlocks;
}