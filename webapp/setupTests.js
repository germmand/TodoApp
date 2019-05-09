const Enzyme = require('enzyme'); // eslint-disable-line import/no-extraneous-dependencies
const EnzymeAdapter = require('enzyme-adapter-react-16'); // eslint-disable-line import/no-extraneous-dependencies

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
