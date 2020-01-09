export const ALL_HOUSE_NAMES = ["harkonen", "guild", "emperor", "bene", "fremen"] as const;
export type HouseNameTuple = typeof ALL_HOUSE_NAMES;
export type HouseName = HouseNameTuple[number];

function assertNever(): never {
    throw new Error("Missing case in switch");
}

export function houseNameStr(name: HouseName) {
    switch (name) {
        case "bene": return "Bene Geserit";
        case "harkonen": return "Harkonen";
        case "fremen": return "Fremen"
        case "guild": return "Spacing Guild";
        case "emperor": return "The Emperor"
        default: return assertNever();
    }
}