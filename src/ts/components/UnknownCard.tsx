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
  interface CardCounter {
   [key: string]: Array<any>;
  };
  let cardCounter:CardCounter = {};

  for (let i = 0; i < deck.cards.length; i++) {
    const card = deck.cards[i];
    var key;
    if (card.kind === "Useless" || card.kind === "Special") {
      key = card.kind;
    } else {
      key = card.type;
    }
    let tempCards = cardCounter[key] ? cardCounter[key] : [];
    tempCards.push(card);
    cardCounter[key] = tempCards;
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
    cardCounter["Special"].forEach(s => {
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
                {Object.keys(cardCounter).map(key => {
                  return <Tag label={key} val={cardCounter[key].length} colour_key={cardCounter[key][0].kind} />;
                })}
              </div>
            )}
            {show_special_details && (
              <div className="columns is-multiline">
                {cardCounter["Special"].map(card => {
                  return <Tag label={card.type} val={countSpecials(card.type)} />;
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UnknownCard;
