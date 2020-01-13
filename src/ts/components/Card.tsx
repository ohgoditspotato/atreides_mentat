import * as React from "react";
import { TreacheryCard } from "ts/TreacheryCard";
import Card from "react-bootstrap/Card";

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
    <Card>
      <Card.Title>{props.kind}</Card.Title>
      <Card.Text>{detail}</Card.Text>
    </Card>
  );
};

export default Frannalyn;
