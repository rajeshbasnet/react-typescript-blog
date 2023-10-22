import { createContext } from "react";
import { InitialStateProps } from "../types/InitialStateProps.types";

export default createContext<InitialStateProps | null>(null);
