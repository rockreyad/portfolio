import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahamud Hasan",
    short_name: "Hasan",
    description: "Software Engineer at Kaon — building FlowGPT and Emochi.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe6",
    theme_color: "#0b0b0f",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
