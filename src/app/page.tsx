"use client";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./components/home"), {
  ssr: false,
});

export default DynamicComponentWithNoSSR;
