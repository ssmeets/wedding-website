import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Culture`.
 */
export type CultureProps = SliceComponentProps<Content.CultureSlice>;

/**
 * Component for "Culture" Slices.
 */
const Culture = ({ slice }: CultureProps): JSX.Element => {
  return (
    <section
      id="culture"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">{slice.primary.title}</h1>
        <div className="text-left text-balance leading-7 font-content">
          <PrismicRichText field={slice.primary.text} components={{
            heading2: ({ children }) => (
              <h2 className="text-balance pt-3 text-left text-xl md:text-xl">
                {children}
              </h2>),
            em: ({ children }) => (
              <em className="text-yellow-500 bg-clip-text text-transparent">
                {children}
              </em>),
            strong: ({ children }) => (
              <strong className="relative text-black after:absolute after:-z-10 after:content-[attr(data-text)] after:left-[0.5px] after:top-[0.5px] after:text-black/50">
                {children}
              </strong>)
          }} />
        </div>
      </Bounded>
    </section>
  );
};

export default Culture;
