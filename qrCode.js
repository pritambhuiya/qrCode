/* eslint-disable no-magic-numbers */
const fs = require('fs');

const random = () => Math.floor(Math.random() * 2);

const whiteness = () => {
  const colorCode = random() === 0 ? 0 : 210;
  return [colorCode, colorCode, colorCode].join(',');
};

const colorPicker = () => 'rgb(' + whiteness() + ');';

const generateStyle = (styleContents) => ' style = "' + styleContents + '"';

const generateTag = (tag, contents, style = '') =>
  '<' + tag + style + '>' + contents + '</' + tag.split(' ')[0] + '>';

const block = () => {
  const blockStyle = 'width: 2%;height: 2%;background-color:' + colorPicker();
  return generateTag('div', '', generateStyle(blockStyle));
};

const allBlocks = (numberOfBlocks) => {
  let blocks = '';

  Array(numberOfBlocks).fill(1).forEach(() => {
    blocks += block();
  });

  return blocks;
};

const colorBlocksContainer = (colorBlocks) => {
  // eslint-disable-next-line max-len
  const containerStyle = 'display: flex; flex-wrap: wrap; align-content: center; overflow:hidden; width: 500px; height: 500px';

  return generateTag('div', colorBlocks, generateStyle(containerStyle));
};

const generatePage = (container) =>
  generateTag('html', generateTag('body', container));

const colorBlocks = function (numberOfBlocks) {
  const colorBlocks = allBlocks(numberOfBlocks);
  const container = colorBlocksContainer(colorBlocks);
  const pageContents = generatePage(container);

  fs.writeFileSync('qrCode.html', pageContents, 'utf8');
};

colorBlocks(10000);
