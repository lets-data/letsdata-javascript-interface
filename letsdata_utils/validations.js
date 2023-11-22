import { logger } from "./logging_utils.js";

export function letsdata_assert(result, message) {
    if (!result) {
        logger.error("letsdata assert - "+message);
        throw new Error("letsdata assert - "+message);
    }
}