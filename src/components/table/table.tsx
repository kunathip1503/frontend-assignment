"use client";
import { useState, useEffect } from "react";
import "../table/table.css";
import React, { FC } from "react";

interface Item {
  type: "Fruit" | "Vegetable";
  name: string;
}

const items: Item[] = [
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

const ButtonList: FC = () => {
  const [mainList, setMainList] = useState<Item[]>(items);
  const [selectedList, setSelectedList] = useState<Item[]>([]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < selectedList.length) {
        setMainList([...mainList, selectedList[index]]);
        setSelectedList(selectedList.filter((_, i) => i !== index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedList, mainList]);

  const handleItemClick = (item: Item, sourceList: string) => {
    if (sourceList === "mainList") {
      setMainList(mainList.filter((i) => i !== item));
      setSelectedList([...selectedList, item]);
    } else {
      setSelectedList(selectedList.filter((i) => i !== item));
      setMainList([...mainList, item]);
    }
  };

  const fruitList = selectedList.filter((item) => item.type === "Fruit");
  const vegetableList = selectedList.filter(
    (item) => item.type === "Vegetable"
  );

  return (
    <>
      <div className="container">
        <div className="button-list">
          {mainList.map((item, index) => (
            <button
              key={index}
              className="button"
              onClick={() => handleItemClick(item, "mainList")}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="table">
          <div>
            <h2 className="texttable">Fruit</h2>
            {fruitList.map((item, index) => (
              <button
                key={index}
                className="button"
                onClick={() => handleItemClick(item, "selectedList")}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div>
            <h2 className="texttable">Vegetable</h2>
            {vegetableList.map((item, index) => (
              <button
                key={index}
                className="button"
                onClick={() => handleItemClick(item, "selectedList")}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonList;
