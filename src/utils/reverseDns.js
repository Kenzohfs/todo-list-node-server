const dns = require("dns");

function getHostnameFromIp(ip) {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err || !hostnames || hostnames.length === 0) {
        resolve(ip);
      } else {
        resolve(hostnames[0]);
      }
    });
  });
}

module.exports = getHostnameFromIp;
