import { Player } from "@minecraft/server";

Player.prototype.applyImpulse = function (vector) {
    const horizontal = Math.sqrt(vector.x * vector.x + vector.z * vector.z) * 2.0;
    this.applyKnockback(vector.x, vector.z, horizontal, vector.y < 0.0 ? 0.5 * vector.y : vector.y);
};