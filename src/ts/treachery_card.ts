export interface weapon_card {
  id: string;
  kind: "Weapon";
  type: "Projectile" | "Poison" | "Lasgun";
}

export interface defence_card {
  id: string;
  kind: "Defense";
  type: "Shield" | "Snooper";
}

export interface useless_card {
  id: string;
  kind: "Useless";
}

export interface special_card {
  id: string;
  kind: "Special";
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
  deck_id: number;
}

export type treachery_card_t =
  | weapon_card
  | defence_card
  | useless_card
  | special_card

export const list_priorities: { [key in treachery_card_t["kind"]]: number } = {
  Weapon: 0,
  Defense: 1,
  Special: 2,
  Useless: 3,
};
