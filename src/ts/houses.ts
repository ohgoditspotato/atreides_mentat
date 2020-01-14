export const ENEMY_HOUSE_NAMES = ["HARKONNEN", "SPACING GUILD", "EMPEROR", "BENE GESERIT", "FREMEN"] as const;
export type enemy_house_name_t = (typeof ENEMY_HOUSE_NAMES)[number];

export const ALL_HOUSE_NAMES = ["ATREIDES", ...ENEMY_HOUSE_NAMES] as const;
export type house_name_t = (typeof ALL_HOUSE_NAMES)[number];