import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const logWithdrawal = async(payload) => {
    return await httpRequest(controllers.withdrawal + "/save", "post", payload)
}

export const fundAccount = async(payload) => {
    return await httpRequest(controllers.withdrawal + "/propertyAccount", "post", payload)
}