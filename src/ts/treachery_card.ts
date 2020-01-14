export interface weapon_card {
  kind: "WEAPON";
  type: "Projectile" | "Poison" | "Lasgun";
}

export interface defence_card {
  kind: "DEFENSE";
  type: "Shield" | "Snooper";
}

export interface useless_card {
  kind: "USELESS";
}

export interface special_card {
  kind: "SPECIAL";
  type:
    | "Truthtrance"
    | "Tleilaxu Ghola"
    | "Karama"
    | "Cheap Hero"
    | "Hajr"
    | "Weather Control"
    | "Family Atomics";
}

export interface unknown_card {
  kind: "UNKNOWN"
}

export type treachery_card_t = weapon_card | defence_card | useless_card | special_card | unknown_card;
export type treachery_card_kind = treachery_card_t["kind"];
export type special_card_type = special_card["type"];
export type weapon_card_type = weapon_card["type"];
export type defence_card_type = defence_card["type"];
