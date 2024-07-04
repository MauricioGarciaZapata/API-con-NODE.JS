// importo las movies y creo mi propio require
import { createRequire } from "node:module";
const myRequire = createRequire(import.meta.url)
export const readJSON = (path)=>myRequire(path)