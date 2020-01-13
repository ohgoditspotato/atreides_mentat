export interface weapon_card {
  kind: "weapon";
  type: "projectile" | "poison" | "lasgun";
}

export interface defence_card {
  kind: "defence";
  type: "shield" | "snooper";
}

export interface useless_card {
  kind: "useless";
}

export interface special_card {
  kind: "special";
  type:
    | "truthtrance"
    | "tleilaxughola"
    | "karama"
    | "cheap hero"
    | "hajr"
    | "weather control"
    | "family atomics";
}

export type treachery_card = weapon_card | defence_card | useless_card | special_card;
export type treachery_card_kind = treachery_card["kind"];
export type special_card_type = special_card["type"];
export type weapon_card_type = weapon_card["type"];
export type defence_card_type = defence_card["type"];
