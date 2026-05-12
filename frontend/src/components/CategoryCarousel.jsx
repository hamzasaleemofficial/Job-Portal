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
import { setSearchedQuery } from "@/redux/jobSlice";


const categories = [
  "FullStack Developer",
  "Frontend Developer",
  "Data Engineer",
  "Devops Engineer",
  "Backend Developer",
  "Graphic Designer",
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate("/browse");
  }


  return (
    <div>
      <Carousel className=" w-full max-w-xl  mx-auto my-20">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <Button 
                onClick = {() => searchHandler(category)}
                variant="outline" 
                className="rounded-full">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
