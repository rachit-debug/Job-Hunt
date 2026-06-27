import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "pune", "Banglore", "Hyderabad", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Devloper", "Backend Devloper", "Fullstack Devloper"],
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "42 - 1lakh", "1lakh to 5lakh"],
  },
];
function FilterCard() {
  const [selectedValue , SetSelectedValue] = useState("")
  const dispatch = useDispatch()
  const changeHandler = (value) =>{
    SetSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3"/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data,index) =>(
            <div>
              <h1 className="font-bold text-lg" key={index}>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `id${index} - ${idx}`
                  return (
                    <div className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} key={idx} id={itemId}/>
                      <Label htmlfor={itemId} >{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
