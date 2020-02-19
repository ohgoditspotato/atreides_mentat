import React from "react";
import { treachery_card_t } from "ts/treachery_card";
import TreacheryCard, { treachery_card_colours } from "ts/components/TreacheryCard";

type card_summary = {
  [key in treachery_card_t["kind"]]: number;
};

const card_kinds = ["Weapon", "Defense", "Special", "Useless"] as const;

const ExpandableCardList: React.FC<{
  cards: Array<treachery_card_t>;
  onDelete?: (card_id: string) => void;
}> = ({ cards, onDelete }) => {
  const [expand, set_expand] = React.useState(false);
  const summary: card_summary = {
    Weapon: 0,
    Defense: 0,
    Special: 0,
    Useless: 0,
  };

  for (let card of cards) {
    summary[card.kind]++;
  }

  return (
    <div className="box">
      <div className="columns is-vcentered">
        <div className="column">
          <div className="tags">
            {card_kinds.map(key => {
              if (!summary[key]) return null;
              return (
                <span className={"tag is-medium is-" + treachery_card_colours[key].bg} key={key}>
                  {summary[key]} x {key}
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
                <TreacheryCard
                  card={card}
                  onDelete={onDelete ? () => onDelete(card.id) : undefined}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandableCardList;
