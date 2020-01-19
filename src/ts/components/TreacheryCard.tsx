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
  Unknown: { text: "white", bg: "black" },
} as const;

const icons = {
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
  onDelete?: () => void;
  num?: number;
}> = ({ card, onDelete, num }) => {
  const info = treachery_card_colours[card.kind];
  let title = "";
  let text: JSX.Element | null = null;
  let icon: JSX.Element;
  switch (card.kind) {
    case "Unknown": {
      title = "Unknown";
      icon = icons["Unknown"];
      text = card_text.Unknown;
      break;
    }
    case "Useless": {
      title = "Useless";
      icon = icons["Useless"];
      text = card_text.Useless;
      break;
    }
    case "Special": {
      title = "Special - " + card.type;
      icon = icons["Special"];
      text = card_text[card.type];
      break;
    }
    case "Weapon":
    case "Defense": {
      title = card.kind + " - " + card.type;
      icon = icons[card.type];
      text = card_text[card.type];
      break;
    }
  }
  return (
    <div className="card" style={{ height: "30vh", maxHeight: "230px", overflowY: "auto" }}>
      <header className={"modal-card-head has-background-" + info.bg} style={{ padding: "0 20px" }}>
        <figure className="image is-32x32 level-item">{icon}</figure>
        <div className={"card-header-title has-text-" + info.text}>{title}</div>
        {onDelete ? <button className="delete" onClick={onDelete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">
        {num && (
          <p>
            <b>{num === 1 ? "Unique" : `${num} cards`}</b>
          </p>
        )}
        {text}
      </div>
    </div>
  );
};

export default TreacheryCard;
