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
      className="bg-white"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <div className="xl:pl-72 xl:pr-72 md:pl-36 md:pr-36 sm:pl-16 sm:pr-16">
          <div className="text-left text-neutral-700 text-balance text-2xl font-content first-letter:uppercase first-letter:text-9xl leading-9 tracking-wide">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Bio;
