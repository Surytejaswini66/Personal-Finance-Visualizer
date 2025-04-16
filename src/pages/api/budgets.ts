import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simulating some budget data
    const budgetData = [
      { category: "Rent", budget: 1000, actual: 950 },
      { category: "Groceries", budget: 500, actual: 450 },
      { category: "Entertainment", budget: 200, actual: 180 },
    ];

    // Respond with JSON data
    res.status(200).json(budgetData);
  } catch (error) {
    console.error("Error fetching budget data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
