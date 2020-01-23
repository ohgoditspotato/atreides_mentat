import React from "react";
import { treachery_card_t } from "ts/treachery_card";
import { useSelector } from "react-redux";
import { root_state_t } from "ts/state/reducers";
import { treachery_card_colours, treachery_card_icons } from "ts/components/TreacheryCard";

const ALL_STAT_TYPES = [
  "Projectile",
  "Poison",
  "Lasgun",
  "Shield",
  "Snooper",
  "Special",
  "Useless",
] as const;
type stat_type = typeof ALL_STAT_TYPES[number];

const UnknownCard: React.FC<{
  deck_index: number;
  onClick?: () => void;
  onDelete?: () => void;
}> = ({ onClick, onDelete: on_delete, deck_index: deck_id }) => {
  const deck = useSelector((root_state: root_state_t) => {
    return root_state.game.current.decks[deck_id];
  });

  const colours = treachery_card_colours.Unknown;
  let counts: { [key in stat_type]: { count: number; kind: treachery_card_t["kind"] } } = {
    Projectile: {
      count: 0,
      kind: "Weapon",
    },
    Poison: {
      count: 0,
      kind: "Weapon",
    },
    Lasgun: {
      count: 0,
      kind: "Weapon",
    },
    Shield: {
      count: 0,
      kind: "Defense",
    },
    Snooper: {
      count: 0,
      kind: "Defense",
    },
    Special: {
      count: 0,
      kind: "Special",
    },
    Useless: {
      count: 0,
      kind: "Useless",
    },
  };

  for (let i = 0; i < deck.cards.length; i++) {
    const card = deck.cards[i];
    switch (card.kind) {
      case "Defense":
      case "Weapon": {
        counts[card.type].count++;
        break;
      }
      case "Special":
      case "Useless": {
        counts[card.kind].count++;
        break;
      }
    }
  }

  let className = "card";
  if (onClick) {
    className += " is-hoverable";
  }

  let style: React.CSSProperties = { height: "280px", overflowY: "auto" };
  if (onClick) {
    style.cursor = "pointer";
  }

  return (
    <div className={className} style={style} onClick={onClick}>
      <header
        className={"modal-card-head has-background-" + colours.bg}
        style={{ padding: "0 20px" }}
      >
        <figure className="image is-32x32 level-item">{treachery_card_icons.Unknown}</figure>
        <div className={"card-header-title has-text-" + colours.text}>Unknown</div>
        {on_delete ? <button className="delete" onClick={on_delete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">
        <div className="columns is-multiline is-mobile">
          {ALL_STAT_TYPES.map(key => {
            if (!counts[key].count) {
              return null;
            }
            const colour = treachery_card_colours[counts[key].kind].bg;
            return (
              <div className="column is-half full-tag" key={key}>
                <span className={"tag is-medium is-" + colour}>
                  {key} {((counts[key].count * 100.0) / deck.cards.length).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnknownCard;
