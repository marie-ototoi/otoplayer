import React from "react";
import { render, screen } from "@testing-library/react";
import Player from "./Player";

test("renders learn react link", () => {
  render(<Player />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
