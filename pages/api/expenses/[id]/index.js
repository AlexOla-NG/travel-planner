import { deleteExpenseById, getExpenseById, updateExpenseById } from "api/controllers/expenses";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: getExpense,
  put: update,
  delete: _delete,
});

// get expense
async function getExpense(req, res) {
  await getExpenseById(req, res);
}

// update expense
async function update(req, res) {
  await updateExpenseById(req, res);
}

// delete expense
async function _delete(req, res) {
  await deleteExpenseById(req, res);
}
