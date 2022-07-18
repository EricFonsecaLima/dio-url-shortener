import { getModelForClass, prop } from '@typegoose/typegoose'

export class URL{
    hash!: string;
    originUrl!: string;
    shortUrl!: string;
}

export const URLModel = getModelForClass(URL);