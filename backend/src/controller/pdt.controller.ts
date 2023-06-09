import { Request, Response } from "express";

const utilisateurController = {
    getAllUtilisateurs,
};

/**
 * All user reader for GET route
 * @param res :
 *  - Utilisateurs in database + 200 confirmation
 *  - 500 error
 */
async function getAllUtilisateurs(req: Request, res: Response) {}

export default utilisateurController;
