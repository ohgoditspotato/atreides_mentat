import * as React from "react";
import { useDispatch } from "react-redux";
import { TreacheryCardKind, TreacheryCard } from "ts/TreacheryCard";
import { showViewCards, addCard } from "ts/state/actions";
import { HouseName } from "ts/houses";

const AddCard: React.FC<{ house: HouseName }> = props => {
  const dispatch = useDispatch();
  const [new_card, set_new_card] = React.useState<TreacheryCard>({
    kind: "weapon",
    type: "projectile",
  });

  let cardTypeEl: JSX.Element | undefined = undefined;
  switch (new_card.kind) {
    case "weapon": {
      cardTypeEl = (
        <select
          onChange={ev => {
            set_new_card({ ...new_card, type: ev.target.value as any });
          }}
        >
          <option value="projectile">Projectile</option>
          <option value="poison">Poison</option>
          <option value="lasgun">Lasgun</option>
        </select>
      );
      break;
    }
    case "defence": {
      cardTypeEl = (
        <select
          onChange={ev => {
            set_new_card({ ...new_card, type: ev.target.value as any });
          }}
        >
          <option value="shield">Shield</option>
          <option value="snooper">Snooper</option>
        </select>
      );
      break;
    }
  }

  return (
    <div>
      <select
        onChange={ev => {
          const new_kind = ev.target.value as TreacheryCardKind;
          switch (new_kind) {
            case "weapon": {
              set_new_card({ kind: "weapon", type: "projectile" });
              break;
            }
            case "defence": {
              set_new_card({ kind: "defence", type: "shield" });
              break;
            }
            case "useless": {
              set_new_card({ kind: "useless" });
              break;
            }
            default:
              throw new Error("Unhandled card type");
          }
        }}
        value={new_card.kind}
      >
        <option value="weapon">Weapon</option>
        <option value="defence">Defensive</option>
        <option value="useless">Useless</option>
      </select>
      {cardTypeEl}
      <input
        type="button"
        value="Add card"
        onClick={() => {
          dispatch(addCard(props.house, new_card));
          dispatch(showViewCards(props.house));
        }}
      ></input>
      <input type="button" value="Back" onClick={() => dispatch(showViewCards(props.house))} />
    </div>
  );
};

export default AddCard;
