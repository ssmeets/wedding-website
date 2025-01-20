import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>;

/**
 * Component for "Bio" Slices.
 */
const Bio = ({ slice }: BioProps): JSX.Element => {
  return (
    <section id="bio"
      className="bg-white min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <div className="text-left first-letter:uppercase first-letter:text-6xl text-balance leading-7 md:text-2xl md:first-letter:text-9xl md:leading-9 font-content  ">
          <PrismicRichText field={slice.primary.text} />
        </div>
      </Bounded>
    </section>
  );
};

export default Bio;
