import fs from "fs";
import path from "path";
import { ApiRouteDefinition } from "./types";
import { config } from "dotenv";

config()
const specPath = process.env.SPEC_PATH;
if (!specPath) {
  throw new Error("SPEC_PATH is not defined");
}

const resolvedPath = path.resolve(specPath);
const apiRouteDefinitionJson = JSON.parse(
  fs.readFileSync(resolvedPath, "utf-8")
);

export const apiRouteDefinition: ApiRouteDefinition =
  apiRouteDefinitionJson;
