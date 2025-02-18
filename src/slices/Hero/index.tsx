import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
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
    <section
      id="hero"
      className="relative min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <h1 className="text-white font-curly z-10 mb-4 text-8xl md:text-9xl text-shadow font-normal leading-none tracking-tight">
          {slice.primary.title}
        </h1>
        <h2 className="text-white text-lg tracking-[.25em] font-menu">
          {slice.primary.wedding_date}
        </h2>
        <div className="absolute inset-0 -z-10">
          {slice.primary.items.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center opacity-0 animate-bgFade`}
              style={{ animationDelay: `${index * 2.5}s` }}
            >
              {item.background_item.link_type === 'Media' && (
                <>
                  {item.background_item.kind === 'image' ? (

                    <img
                      src={item.background_item.url}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.background_item.url}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      webkit-playsinline
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;
