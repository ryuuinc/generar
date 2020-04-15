const fs = require('fs');

/* padding rulesets to 'Rule' */
const padRuleSet = (config) => {
  let ruleSet = [];
  let configLeng = config.length;

  for (let i = 0; i < configLeng; i++) {
    let { mode, name, path } = config[i];
    let set = fs.readFileSync(path, 'utf-8').toString();

    set = set.match(/^(?=IP|DOMAIN)+.*$/gm);

    let setLeng = set.length;
    let noResolveReg = /no-resolve/;
    for (let j = 0; j < setLeng; j++) {
      let str = set[j];

      if (noResolveReg.test(str)) {
        ruleSet.push(str.replace(noResolveReg, (match) => `${mode},${match}`));
      } else {
        ruleSet.push(`${str},${mode}`);
      }
    }
  }

  return ruleSet;
};

module.exports = padRuleSet;
