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
import { ReactComponent as ArtilleryIcon } from "assets/cards/artillery.svg";

import card_text, { card_subheading } from "ts/components/card_text";

export const treachery_card_colours = {
  Weapon: { text: "white", bg: "danger" },
  Defense: { text: "white", bg: "link" },
  Special: { text: "white", bg: "grey" },
  Useless: { text: "black", bg: "warning" },
  Unknown: { text: "white", bg: "dark" },
  "Weapon/Defense": { text: "white", bg: "success" }
} as const;

export const treachery_card_icons = {
  Shield: (width?: number) => <ShieldIcon width={width ? width : 32} />,
  Snooper: (width?: number) => <SnooperIcon width={width ? width : 32} />,
  Lasgun: (width?: number) => <LaserIcon width={width ? width : 32} />,
  Poison: (width?: number) => <PoisonDropIcon width={width ? width : 32} />,
  Projectile: (width?: number) => <CrosshairIcon width={width ? width : 32} />,
  Special: (width?: number) => <HaltIcon width={width ? width : 32} />,
  Useless: (width?: number) => <GuitarIcon width={width ? width : 32} />,
  Unknown: (width?: number) => <UnknownIcon width={width ? width : 32} />,
  "Artillery Strike": (width?: number) => <ArtilleryIcon width={width ? width : 32} />,
  "Poison Tooth": (width?: number) => <PoisonDropIcon width={width ? width : 32} />,
  "Weirding Way": (width?: number) => <CrosshairIcon width={width ? width : 32} />,
  Chemistry: (width?: number) => <SnooperIcon width={width ? width : 32} />,
  "Poison Blade": (width?: number) => <CrosshairIcon width={width ? width : 32} />,
  "Shield Snooper": (width?: number) => <ShieldIcon width={width ? width : 32} />
} as const;

export const treachery_card_extra_icons = {
  "Weirding Way": (width?: number) => <ShieldIcon width={width ? width : 32} />,
  "Chemistry": (width?: number) => <PoisonDropIcon width={width ? width : 32} />,
  "Poison Blade": (width?: number) => <PoisonDropIcon width={width ? width : 32} />,
  "Shield Snooper": (width?: number) => <SnooperIcon width={width ? width : 32} />
} as any;

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
  let extra_icon: JSX.Element | null = null;
  switch (card.kind) {
    case "Useless": {
      subheading = card_subheading.Useless;
      icon = treachery_card_icons["Useless"]();
      text = card_text.Useless;
      title = card.id;
      break;
    }
    case "Special": {
      subheading = card_subheading.Special;
      icon = treachery_card_icons["Special"]();
      text = card_text[card.type];
      title = card.type;
      break;
    }
    case "Weapon": {
      subheading = card_subheading[card.type];
      icon = treachery_card_icons[card.type]();
      text = card_text[card.type];
      title = card.id;
      break;
    }
    case "Defense": {
      subheading = card_subheading[card.type];
      icon = treachery_card_icons[card.type]();
      text = card_text[card.type];
      title = card.type;
      break;
    }
    case "Weapon/Defense": {
      subheading = card_subheading[card.type];
      icon = treachery_card_icons[card.type]();
      text = card_text[card.type];
      title = card.id;
      break;
    }
  }
  if ("type" in card && treachery_card_extra_icons[card.type] != null) {
    extra_icon = treachery_card_extra_icons[card.type]();
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
      <header
        className={"modal-card-head has-background-" + colour.bg}
        style={{ padding: "0 20px" }}
      >
        <figure className="image is-32x32 level-item">{icon}</figure>
        {extra_icon ? <figure className="image is-32x32 level-item">{extra_icon}</figure> : null}
        <div className={"card-header-title has-text-" + colour.text}>{title}</div>
        {onDelete ? <button className="delete" onClick={onDelete}></button> : null}
      </header>
      <div className="card-content is-size-7 content">
        {subheading}
        {small ? "" : text}
      </div>
    </div>
  );
};

export default TreacheryCard;
