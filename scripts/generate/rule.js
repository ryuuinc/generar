const fs = require('fs');

/* template to rule */
const templateToRule = (config) => {
  let rule = [];
  let configLeng = config.length;

  for (let i = 0; i < configLeng; i++) {
    let { src, mode } = config[i];
    let template = fs.readFileSync(src, 'utf-8').toString();

    template = template.match(/^(?=IP|DOMAIN)+.*$/gm);

    let leng = template.length;
    let specialReg = /no-resolve/;
    for (let j = 0; j < leng; j++) {
      let str = template[j];

      if (specialReg.test(str)) {
        rule.push(str.replace(specialReg, (match) => `${mode},${match}`));
      } else {
        rule.push(`${str},${mode}`);
      }
    }
  }

  return rule;
};

module.exports = templateToRule;
