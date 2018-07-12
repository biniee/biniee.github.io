import moment from 'moment';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const time_to_s = (date) => {
  if (!date) {
    return null;
  }

  return moment(date).format('YYYY-MM-DD');
};

const has_image_files = (folder) => {
  const images = [];

  let ret = false;
  const p = path.join(__dirname, `../../output/${folder}`);
  if (fs.existsSync(p)) {
    const files = fs.readdirSync(p);
    if(files) {
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext == '.png' || ext == '.jpg' || ext == '.gif') {
          ret = true;
          return;
        }
      });
    }
  }

  return ret;
}

const has_view_file = (id, isMobile) => {
  const filePath = id.replace('.', '/');
  const p = path.join(__dirname, `../../views/${isMobile ? 'mobile' : 'desktop'}/${filePath}.hbs`);
  return fs.existsSync(p);
}

const output_link = (type, id, isMobile) => {
  if (!id) {
    return null;
  }

  let title = '';
  if(type == 'plan') {
    title = '기획';
  } else if(type == 'image_kolon') {
    title = '디자인(코오롱)';
  } else if(type == 'image_seedpost') {
    title = '디자인(시드포스트)';
  }

  const mobilePath = isMobile == false ? 'desktop' : 'mobile';
  let folder = `${type}/${mobilePath}/${id.replace('.', '/')}`;
  if (folder.indexOf('(') > -1) {
    folder = folder.substr(0, folder.indexOf('('));
  }
  const hasImageFiles = has_image_files(folder);

  let htmlText = '';
  if (hasImageFiles) {
    htmlText += `<a href="/output?type=${type}&id=${id}&isMobile=${isMobile}" class="btn btn-success btn-sm">`;
  } else {
    htmlText += `<a href="/output?type=${type}&id=${id}&isMobile=${isMobile}" class="btn btn-default btn-sm">`;
  }
  htmlText += `  <i class="fa ${hasImageFiles ? 'fa-check-circle-o' : 'fa-circle-thin'}" aria-hidden="true"></i> ${title}`;
  htmlText += '</a>';

  return htmlText;
};

const publish_link = (id, name, isMobile) => {
  const hasViewFile = has_view_file(id, isMobile);
  let htmlText = '';
  if (hasViewFile) {
    htmlText += `<a href="/${id.replace('.', '/')}">`;
  }
  htmlText += name;
  if (hasViewFile) {
    htmlText += `</a>`;
  }
  return htmlText;
};

const precompile = (_path) => {
  const hbsfile = path.join(__dirname, `../../views/${_path}.hbs`);
  var hbsFileData = fs.readFileSync(hbsfile, 'utf8');
  var stringifyJsonData = JSON.stringify(hbsFileData);
  return new Handlebars.SafeString(`
    (function() {
      var precompiledData = Handlebars.precompile(${stringifyJsonData});
      var templates = Handlebars.templates = Handlebars.templates || {}; 
      templates["${_path}"] = Handlebars.template(eval("(function(){return " + precompiledData + "}());"));
      var partials = Handlebars.partials = Handlebars.partials || {};
      partials["${_path}"] = Handlebars.template(eval("(function(){return " + precompiledData + "}());"));
    })();
  `);
};

const helper = {
  time_to_s,
  output_link,
  publish_link,
  precompile,
};

export default helper;
