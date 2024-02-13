import { createExpense, getExpenses } from "@/controllers/expenses";
import { apiHandler } from "@/helpers/api/apiHandler";
import { connectMongoDB } from "@/libs/mongodb";

// connect to db
await connectMongoDB()

export default apiHandler({
  get: getAllExpenses,
  post: createNewExpense
});

// get all expenses
async function getAllExpenses(req, res) {
  await getExpenses(req, res)
}

// create expense
async function createNewExpense(req, res) {
  await createExpense(req, res)
}

