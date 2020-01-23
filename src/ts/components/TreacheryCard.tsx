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
import card_text from "ts/components/card_text";

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
}> = ({ card, onClick, onDelete }) => {
  const info = treachery_card_colours[card.kind];
  let title: string;
  let text: JSX.Element | null = null;
  let icon: JSX.Element;
  switch (card.kind) {
    case "Useless": {
      icon = treachery_card_icons["Useless"];
      text = card_text.Useless;
      title = card.id;
      break;
    }
    case "Special": {
      icon = treachery_card_icons["Special"];
      text = card_text[card.type];
      title = card.type;
      break;
    }
    case "Weapon": {
      icon = treachery_card_icons[card.type];
      text = card_text[card.type];
      title = card.id;
      break;
    }
    case "Defense": {
      icon = treachery_card_icons[card.type];
      text = card_text[card.type];
      title = card.type;
      break;
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
      <header className={"modal-card-head has-background-" + info.bg} style={{ padding: "0 20px" }}>
        <figure className="image is-32x32 level-item">{icon}</figure>
        <div className={"card-header-title has-text-" + info.text}>{title}</div>
        {onDelete ? <button className="delete" onClick={onDelete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">{text}</div>
    </div>
  );
};

export default TreacheryCard;
