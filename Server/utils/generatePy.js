// utils/generatePy.js
module.exports = function generatePyCode(json) {
  let code = `from pyexamples.core import *\n\ndef architecture():\n`;
  json.layers.forEach((layer, i) => {
    const params = Object.entries(layer.params)
      .map(([k, v]) => `${k}=${typeof v === "string" ? `'${v}'` : v}`)
      .join(", ");
    code += `    ${layer.type}(${params})\n`;
  });
  code += `\narchitecture()`;
  return code;
};
