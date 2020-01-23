import * as React from "react";
import { treachery_card_t } from "ts/treachery_card";

import { ReactComponent as CrosshairIcon } from "assets/cards/crosshair.svg";
import { ReactComponent as GuitarIcon } from "assets/cards/guitar.svg";
import { ReactComponent as HaltIcon } from "assets/cards/halt.svg";
import { ReactComponent as SnooperIcon } from "assets/cards/snooper.svg";
import { ReactComponent as LaserIcon } from "assets/cards/laser.svg";
import { ReactComponent as PoisonDropIcon } from "assets/cards/poison_drop.svg";
import { ReactComponent as ShieldIcon } from "assets/cards/shield.svg";
import { ReactComponent as UnknownIcon } from "assets/cards/unknown.svg";
import card_text, { card_subheading } from "ts/components/card_text";

export const treachery_card_colours = {
  Weapon: { text: "white", bg: "danger" },
  Defense: { text: "white", bg: "link" },
  Special: { text: "white", bg: "grey" },
  Useless: { text: "black", bg: "warning" },
  Unknown: { text: "white", bg: "dark" },
} as const;

export const treachery_card_icons = {
  Shield: <ShieldIcon width={32} />,
  Snooper: <SnooperIcon width={32} />,
  Lasgun: <LaserIcon width={32} />,
  Poison: <PoisonDropIcon width={32} />,
  Projectile: <CrosshairIcon width={32} />,
  Special: <HaltIcon width={32} />,
  Useless: <GuitarIcon width={32} />,
  Unknown: <UnknownIcon width={32} />,
} as const;

const TreacheryCard: React.FC<{
  card: treachery_card_t;
  onClick?: () => void;
  onDelete?: () => void;
  small?: boolean;
}> = ({ card, onClick, onDelete, small }) => {
  const colour = treachery_card_colours[card.kind];
  let title: string;
  let subheading: JSX.Element | null = null;
  let text: JSX.Element | null = null;
  let icon: JSX.Element;
  switch (card.kind) {
    case "Useless": {
      subheading = card_subheading.Useless;
      icon = treachery_card_icons["Useless"];
      text = card_text.Useless;
      title = card.id;
      break;
    }
    case "Special": {
      subheading = card_subheading.Special;
      icon = treachery_card_icons["Special"];
      text = card_text[card.type];
      title = card.type;
      break;
    }
    case "Weapon": {
      subheading = card_subheading[card.type];
      icon = treachery_card_icons[card.type];
      text = card_text[card.type];
      title = card.id;
      break;
    }
    case "Defense": {
      subheading = card_subheading[card.type];
      icon = treachery_card_icons[card.type];
      text = card_text[card.type];
      title = card.type;
      break;
    }
  }
  let className = "card treachery-card";
  if (onClick) {
    className += " is-hoverable";
  }
  if (small) {
    className += " small";
  }

  return (
    <div className={className} onClick={onClick}>
      <header className={"modal-card-head has-background-" + colour.bg} style={{ padding: "0 20px" }}>
        <figure className="image is-32x32 level-item">{icon}</figure>
        <div className={"card-header-title has-text-" + colour.text}>{title}</div>
        {onDelete ? <button className="delete" onClick={onDelete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">{subheading}{small ? "" : text}</div>
    </div>);
};

export default TreacheryCard;
