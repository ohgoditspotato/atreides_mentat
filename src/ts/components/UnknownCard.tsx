import React from "react";
import { special_card } from "ts/treachery_card";
import { useSelector } from "react-redux";
import { root_state_t } from "ts/state/reducers";
import { treachery_card_colours, treachery_card_icons } from "ts/components/TreacheryCard";

const UnknownCard: React.FC<{
  deck_index: number;
  onClick?: () => void;
  onDelete?: () => void;
  onIdentify?: () => void;
  small?: boolean;
}> = ({ onClick, onDelete, onIdentify, deck_index, small }) => {
  const { deck, deck_tracking } = useSelector((root_state: root_state_t) => {
    return {
      deck: root_state.game.current.decks[deck_index],
      deck_tracking: root_state.game.deck_tracking,
    };
  });

  const [show_special_details, set_show_special_details] = React.useState(false);

  const colours = treachery_card_colours.Unknown;
  let projectiles = 0;
  let poisons = 0;
  let lasguns = 0;
  let shields = 0;
  let snoopers = 0;
  let useless = 0;
  let specials: special_card[] = [];

  for (let i = 0; i < deck.cards.length; i++) {
    const card = deck.cards[i];
    switch (card.kind) {
      case "Defense": {
        if (card.type === "Shield") {
          shields++;
        } else {
          snoopers++;
        }
        break;
      }
      case "Weapon": {
        switch (card.type) {
          case "Lasgun":
            lasguns++;
            break;
          case "Poison":
            poisons++;
            break;
          case "Projectile":
            projectiles++;
            break;
        }
        break;
      }
      case "Special": {
        specials.push(card);
        break;
      }
      case "Useless": {
        useless++;
        break;
      }
    }
  }

  let className = "card treachery-card";
  if (onClick) {
    className += " is-hoverable";
  }
  if (small) {
    className += " small";
  }

  const Tag: React.FC<{
    val: number;
    label: string;
    colour_key?: keyof typeof treachery_card_colours;
  }> = ({ val, label, colour_key }) => {
    if (!val) return null;
    if (!colour_key) {
      colour_key = "Special";
    }
    return (
      <div className="column full-tag">
        <span className={"tag is-medium is-" + treachery_card_colours[colour_key].bg}>
          {label} {Math.round((val * 100) / deck.cards.length)}%
        </span>
      </div>
    );
  };

  function countSpecials(key: special_card["type"]) {
    let count = 0;
    specials.forEach(s => {
      if (s.type === key) {
        count++;
      }
    });
    return count;
  }

  return (
    <div className={className} onClick={onClick}>
      <header
        className={"modal-card-head has-background-" + colours.bg}
        style={{ padding: "0 20px" }}
      >
        <figure className="image is-32x32 level-item">{treachery_card_icons.Unknown(32)}</figure>
        <div className={"card-header-title has-text-" + colours.text}>Unknown</div>
        {onDelete ? <button className="delete" onClick={onDelete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">
        {small ? (
          <p className="heading">The future is uncertain</p>
        ) : (
          <>
            <div className="buttons">
              {deck_tracking && (
                <button className="button is-info is-outlined is-small" onClick={onIdentify}>
                  <span className="icon">
                    <i className="fas fa-info" />
                  </span>
                  <span>Identify</span>
                </button>
              )}
              <button
                className="button is-link is-outlined is-small"
                onClick={() => set_show_special_details(!show_special_details)}
              >
                <span className="icon">
                  <i className="fas fa-redo"></i>
                </span>
                <span>{show_special_details ? "Show others" : "Show specials"}</span>
              </button>
            </div>
            {!show_special_details && (
              <div className="columns is-multiline is-mobile">
                <Tag label="Projectile" val={projectiles} colour_key="Weapon" />
                <Tag label="Poison" val={poisons} colour_key="Weapon" />
                <Tag label="Lasguns" val={lasguns} colour_key="Weapon" />
                <Tag label="Shield" val={shields} colour_key="Defense" />
                <Tag label="Snooper" val={snoopers} colour_key="Defense" />
                <Tag label="Special" val={specials.length} colour_key="Special" />
                <Tag label="Useless" val={useless} colour_key="Useless" />
              </div>
            )}
            {show_special_details && (
              <div className="columns is-multiline">
                <Tag label="Cheap Hero" val={countSpecials("Cheap Hero")} />
                <Tag label="Family Atomics" val={countSpecials("Family Atomics")} />
                <Tag label="Hajr" val={countSpecials("Hajr")} />
                <Tag label="Karama" val={countSpecials("Karama")} />
                <Tag label="Tleilaxu Ghola" val={countSpecials("Tleilaxu Ghola")} />
                <Tag label="Truthtrance" val={countSpecials("Truthtrance")} />
                <Tag label="Weather Control" val={countSpecials("Weather Control")} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UnknownCard;
