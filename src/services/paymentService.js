import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const savePurchase = async(payload) => {
    return await httpRequest(controllers.payment + "/save", "post", payload)
}