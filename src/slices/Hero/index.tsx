import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section id="hero"
      className="min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <div className="">
          <h1 className="text-white font-curly z-10 mb-4 text-9xl text-shadow font-normal leading-none tracking-tight">{slice.primary.title}</h1>
          <h2 className="text-white text-lg tracking-[.25em] font-menu">{slice.primary.wedding_date}</h2>
          {slice.primary.items.map((item, index) => (
            <div
              key={index}
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-0 animate-bgFade h-dvh"
              style={{
                backgroundImage: `url(${item.background_image?.url || ''})`, animationDelay: `${(index - 1) * 3.33}s`
              }}
            />
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;
