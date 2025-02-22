import { useContext } from "react";
import { HeaderRefContext } from "./HeaderRefProvider";

const useHeaderRef = () => {
  const context = useContext(HeaderRefContext);
  if (!context) {
    throw new Error("useHeaderRef must be used within a HeaderRefProvider");
  }
  return context;
};

export default useHeaderRef;
