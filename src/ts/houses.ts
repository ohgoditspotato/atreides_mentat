export const ENEMY_HOUSE_NAMES = ["Bene Gesserit", "Emperor", "Fremen", "Harkonnen", "Spacing Guild", "Ixians", "Tleilaxu"] as const;
export type enemy_house_name_t = (typeof ENEMY_HOUSE_NAMES)[number];

export const ALL_HOUSE_NAMES = ["Atreides", ...ENEMY_HOUSE_NAMES] as const;
export type house_name_t = (typeof ALL_HOUSE_NAMES)[number];
