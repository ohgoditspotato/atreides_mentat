import * as React from "react";
import { house_name_t } from "ts/houses";

import { ReactComponent as AtreidesIcon } from "assets/atreides.svg";
import { ReactComponent as BeneIcon } from "assets/bene_gesserit.svg";
import { ReactComponent as EmperorIcon } from "assets/emperor.svg";
import { ReactComponent as FremenIcon } from "assets/fremen.svg";
import { ReactComponent as HarkonnenIcon } from "assets/harkonnen.svg";
import { ReactComponent as GuildIcon } from "assets/spacing_guild.svg";

const icon_map = {
  ATREIDES: <AtreidesIcon width={64} height={64} />,
  "BENE GESSERIT": <BeneIcon width={64} height={64} />,
  EMPEROR: <EmperorIcon width={64} height={64} />,
  FREMEN: <FremenIcon width={64} height={64} />,
  HARKONNEN: <HarkonnenIcon width={64} height={64} />,
  "SPACING GUILD": <GuildIcon width={64} height={64} />,
};

const HouseBanner: React.FC<{ house: house_name_t }> = props => {
  return (
    <div className="level">
      <div className="level-right">
        <div className="level-item">{icon_map[props.house]}</div>
        <div className="level-item">
          <h2 className="title is-3">{props.house}</h2>
        </div>
      </div>
    </div>
  );
};
export default HouseBanner;
