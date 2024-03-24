
const SpeedMap = {
    "NONE": "§8",
    "SLOW": "§a",
    "MEDIUM": "§b",
    "FAST": "§d"
}

const StressMap = {
    "LOW": "§a",
    "MEDIUM": "§e",
    "HIGH": "§6",
    "OVERSTRESSED": "§c"

}
class SpeedLevel {
    static of(speed) {
        speed = Math.abs(speed);
        if (speed >= 100)
            return SpeedMap.FAST;
        if (speed >= 30)
            return SpeedMap.MEDIUM;
        if (speed >= 1)
            return SpeedMap.SLOW;
        return "NONE";

    }
}

class StressImpact {
    static of(stressPercent) {
        if (stressPercent > 1)
            return StressMap.OVERSTRESSED;
        if (stressPercent > .75)
            return StressMap.HIGH;
        if (stressPercent > .5)
            return StressMap.MEDIUM;
        return StressMap.LOW;
    }
}

export {
    SpeedLevel,
    StressImpact
}