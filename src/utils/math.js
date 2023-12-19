import { customAlphabet } from 'nanoid/non-secure';

export const randomId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
