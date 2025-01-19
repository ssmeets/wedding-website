import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Place`.
 */
export type PlaceProps = SliceComponentProps<Content.PlaceSlice>;

/**
 * Component for "Place" Slices.
 */
const Place = ({ slice }: PlaceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for place (variation: {slice.variation}) Slices
    </section>
  );
};

export default Place;
