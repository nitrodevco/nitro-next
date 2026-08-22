import { useContext } from "react";

import { VariantCascadeContext } from "./VariantCascadeContext";

export const useCascadedVariant = (typeKey: string) => useContext(VariantCascadeContext)[typeKey];
