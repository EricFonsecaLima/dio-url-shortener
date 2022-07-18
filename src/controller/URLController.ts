import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL';

export class URLController {
    public async short(req: Request, res: Response): Promise<void> {
        const { originUrl } = req.body;
        const url = await URLModel.findOne({ originUrl });
        if (url) {
            res.json(url);
            return;
        }
        const hash = shortId.generate();
        const shortUrl = `${config.API_URL}/${hash}`;
        const newUrl = await URLModel.create({ hash, shortUrl, originUrl });
        res.json(newUrl);
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { hash } = req.params;
        const url = await URLModel.findOne({ hash });
        if (url) {
            res.redirect(url.originUrl);
            return;
        }
        res.status(400).json({ error: 'URL not found' });
    }
}