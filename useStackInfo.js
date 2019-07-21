import React, { useContext } from "react";
import StackInfoProvider from "./components/StackInfoProvider";

export default function useStackInfo() {
  return useContext(StackInfoProvider.Context);
}
