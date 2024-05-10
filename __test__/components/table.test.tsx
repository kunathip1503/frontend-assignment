import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonList from "../../src/components/table/table";

const items = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

describe("ButtonList", () => {
  test("separates items into Fruit and Vegetable lists", () => {
    const { getAllByRole } = render(<ButtonList />);

    const fruitButtons = getAllByRole("button", {
      name: /^(Apple|Banana|Orange|Mango|Pineapple|Watermelon)$/,
    });
    const vegetableButtons = getAllByRole("button", {
      name: /^(Broccoli|Mushroom|Tomato|Cucumber|Carrot)$/,
    });

    expect(fruitButtons).toHaveLength(6);
    expect(vegetableButtons).toHaveLength(5);
  });
});
