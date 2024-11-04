import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const categories = [
  "FullStack Developer",
  "Frontend Developer",
  "Data Engineer",
  "Devops Engineer",
  "Backend Developer",
  "Graphic Designer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className=" w-full max-w-xl  mx-auto my-20">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <Button variant="outline" className="rounded-full">
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
