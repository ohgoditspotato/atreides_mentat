import React from "react";
import { render } from "@testing-library/react";
import ViewManager from "ts/ViewManager";

test("renders learn react link", () => {
  const { getByText } = render(<ViewManager />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
