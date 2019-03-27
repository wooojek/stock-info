import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';
global.fetch = require('jest-fetch-mock');

DotEnv.config({ path: '.env.test' });
Enzyme.configure({
    adapter: new Adapter(),
});