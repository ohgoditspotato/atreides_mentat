import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch } from "react-redux";
import { show_add_cards_page, close_modal, house_remove_card } from "ts/state/actions";
import TreacheryCard from "ts/components/TreacheryCard";
import Page from "ts/components/Pages/Page";
import HouseBanner from "ts/components/HouseBanner";

const ViewCardsPage: React.FC<{
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
}> = props => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());
  let allow_add_card = props.cards.length < 4;
  if (props.house === "Harkonnen") {
    allow_add_card = props.cards.length < 8;
  }

  const add_card_button = (
    <button
      className="button is-primary is-fullwidth"
      onClick={() => {
        if (allow_add_card) {
          dispatch(show_add_cards_page(props.house));
        }
      }}
      disabled={!allow_add_card}
    >
      Add card
    </button>
  );

  return (
    <Page close={close} header={<HouseBanner house={props.house} />} buttons={[add_card_button]}>
      <div className="columns is-multiline">
        {props.cards.map((card, index) => (
          <div className="column is-one-quarter-widescreen is-half" key={"card-" + index}>
            <TreacheryCard
              card={card}
              onDelete={() => dispatch(house_remove_card(props.house, index))}
            />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default ViewCardsPage;
