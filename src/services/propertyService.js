import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const ownEarnerProperties = async() => {
    return await httpRequest(controllers.property + "/ownEarner")
}

export const propertyById = async(id) => {
    return await httpRequest(controllers.property + `/${id}`)
}

export const saveProperty = async(payload) => {
    return await httpRequest(controllers.property + "/save", "post", payload)
}