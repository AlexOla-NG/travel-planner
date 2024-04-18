import { getUsers } from "api/controllers/user";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  get: async (req, res) => {
    await getUsers(req, res);
  },
});
