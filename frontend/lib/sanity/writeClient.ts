import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./client";

/**
 * Server-only write client for comment submissions.
 * The write token must never be exposed to the browser.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: "raw",
});
