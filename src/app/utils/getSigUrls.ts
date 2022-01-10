import sample from 'lodash/sample';

// Array of available nodes to connect to
const signatures = [process.env.SIG1, process.env.SIG2, process.env.SIG3];

const getSigUrl = () => {
  return sample(signatures);
};

export default getSigUrl;
