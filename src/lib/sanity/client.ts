import sanityClient from "@sanity/client";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "xn1nx8fg",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false, // `false` if you want to ensure fresh data
};

export const client = createClient(config);

// Admin level client for backend
const adminConfig = {
  ...config,
  token: process.env.SANITY_API_TOKEN,
};

export const adminClient = createClient(adminConfig);

//Image URL builder
const builder = imageUrlBuilder(config);
export const urlFor = (source: string) => builder.image(source);
