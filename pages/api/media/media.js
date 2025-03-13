// pages/api/media.js

import { getClientMedias } from "@/controllers/media.controller"; // Adjust import based on your folder structure

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Pass the request to the controller
    const response = await getClientMedias(req);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
