import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const recordGoal = async(payload) => {
    return await httpRequest(controllers.goal + "/save", "post", payload)
}