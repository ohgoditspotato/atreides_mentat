function assertNever() {
    throw new Error("Missing case in switch");
}
export function houseNameStr(name) {
    switch (name) {
        case "bene": return "Bene Geserit";
        case "harkonen": return "Harkonen";
        case "fremen": return "Fremen";
        case "guild": return "Spacing Guild";
        case "emperor": return "The Emperor";
        default: return assertNever();
    }
}
