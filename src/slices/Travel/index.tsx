import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Carousel from "./Carousel";

/**
 * Props for `Travel`.
 */
export type TravelProps = SliceComponentProps<Content.TravelSlice>;

/**
 * Component for "Travel" Slices.
 */
const Travel = ({ slice, context }: TravelProps & { context: string }): JSX.Element => {
  return (
    <section id="travel"
      className="min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <h1 className="text-center font-curly text-6xl md:text-8xl">{slice.primary.title}</h1>
        <div className="text-center text-balance leading-7 text-sm md:text-2xl md:leading-9 font-content ">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="relative w-full">
          <Carousel context={context} items={slice.primary.type.map((item) => (item))} />
        </div>
      </Bounded>
    </section>
  );
};

export default Travel;
