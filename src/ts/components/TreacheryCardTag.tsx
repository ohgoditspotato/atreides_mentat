import React from "react";
import { treachery_card_t } from "../treachery_card";
import { treachery_card_icons, treachery_card_colours } from "./TreacheryCard";

const TreacheryCardTag: React.FC<{ card: treachery_card_t; onDelete?: () => void }> = ({
  card,
  onDelete,
}) => {
  const colour = treachery_card_colours[card.kind].bg;
  let text: string = card.kind;
  let icon: JSX.Element;
  switch (card.kind) {
    case "Useless": {
      icon = treachery_card_icons["Useless"](24);
      text = card.id;
      break;
    }
    case "Special": {
      icon = treachery_card_icons["Special"](24);
      text = card.type;
      break;
    }
    case "Weapon": {
      icon = treachery_card_icons[card.type](24);
      text = card.id;
      break;
    }
    case "Defense": {
      icon = treachery_card_icons[card.type](24);
      text = card.type;
      break;
    }
  }
  return (
    <span className={"tag is-medium is-" + colour}>
      <figure className="image is-24x24">{icon}</figure>
      {text}
      {onDelete && <button className="delete is-small" onClick={onDelete}></button>}
    </span>
  );
};

export default TreacheryCardTag;
