import React from "react";
import { treachery_card_t } from "ts/treachery_card";
import TreacheryCard, { treachery_card_colours } from "ts/components/TreacheryCard";

const ExpandableCardList: React.FC<{ cards: Array<treachery_card_t> }> = ({ cards }) => {
  const [expand, set_expand] = React.useState(false);

  return (
    <div className="box">
      <div className="columns is-vcentered">
        <div className="column">
          <div className="tags">
            {!expand &&
              cards.map((card, index) => {
                const colour = treachery_card_colours[card.kind].bg;
                let text: string = card.kind;
                switch (card.kind) {
                  case "Weapon":
                  case "Defense":
                  case "Special": {
                    text = card.type;
                    break;
                  }
                }
                return (
                  <span className={"tag is-medium is-" + colour} key={card.id}>
                    {text}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="column is-narrow">
          <button
            className="button is-fullwidth is-link is-outlined"
            onClick={() => set_expand(!expand)}
          >
            <span className="icon">
              <i className={"fas fa-angle-" + (expand ? "up" : "down")} />
            </span>
            <span>View</span>
          </button>
        </div>
      </div>
      {expand && (
        <>
          <hr />
          <div className="columns is-multiline">
            {cards.map(card => (
              <div className="column is-half is-one-quarter-desktop" key={card.id}>
                <TreacheryCard card={card} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandableCardList;
