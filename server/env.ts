import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

let envLoaded = false;

export function ensureEnvLoaded() {
  if (envLoaded) {
    return;
  }

  envLoaded = true;

  if (existsSync(".env")) {
    loadEnvFile(".env");
  }
}
