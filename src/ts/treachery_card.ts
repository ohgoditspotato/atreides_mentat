export interface weapon_card {
  id: string;
  kind: "Weapon";
  type: "Projectile"
  | "Poison"
  | "Lasgun"
  | "Artillery Strike"
  | "Poison Tooth"
  | "Poison Blade";
}

export interface weapon_defense_card {
  id: string;
  kind: "Weapon/Defense";
  type: "Weirding Way"
  | "Chemistry";
}

export interface defence_card {
  id: string;
  kind: "Defense";
  type: "Shield"
  | "Snooper"
  | "Shield Snooper";
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
  | "Family Atomics"
  | "Harvester"
  | "Thumper"
  | "Amal";
}

export interface unknown_card_t {
  deck_index: number;
}

export type treachery_card_t = weapon_card | defence_card | useless_card | special_card | weapon_defense_card;

const list_priorities: { [key in treachery_card_t["kind"]]: number } = {
  "Weapon/Defense": 0,
  Weapon: 1,
  Defense: 2,
  Special: 3,
  Useless: 4,
};

const list_weapon_priorities: { [key in weapon_card["type"]]: number } = {
  "Artillery Strike": 0,
  "Lasgun": 1,
  "Poison Tooth": 2,
  "Poison Blade": 3,
  "Projectile": 4,
  "Poison": 5
};

export function card_sort(a: treachery_card_t, b: treachery_card_t): number {
  if (a.kind !== b.kind) {
    return list_priorities[a.kind] - list_priorities[b.kind];
  }
  if (a.kind === "Weapon" && b.kind === "Weapon") {
    if (a.type === b.type) return 0;
    return list_weapon_priorities[a.type] - list_weapon_priorities[b.type];
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
