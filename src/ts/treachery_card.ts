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

export interface unknown_card_t {
  deck_index: number;
}

export type treachery_card_t = weapon_card | defence_card | useless_card | special_card;

const list_priorities: { [key in treachery_card_t["kind"]]: number } = {
  Weapon: 0,
  Defense: 1,
  Special: 2,
  Useless: 3,
};

export function card_sort(a: treachery_card_t, b: treachery_card_t): number {
  if (a.kind !== b.kind) {
    return list_priorities[a.kind] - list_priorities[b.kind];
  }
  if (a.kind === "Weapon" && b.kind === "Weapon") {
    if (a.type === b.type) return 0;
    else if (a.type === "Projectile") {
      return 1;
    } else {
      return -1;
    }
  }
  else if (a.kind === "Defense" && b.kind === "Defense") {
    if (a.type === b.type) return 0;
    else if (a.type === "Shield") {
      return 1;
    } else {
      return -1;
    }
  } else {
    return a.id.localeCompare(b.id);
  }
}
