import { forgotUserPassword } from "api/controllers/auth";
import { apiHandler } from "helpers/api/apiHandler";

export default apiHandler({
  post: async (req, res) => {
    await forgotUserPassword(req, res);
  },
});
