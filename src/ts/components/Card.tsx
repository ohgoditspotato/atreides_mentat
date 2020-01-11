import * as React from "react";
import { TreacheryCard } from "ts/TreacheryCard";

const Card: React.FC<TreacheryCard> = props => {
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
      <h4>{detail}</h4>
    </div>
  );
};

export default Card;
