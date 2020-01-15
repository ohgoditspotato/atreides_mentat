import * as React from "react";
import { house_name_t } from "ts/houses";

import { ReactComponent as AtreidesIcon } from "assets/houses/atreides.svg";
import { ReactComponent as BeneIcon } from "assets/houses/bene_gesserit.svg";
import { ReactComponent as EmperorIcon } from "assets/houses/emperor.svg";
import { ReactComponent as FremenIcon } from "assets/houses/fremen.svg";
import { ReactComponent as HarkonnenIcon } from "assets/houses/harkonnen.svg";
import { ReactComponent as GuildIcon } from "assets/houses/spacing_guild.svg";
import { ReactComponent as NoneIcon } from "assets/houses/none.svg";

const icon_map = {
  ATREIDES: <AtreidesIcon className="column is-2" />,
  "BENE GESSERIT": <BeneIcon className="column is-2" />,
  EMPEROR: <EmperorIcon className="column is-2" />,
  FREMEN: <FremenIcon className="column is-2" />,
  HARKONNEN: <HarkonnenIcon className="column is-2" />,
  "SPACING GUILD": <GuildIcon className="column is-2" />,
  NONE: <NoneIcon className="column is-2" />,
};

const HouseBanner: React.FC<{ house: house_name_t | null }> = props => {
  let icon;
  if (props.house !== null) {
    icon = icon_map[props.house];
  } else {
    icon = icon_map["NONE"];
  }
  return (
    <div className="columns is-vcentered is-mobile">
      {icon}
      <div className="column">
        <h2 className="title is-3">{props.house ? props.house : "None"}</h2>
      </div>
    </div>
  );
};
export default HouseBanner;
