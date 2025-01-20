import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Party`.
 */
export type PartyProps = SliceComponentProps<Content.PartySlice>;

/**
 * Component for "Party" Slices.
 */
const Party = ({ slice }: PartyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for party (variation: {slice.variation}) Slices
    </section>
  );
};

export default Party;
