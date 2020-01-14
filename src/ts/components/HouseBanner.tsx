import * as React from "react";
import { house_name_t } from "ts/houses";

import { ReactComponent as AtreidesIcon } from "assets/atreides.svg";
import { ReactComponent as BeneIcon } from "assets/bene_gesserit.svg";
import { ReactComponent as EmperorIcon } from "assets/emperor.svg";
import { ReactComponent as FremenIcon } from "assets/fremen.svg";
import { ReactComponent as HarkonnenIcon } from "assets/harkonnen.svg";
import { ReactComponent as GuildIcon } from "assets/spacing_guild.svg";

const icon_map = {
  ATREIDES: <AtreidesIcon className="column is-2" />,
  "BENE GESSERIT": <BeneIcon className="column is-2" />,
  EMPEROR: <EmperorIcon className="column is-2" />,
  FREMEN: <FremenIcon className="column is-2" />,
  HARKONNEN: <HarkonnenIcon className="column is-2" />,
  "SPACING GUILD": <GuildIcon className="column is-2" />,
};

const HouseBanner: React.FC<{ house: house_name_t | null }> = props => {
  let icon;
  if (props.house !== null) {
    icon = icon_map[props.house];
  } else {
    icon = <div className="column is-2" />;
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
