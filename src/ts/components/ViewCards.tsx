import * as React from "react";
import { HouseName } from "ts/houses";
import { TreacheryCard } from "ts/TreacheryCard";
import Card from "ts/components/Card";
import { useDispatch } from "react-redux";
import { showAddCard, showOverview } from "ts/state/actions";

const ViewCards: React.FC<{ house: HouseName; cards: ReadonlyArray<TreacheryCard> }> = props => {
  const dispatch = useDispatch();
  return (
    <div>
      {props.cards.map(card => (
        <Card {...card} />
      ))}
      <input type="button" value="Add card" onClick={() => dispatch(showAddCard(props.house))} />
      <input type="button" value="Back" onClick={() => dispatch(showOverview())} />
    </div>
  );
};

export default ViewCards;
