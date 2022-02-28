// Array of available nodes to connect to
const sigs = [
  'https://ip-159-225.cust.aspone.cz/auth?',
  'https://z3ks0jkyd5.execute-api.us-east-2.amazonaws.com/default/auth/',
  'https://a78aj8vsu0.execute-api.us-west-2.amazonaws.com/auth/'
];
// const sigs = [process.env.SIG1, process.env.SIG2, process.env.SIG3]

const getSignatures = async (hash: string, chainId: string) => {
  const signatures: any = [];
  const { sig3, respJSON } = await getThirdSig(hash, chainId);

  if (sig3) {
    signatures.push(sig3);
  }
  //  else {
  //   return { signatures, respJSON: {} };
  // }
  const sig2 = await getSecondSig(hash, chainId);
  if (sig2) {
    signatures.push(sig2);
  }
  const sig1 = await getFirstSig(hash, chainId);
  if (sig1) {
    signatures.push(sig1);
  }

  return { signatures, respJSON };
};
const getFirstSig = async (hash: string, chainId: string) => {
  const url = `${sigs[0]}tx=${hash}&chain=${chainId}`;
  const resp = await fetch(url);
  const respJSON = await resp.json();

  if (!respJSON.isSuccess) {
    // alert('ERROR - 1: Authorization failed!');
    return null;
  }
  return respJSON.signature;
};

const getSecondSig = async (hash: string, chainId: string) => {
  const url = `${sigs[1]}tx=${hash}&chain=${chainId}`;
  const resp = await fetch(url);
  const respJSON = await resp.json();

  if (!respJSON.isSuccess) {
    // alert('ERROR - 2: Authorization failed!');
    return null;
  }
  return respJSON.signature;
};
const getThirdSig = async (hash: string, chainId: string) => {
  const url = `${sigs[2]}tx=${hash}&chain=${chainId}`;
  const resp = await fetch(url);
  const respJSON = await resp.json();

  if (!respJSON.isSuccess) {
    // alert('ERROR - 3: Authorization failed!');
    return { sig3: null, respJSON: null };
  }
  return { sig3: respJSON.signature, respJSON };
};

export default getSignatures;
