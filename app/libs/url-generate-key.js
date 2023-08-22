import { customAlphabet } from "nanoid";
export function generateKey() {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(characters);
  const shortTemp = nanoid(6);
  return shortTemp;
}
