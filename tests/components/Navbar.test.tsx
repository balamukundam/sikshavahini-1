import { it, expect, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BmkLanguage, BmkLanguages } from "../../src/services/dataTypes";
import Navbar from "../../src/components/Navbar";
import React from "react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup(); // Ensures the DOM is reset
});
describe("Nabvar", () => {
  it("should telugu language show the header in telugu", () => {
    render(<Navbar lang={BmkLanguages.telugu}></Navbar>);

    expect(screen.getByTestId("webpage-heading")).toHaveTextContent(
      "బాల ముకుందము"
    );

    expect(screen.getByTestId("webpage-subheading")).toHaveTextContent(
      "శిక్షావాహిని"
    );

    expect(screen.getByTestId("webpage-left-image")).toHaveAttribute(
      "src",
      "./src/static/images/Bpic-2.png"
    );

    expect(screen.getByTestId("webpage-right-image")).toHaveAttribute(
      "src",
      "./src/static/images/BalamukundamKids.png"
    );
  });

  it("should devanagari language show the header in devanagari", () => {
    render(<Navbar lang={BmkLanguages.devanagari}></Navbar>);

    expect(screen.getByTestId("webpage-heading")).toHaveTextContent(
      "बालमुकुन्दम्‌"
    );

    expect(screen.getByTestId("webpage-subheading")).toHaveTextContent(
      "शिक्षावाहिनी"
    );

    expect(screen.getByTestId("webpage-left-image")).toHaveAttribute(
      "src",
      "./src/static/images/Bpic-san.png"
    );

    expect(screen.getByTestId("webpage-right-image")).toHaveAttribute(
      "src",
      "./src/static/images/BalamukundamKids.png"
    );
  });
});
