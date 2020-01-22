import { treachery_card_t } from "ts/treachery_card";

const initial_deck: ReadonlyArray<treachery_card_t> = [
  {
    id: "Chaumas",
    kind: "Weapon",
    type: "Poison",
  },
  {
    id: "Chaumurky",
    kind: "Weapon",
    type: "Poison",
  },
  {
    id: "Gom Jabbar",
    kind: "Weapon",
    type: "Poison",
  },
  {
    id: "Kriminon",
    kind: "Weapon",
    type: "Poison",
  },
  {
    id: "Slip-Tip",
    kind: "Weapon",
    type: "Projectile",
  },
  {
    id: "Slip-Tip",
    kind: "Weapon",
    type: "Projectile",
  },
  {
    id: "Maula Pistol",
    kind: "Weapon",
    type: "Projectile",
  },
  {
    id: "Chrysknife",
    kind: "Weapon",
    type: "Projectile",
  },
  {
    id: "Lasgun",
    kind: "Weapon",
    type: "Lasgun",
  },

  {
    id: "shield_1",
    kind: "Defense",
    type: "Shield",
  },
  {
    id: "shield_2",
    kind: "Defense",
    type: "Shield",
  },
  {
    id: "shield_3",
    kind: "Defense",
    type: "Shield",
  },
  {
    id: "shield_4",
    kind: "Defense",
    type: "Shield",
  },

  {
    id: "snooper_1",
    kind: "Defense",
    type: "Snooper",
  },
  {
    id: "snooper_2",
    kind: "Defense",
    type: "Snooper",
  },
  {
    id: "snooper_3",
    kind: "Defense",
    type: "Snooper",
  },
  {
    id: "snooper_4",
    kind: "Defense",
    type: "Snooper",
  },

  {
    id: "cheap hero 1",
    kind: "Special",
    type: "Cheap Hero",
  },
  {
    id: "cheap hero 2",
    kind: "Special",
    type: "Cheap Hero",
  },
  {
    id: "cheap hero 3",
    kind: "Special",
    type: "Cheap Hero",
  },
  {
    id: "karama 1",
    kind: "Special",
    type: "Karama",
  },
  {
    id: "karama 2",
    kind: "Special",
    type: "Karama",
  },
  {
    id: "truthtrance 1",
    kind: "Special",
    type: "Truthtrance",
  },
  {
    id: "truthtrance 2",
    kind: "Special",
    type: "Truthtrance",
  },
  {
    id: "family atomics",
    kind: "Special",
    type: "Family Atomics",
  },
  {
    id: "hajr",
    kind: "Special",
    type: "Hajr",
  },
  {
    id: "tleilaxu ghola",
    kind: "Special",
    type: "Tleilaxu Ghola",
  },
  {
    id: "weather control",
    kind: "Special",
    type: "Weather Control",
  },

  {
    id: "Baliset",
    kind: "Useless",
  },
  {
    id: "Jubba Cloak",
    kind: "Useless",
  },
  {
    id: "Kulon",
    kind: "Useless",
  },
  {
    id: "La La La",
    kind: "Useless",
  },
  {
    id: "Trip to Gamont",
    kind: "Useless",
  },
] as const;

export default initial_deck;
