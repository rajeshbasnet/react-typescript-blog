import { createContext } from "react";
import { BlogContextProps } from "../App";

export default createContext<BlogContextProps | undefined>(undefined);
