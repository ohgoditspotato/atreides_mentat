import * as React from "react";
import { TreacheryCard } from "ts/TreacheryCard";

const Frannalyn: React.FC<TreacheryCard> = props => {
  let detail: string = "";
  switch (props.kind) {
    case "weapon":
    case "defence": {
      detail = props.type;
      break;
    }
  }

  return (
    <div>
      <h3>{props.kind}</h3>
      <p>{detail}</p>
    </div>
  );
};

export default Frannalyn;
