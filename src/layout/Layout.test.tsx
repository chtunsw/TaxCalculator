import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  it("should display all its children", () => {
    render(
      <Layout>
        <h1>Title</h1>
        <p>content</p>
      </Layout>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
