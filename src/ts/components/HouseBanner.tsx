import * as React from "react";
import { house_name_t } from "ts/houses";
import { ReactComponent as AtreidesIcon } from "assets/houses/atreides.svg";
import { ReactComponent as BeneIcon } from "assets/houses/bene_gesserit.svg";
import { ReactComponent as EmperorIcon } from "assets/houses/emperor.svg";
import { ReactComponent as FremenIcon } from "assets/houses/fremen.svg";
import { ReactComponent as HarkonnenIcon } from "assets/houses/harkonnen.svg";
import { ReactComponent as GuildIcon } from "assets/houses/spacing_guild.svg";
import ixianPng from "assets/houses/ixians.png";
import tleilaxuPng from "assets/houses/tleilaxu.png";

export const icon_map = {
  Atreides: <AtreidesIcon />,
  "Bene Gesserit": <BeneIcon />,
  Emperor: <EmperorIcon />,
  Fremen: <FremenIcon />,
  Harkonnen: <HarkonnenIcon />,
  "Spacing Guild": <GuildIcon />,
  Ixians: <img src={ixianPng} alt="ixian icon" />,
  Tleilaxu: <img src={tleilaxuPng} alt="tleilaxu icon" />,
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
  return (
    <div className="columns is-vcentered">
      <HouseNameWithIcon house={props.house} />
    </div>
  );
};
export default HouseBanner;
