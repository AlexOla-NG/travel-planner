import { loginUser } from "api/controllers/auth";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  post: async (req, res) => {
    await loginUser(req, res);
  },
});
