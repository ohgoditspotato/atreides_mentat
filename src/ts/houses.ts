export const ALL_HOUSE_NAMES = ["harkonen", "guild", "emperor", "bene", "fremen"] as const;
export type house_name_type = typeof ALL_HOUSE_NAMES;
export type house_name_t = house_name_type[number];

function assert_never(): never {
    throw new Error("Missing case in switch");
}

export function house_name_str(name: house_name_t) {
    switch (name) {
        case "bene": return "Bene Geserit";
        case "harkonen": return "Harkonen";
        case "fremen": return "Fremen"
        case "guild": return "Spacing Guild";
        case "emperor": return "The Emperor"
        default: return assert_never();
    }
}