import { treachery_card_t } from "ts/treachery_card";

const initial_card_pool: ReadonlyArray<{ card: treachery_card_t; num?: number }> = [
  {
    card: {
      kind: "Weapon",
      type: "Poison",
    },
    num: 4,
  },
  {
    card: {
      kind: "Weapon",
      type: "Projectile",
    },
    num: 4,
  },
  {
    card: {
      kind: "Weapon",
      type: "Lasgun",
    },
    num: 1,
  },

  {
    card: {
      kind: "Defense",
      type: "Shield",
    },
    num: 4,
  },
  {
    card: {
      kind: "Defense",
      type: "Snooper",
    },
    num: 4,
  },

  {
    card: {
      kind: "Special",
      type: "Cheap Hero",
    },
    num: 3,
  },
  {
    card: {
      kind: "Special",
      type: "Karama",
    },
    num: 2,
  },
  {
    card: {
      kind: "Special",
      type: "Truthtrance",
    },
    num: 2,
  },
  {
    card: {
      kind: "Special",
      type: "Family Atomics",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Hajr",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Tleilaxu Ghola",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Weather Control",
    },
    num: 1,
  },

  {
    card: {
      kind: "Useless",
    },
    num: 5,
  },

  {
    card: {
      kind: "Unknown",
    },
  },
] as const;

export default initial_card_pool;
