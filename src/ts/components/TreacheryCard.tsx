import * as React from "react";
import { treachery_card_t, treachery_card_kind } from "ts/treachery_card";

const treachery_card_colours: { [key in treachery_card_kind]: { text: string; bg: string } } = {
  defence: { text: "white", bg: "link" },
  special: { text: "white", bg: "info" },
  useless: { text: "black", bg: "warning" },
  weapon: { text: "white", bg: "danger" },
  unknown: { text: "white", bg: "black" },
};

const TreacheryCard: React.FC<{ card: treachery_card_t }> = props => {
  const colour = treachery_card_colours[props.card.kind];
  let subtitle = "";
  if (props.card.kind !== "unknown" && props.card.kind !== "useless") {
    subtitle = props.card.type;
  } else {
    subtitle = props.card.kind;
  }
  return (
    <div className="card has-text-centered">
      <header className={"card-header has-background-" + colour.bg + " has-text-" + colour.text}>
        <p className="is-uppercase">{props.card.kind}</p>
      </header>
      <div className="card-content">
        <p className="subtitle is-5 is-capitalized">{subtitle}</p>
        {props.children}
      </div>
    </div>
  );
};

export default TreacheryCard;
