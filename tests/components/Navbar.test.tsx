import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { BmkLanguage, BmkLanguages } from "../../src/services/dataTypes";
import Navbar from "../../src/components/Navbar";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Nabvar", () => {
  it("should telugu language should show the header in telugu", () => {
    render(<Navbar lang={BmkLanguages.telugu}></Navbar>);
    const heading = screen.getByText("శిక్షావాహిని");
    expect(heading).toBeInTheDocument();
  });

  it("should devanagari language should show the header in devanagari", () => {
    render(<Navbar lang={BmkLanguages.devanagari}></Navbar>);
    const heading = screen.getByText("शिक्षावाहिनी");
    expect(heading).toBeInTheDocument();
  });
});
