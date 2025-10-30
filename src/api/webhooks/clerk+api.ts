import { createClient } from "@sanity/client";
import { Webhook } from "svix";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: "2024-01-01",
});

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Missing webhook secret" });
  }

  // Get Svix headers
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return res.status(400).json({ error: "Missing svix headers" });
  }

  // Get the body as string
  const body = JSON.stringify(req.body);

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ error: "Verification failed" });
  }

  const eventType = evt.type;
  console.log("Processing webhook event:", eventType);

  try {
    if (eventType === "user.created") {
      console.log("Creating user:", evt.data.id);

      const newUser = await client.create({
        _type: "user",
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        imageUrl: evt.data.image_url,
        createdAt: new Date(evt.data.created_at).toISOString(),
      });

      console.log("User created successfully:", newUser._id);
    }

    if (eventType === "user.updated") {
      console.log("Updating user:", evt.data.id);

      // First, find the user document
      const existingUser = await client.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: evt.data.id }
      );

      if (existingUser) {
        await client
          .patch(existingUser._id)
          .set({
            email: evt.data.email_addresses[0]?.email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            imageUrl: evt.data.image_url,
          })
          .commit();

        console.log("User updated successfully:", existingUser._id);
      } else {
        console.log("User not found for update:", evt.data.id);
      }
    }

    if (eventType === "user.deleted") {
      console.log("Deleting user:", evt.data.id);

      // First, find the user document
      const existingUser = await client.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: evt.data.id }
      );

      if (existingUser) {
        await client.delete(existingUser._id);
        console.log("User deleted successfully:", existingUser._id);
      } else {
        console.log("User not found for deletion:", evt.data.id);
      }
    }

    return res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({
      error: "Processing failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
