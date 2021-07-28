const getConnectionConfig = (uri) => {
  uri = uri.slice(11);
  let username = uri.split(":")[0];
  let database = uri.split("/")[1];
  let host = uri.substring(uri.lastIndexOf("@") + 1, uri.lastIndexOf(":"));
  let password = uri.split(/[:@]/)[1];
  let port = uri.split(/[:/]/)[2];

  return { username, password, database, host, port };
};

module.exports = getConnectionConfig;
