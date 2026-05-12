/* eslint-disable react/jsx-key */
import { useDispatch } from "react-redux";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["USA", "UK", "Berlin", "Austrailia", "Netherlands", "Denmark"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Devloper",
      "FullStack Developer",
      "Devops Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "51k-100k", "101k-150k", "151k-200k"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const resetHandler = () => {
    dispatch(setSearchedQuery(""));
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
    console.log(selectedValue);
  }, [selectedValue]);

  

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {filterData.map((data, index) => (
          <div>
            <h1 className=" font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index} - ${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
      <Button onClick={resetHandler} className="mt-5">Reset Filter</Button>
    </div>
  );
};

export default FilterCard;
