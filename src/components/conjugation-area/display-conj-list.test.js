import React from "react";
import { render } from "@testing-library/react";
import DisplayConjList from "./display-conj-list";

describe("DisplayConjList component", () => {
  it("renders correctly with child components", () => {
    const conjuList = {
      avoir: {
        présent: "ai",
        imparfait: "avais",
        passé_composé: "ai eu",
      },
      être: {
        présent: "suis",
        imparfait: "étais",
        passé_composé: "ai été",
      },
    };
    const { getByTestId, getAllByTestId } = render(
      <DisplayConjList conjuList={conjuList} />
    );
    const searchBar = getByTestId("verb-search-bar");
    const searchIcon = getByTestId("verb-search-icon");
    const conjugationBlocks = getAllByTestId("conjugation-block");

    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(conjugationBlocks).toHaveLength(2);
    expect(conjugationBlocks[0]).toHaveTextContent("avoir");
    expect(conjugationBlocks[1]).toHaveTextContent("être");
  });
});
