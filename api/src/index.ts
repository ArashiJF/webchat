import {Api} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Api};

export async function main(options: ApplicationConfig = {}) {
  const app = new Api(options);

  //options for deployment
  if (!options) options = {};
  if (!options.rest) options.rest = {};

  options.rest.port = 3000;
  options.rest.host = '0.0.0.0';

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
