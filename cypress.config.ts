// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  video: false,
  env: {
    domain: 'userDomain',
    userName: 'tst_user',
    passWord: 'test1234',
    layerNames: [
      'test123',
      '123test',
    ],
    newLayerName: 'NewLayerName',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    /* setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config);
      }, */
    baseUrl: process.env.REACT_APP_API_BASE,
    slowTestThreshold: 1000,
    supportFile: false,
    experimentalRunAllSpecs: true,
  },
});
