/* eslint-disable react/jsx-key */
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["USA", "UK", "Germany", "Austrailia", "Netherlands", "Denmark"],
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
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className=" font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
