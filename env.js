const fs = require('fs');

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
}

replaceAPIURL();
