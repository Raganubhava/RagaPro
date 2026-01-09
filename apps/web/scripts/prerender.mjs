import path from 'path';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const staticDir = path.resolve(process.cwd(), 'dist');
const routes = ['/', '/carnatic-ragas', '/hindustani-ragas', '/help'];

const prerenderer = new Prerenderer({
  staticDir,
  routes,
  renderer: new PuppeteerRenderer({
    headless: true,
    renderAfterTime: 1500,
  }),
});

await prerenderer.initialize();
await prerenderer.renderRoutes(routes);
await prerenderer.destroy();
