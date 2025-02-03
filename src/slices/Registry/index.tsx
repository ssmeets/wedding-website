import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Registry`.
 */
export type RegistryProps = SliceComponentProps<Content.RegistrySlice>;

/**
 * Component for "Registry" Slices.
 */
const Registry = ({ slice }: RegistryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for registry (variation: {slice.variation}) Slices
    </section>
  );
};

export default Registry;
