import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
	if (!req.headers.authorization)
		return res.status(401).send({ message: 'Unauthorized' });
	else next();
}
