import { generateKey } from "../libs/url-generate-key";

export function generateObject(long, uid) {
  const shortKey = process.env.DOMAIN_NAME + generateKey();
  const URL = {
    short: shortKey,
    long: long,
    created_at: new Date(Date.now()),
    expires_at: new Date(Date.now()),
    userId: uid,
  };
  return URL;
}
