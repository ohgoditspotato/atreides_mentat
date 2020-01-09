export interface WeaponCard {
  kind: "weapon";
  type: "projectile" | "poison" | "lasgun";
}

export interface DefenceCard {
  kind: "defence";
  type: "shield" | "snooper";
}

export interface UselessCard {
  kind: "useless";
}

export type TreacheryCard = WeaponCard | DefenceCard | UselessCard;