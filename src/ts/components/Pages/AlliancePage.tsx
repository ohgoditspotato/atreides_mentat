import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { close_modal, house_set_ally } from "ts/state/actions";
import Page from "ts/components/Pages/Page";
import { root_state } from "ts/state/reducers";
import HouseBanner from "ts/components/HouseBanner";

const AlliancePage: React.FC<{ house: house_name_t; ally: house_name_t | null }> = props => {
  const houses_state = useSelector((state: root_state) => state.houses);
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());

  const possible_allies = [
    null,
    ...ALL_HOUSE_NAMES.filter(
      name => houses_state[name].active && houses_state[name].ally == null && name !== props.house
    ),
  ];

  return (
  <Page close={close} header={<HouseBanner house={props.house} />} >
      <div className="columns is-multiline">
        {possible_allies.map(name => (
          <div className="column is-one-third" key={name ? name : "no ally"}>
            <div
              className="box"
              onClick={() => {
                dispatch(house_set_ally(props.house, name));
                close();
              }}
              style={{ cursor: "pointer" }}
            >
              <HouseBanner house={name} />
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default AlliancePage;
