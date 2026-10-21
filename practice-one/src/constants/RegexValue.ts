const RegexValue = {
  POSITIVE_NUMBER: /^[1-9][0-9]*$/,
  // Dot-separated labels, as `URL` returns them (lower case, punycode)
  HOSTNAME: /^([a-z0-9-]+\.)+[a-z0-9-]+$/,
};

export default RegexValue;
