import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const signin = async (email, password) => {
  return await httpRequest(controllers.user + "/signin", "post", { email, password });
};

export const signUp = async (payload) => {
  return await httpRequest(controllers.user + "/signup", "post", payload);
};

export const updateUser = async(payload) => {
  return await httpRequest(controllers.user + "/update", "put", payload)
}
