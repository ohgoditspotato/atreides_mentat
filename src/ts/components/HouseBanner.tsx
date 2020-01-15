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
  Atreides: <AtreidesIcon />,
  "Bene Gesserit": <BeneIcon />,
  Emperor: <EmperorIcon />,
  Fremen: <FremenIcon />,
  Harkonnen: <HarkonnenIcon />,
  "Spacing Guild": <GuildIcon />,
  "No ally": <NoneIcon />,
};

const HouseBanner: React.FC<{ house: house_name_t | null }> = props => {
  let icon;
  if (props.house !== null) {
    icon = icon_map[props.house];
  } else {
    icon = icon_map["No ally"];
  }
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-32x32">{icon}</figure>
        </div>
        <div className="level-item">
          <h2 className="title is-3">{props.house ? props.house : "No ally"}</h2>
        </div>
      </div>
    </div>
  );
};
export default HouseBanner;
