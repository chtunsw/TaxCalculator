import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  render(
    <Layout>
      <h1>Title</h1>
      <p>content</p>
    </Layout>
  );
  it("should display all its children", () => {
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
