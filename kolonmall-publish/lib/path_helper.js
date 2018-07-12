import fs from 'fs';
import path from 'path';

export const getAssetPath = (assetPath, isMobile) => {
  if (!assetPath) {
    return 'index';
  }

  let controllerName = assetPath;

  const idx = assetPath.indexOf('(');
  if (idx > -1) {
    controllerName = controllerName.substr(0, idx);
  }

  controllerName = controllerName.split('/')[0];

  let mode = isMobile ? 'mobile' : 'desktop';

  if (isMobile) {
    try {
      fs.statSync(path.join(__dirname, `../views/mobile/${assetPath}.hbs`));
    } catch(err) {
      mode = 'desktop';
    }
  }
  return `${mode}/${controllerName}`;
};

export const getViewPath = (viewPath, isMobile) => {
  let mode = isMobile ? 'mobile' : 'desktop';

  if (isMobile) {
    try {
      fs.statSync(path.join(__dirname, `../views/mobile/${viewPath}.hbs`));
    } catch(err) {
      mode = 'desktop';
    }
  }

  return `${mode}/${viewPath}`;
};
