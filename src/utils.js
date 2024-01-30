import {fileURLToPath} from 'node:url';
import { dirname } from 'node:path';

const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(dirname(_filename));


//ARCHIVO PARA USAR IMPORT TYPE MODULE//
