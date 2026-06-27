import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

function CategoryCarousel() {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Python Developer",
    "Java Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Graphic Designer",
    "UI/UX Designer",
  ];
    const dispatch = useDispatch()
    const navigate = useNavigate()

   const searchJobHandler = (query) =>{
      dispatch(setSearchedQuery(query))
      navigate("/browse")
    }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
              onClick={()=>{
                searchJobHandler(cat)
              }}
              variant="outline" className="rounded-full ">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
