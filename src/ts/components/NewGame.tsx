import * as React from "react";
import { useDispatch } from "react-redux";
import { ALL_HOUSE_NAMES, houseNameStr } from "ts/houses";
import { showOverview, initHouses } from "ts/state/actions";
import { InitHousePayload } from "ts/state/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default () => {
  const [state, setState] = React.useState<InitHousePayload>({
    harkonen: false,
    emperor: false,
    guild: false,
    bene: false,
    fremen: false,
  });

  let allow_start = false;
  for (let i of ALL_HOUSE_NAMES) {
    if (state[i]) {
      allow_start = true;
      break;
    }
  }
  const dispatch = useDispatch();
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>New game</h1>
        </Col>
      </Row>
      <Form>
        <p>Select houses in the game</p>
        {ALL_HOUSE_NAMES.map(name => {
          return (
            <Form.Group key={name}>
              <Form.Check
                type="checkbox"
                checked={state[name]}
                onChange={() => {
                  let toggle = !state[name];
                  setState({ ...state, [name]: toggle });
                }}
                label={houseNameStr(name)}
              />
            </Form.Group>
          );
        })}
        <Form.Group>
          <Button
            variant="primary"
            type="button"
            block
            disabled={!allow_start}
            onClick={() => {
              if (allow_start) {
                dispatch(initHouses(state));
                dispatch(showOverview());
              }
            }}
          >
            Start game
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
