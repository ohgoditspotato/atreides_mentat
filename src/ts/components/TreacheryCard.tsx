import * as React from "react";
import { treachery_card_t, treachery_card_kind } from "ts/treachery_card";

const treachery_card_colours: { [key in treachery_card_kind]: { text: string; bg: string } } = {
  DEFENSE: { text: "white", bg: "link" },
  SPECIAL: { text: "white", bg: "info" },
  USELESS: { text: "black", bg: "warning" },
  WEAPON: { text: "white", bg: "danger" },
  UNKNOWN: { text: "white", bg: "black" },
};

const TreacheryCard: React.FC<{ card: treachery_card_t; onDelete?: () => void }> = props => {
  const colour = treachery_card_colours[props.card.kind];
  let subtitle = "";
  switch (props.card.kind) {
    case "UNKNOWN": {
      subtitle = "???";
      break;
    }
    case "USELESS": {
      subtitle = "This card has no effect";
      break;
    }
    default: {
      subtitle = props.card.type;
      break;
    }
  }
  return (
    <div className="message has-text-centered">
      <header className={"message-header has-background-" + colour.bg}>
        <p className={"card-header-title has-text-" + colour.text}>{props.card.kind}</p>
        {props.onDelete ? <button className="delete" onClick={props.onDelete}></button> : null}
      </header>
      <div className="message-body">
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default TreacheryCard;
