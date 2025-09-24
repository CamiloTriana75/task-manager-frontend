import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

function Hello() {
  return <div>hello</div>;
}

describe("smoke", () => {
  it("renders", () => {
    const { getByText } = render(<Hello />);
    expect(getByText(/hello/i)).toBeTruthy();
  });
});


