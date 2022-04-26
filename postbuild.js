const fs = require('fs');
const fse = require('fs-extra');

const urls = {
  development:
    'https://prodeo-eureka-backend-dot-prodeo-dev-252a8.uc.r.appspot.com/graphql',
};

function replaceAPIURL() {
  const content = fs.readFileSync('dist/pwa/index.html', { encoding: 'utf-8' });

  const url = urls[process.env.NODE_ENV] || urls.development;

  fs.writeFileSync(
    'dist/pwa/index.html',
    content.replace('http://localhost:4000/graphql', url)
  );

  console.log('Updated API URL!');
}

function copyAssetImages() {
  const srcDir = `src/assets/images`;
  const destDir = `dist/pwa/src/assets/images`;

  fse.ensureDir(destDir);

  fse.copySync(srcDir, destDir, { overwrite: true, recursive: true });
  console.log('Copied asset images!');
}

function deleteJunkFiles() {
  fse.removeSync('dist/.DS_Store');
}

function copyAppYaml() {
  fse.copy('app.yaml', 'dist/app.yaml', { overwrite: true });
}

copyAssetImages();
replaceAPIURL();
deleteJunkFiles();
copyAppYaml();
