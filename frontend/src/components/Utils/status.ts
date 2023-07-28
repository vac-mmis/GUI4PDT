/**
 * Defines status message format
 */
export type Status = {
    status: "waiting" | "loading" | "error" | "success";
    message: string;
};
