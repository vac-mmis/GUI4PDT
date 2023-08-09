/**
 * Provides all available controllers for routes
 *
 * Routes needs controllers to handle HTTP request. To add a new controller to this API, please follows this instructions :
 * 1. If your new controller concerns an model or a store which already exists, please just add it in the dedicated controller module. For example, a new route for PDT should have its controller in {@link @/controllers/pdt.controller.ts}. If it is a new one, please create a new controller submodule following `<newType>.controller.ts`.
 * 2. Write your controller following the existing examples. Don't forget to implement error handling and input checks as possible.
 * 3. Export your controller with `export function name()...` and use it in the appropriate {@link Router} submodule.
 *
 * @see {@link https://expressjs.com/en/guide/routing.html | Express.JS Routing guide}
 * @module routes
 */

export * as Material from "@/controllers/material.controller";
export * as Model from "@/controllers/model.controller";
export * as PDT from "@/controllers/pdt.controller";
