const replace = require("replace-in-file");
const options = {
  files: "./public/service-worker.js",
  from: /const CACHE_NAME = "salimon-\d+";/g,
  to: `const CACHE_NAME = "salimon-${Date.now()}";`,
};
try {
  replace.sync(options);
  console.log("[service worker] updated cache version number");
} catch (error) {
  console.log(error);
}
