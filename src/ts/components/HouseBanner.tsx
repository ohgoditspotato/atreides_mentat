import * as React from "react";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";

import { ReactComponent as AtreidesIcon } from "assets/houses/atreides.svg";
import { ReactComponent as BeneIcon } from "assets/houses/bene_gesserit.svg";
import { ReactComponent as EmperorIcon } from "assets/houses/emperor.svg";
import { ReactComponent as FremenIcon } from "assets/houses/fremen.svg";
import { ReactComponent as HarkonnenIcon } from "assets/houses/harkonnen.svg";
import { ReactComponent as GuildIcon } from "assets/houses/spacing_guild.svg";
import { ReactComponent as IxiansIcon } from "assets/houses/ixians.svg";
import { ReactComponent as TleilaxuIcon } from "assets/houses/tleilaxu.svg";
import { ReactComponent as NoneIcon } from "assets/houses/none.svg";
import { useSelector, useDispatch } from "react-redux";
import { root_state_t } from "ts/state/reducers";
import { house_set_ally } from "ts/state/actions";

export const icon_map = {
  Atreides: <AtreidesIcon />,
  "Bene Gesserit": <BeneIcon />,
  Emperor: <EmperorIcon />,
  Fremen: <FremenIcon />,
  Harkonnen: <HarkonnenIcon />,
  "Spacing Guild": <GuildIcon />,
  "Ixians": <IxiansIcon />,
  "Tleilaxu": <TleilaxuIcon />,
  "No ally": <NoneIcon />
};

export const HouseNameWithIcon: React.FC<{ house: house_name_t }> = ({ house }) => {
  const icon = icon_map[house];
  return (
    <div className="column" style={{ display: "flex", alignItems: "center" }}>
      <figure className="image is-32x32" style={{ margin: "0 0.5rem 0 0" }}>
        {icon}
      </figure>
      <h2 className="title is-3">{house}</h2>
    </div>
  );
};

const HouseBanner: React.FC<{ house: house_name_t }> = props => {
  const dispatch = useDispatch();
  const { ally, possibleAllies } = useSelector((state: root_state_t) => {
    return {
      ally: state.game.current.houses[props.house].ally,
      possibleAllies: [
        null,
        ...ALL_HOUSE_NAMES.filter(
          name => name !== props.house && state.game.current.houses[name].active
        ),
      ],
    };
  });

  return (
    <div className="columns is-vcentered">
      <HouseNameWithIcon house={props.house} />
      <div className="column is-narrow">
        <p className="header">Allied to</p>
        <div className="control has-icons-left">
          <div className="select">
            <select
              onChange={ev => {
                let new_ally: house_name_t | null;
                if (ev.target.value === "No ally") {
                  new_ally = null;
                } else {
                  new_ally = ev.target.value as house_name_t;
                }
                dispatch(house_set_ally(props.house, new_ally));
              }}
              value={ally ? ally : "No ally"}
            >
              {possibleAllies.map(pos => {
                const val = pos ? pos : "No ally";
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className="image is-24x24">{icon_map[ally ? ally : "No ally"]}</i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HouseBanner;
