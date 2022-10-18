const whiteList =
  process.env.WHITE_LIST == null
    ? '*'
    : process.env.WHITE_LIST.trim().split(',');

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;

  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export { corsOptionsDelegate };
