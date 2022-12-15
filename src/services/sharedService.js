import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const uploadFile = async(payload) => {
    return await httpRequest(controllers.upload, "post", payload)
}