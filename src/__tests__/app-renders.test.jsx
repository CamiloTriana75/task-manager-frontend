import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import App from "../App";

describe("App", () => {
  it("mounts without crashing", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(true).toBe(true);
  });
});


