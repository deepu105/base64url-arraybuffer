const lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
let reverseLookup = new Uint8Array(256);

for (let i = 0; i < lookup.length; i++) {
  reverseLookup[lookup.charCodeAt(i)] = i;
}

const base64urlRegex = /^([0-9a-zA-Z\-_]{4})*([0-9a-zA-Z\-_]{3}=?)?$/;

/**
 * Decode a base64url string to an ArrayBuffer.
 * @param {string} base64url - The base64url string to decode.
 * @returns {ArrayBuffer} - The decoded ArrayBuffer.
 * @throws {Error} - If the base64url string is invalid.
 */
function decode(base64url) {
  if (!base64urlRegex.test(base64url)) {
    throw new Error('Invalid base64url string');
  }

  const base64urlLength = base64url.length;

  const placeHolderLength = base64url.charAt(base64urlLength - 2) === '=' ? 2 : base64url.charAt(base64urlLength - 1) === '=' ? 1 : 0;
  const bufferLength = (base64urlLength * 3) / 4 - placeHolderLength;

  let arrayBuffer = new ArrayBuffer(bufferLength);
  let uint8Array = new Uint8Array(arrayBuffer);

  let j = 0;
  for (let i = 0; i < base64urlLength; i += 4) {
    let tmp0 = reverseLookup[base64url.charCodeAt(i)];
    let tmp1 = reverseLookup[base64url.charCodeAt(i + 1)];
    let tmp2 = reverseLookup[base64url.charCodeAt(i + 2)];
    let tmp3 = reverseLookup[base64url.charCodeAt(i + 3)];

    uint8Array[j++] = (tmp0 << 2) | (tmp1 >> 4);
    uint8Array[j++] = ((tmp1 & 15) << 4) | (tmp2 >> 2);
    uint8Array[j++] = ((tmp2 & 3) << 6) | (tmp3 & 63);
  }

  return arrayBuffer;
}

/**
 * Encode an ArrayBuffer to a base64url string.
 * @param {ArrayBuffer} arrayBuffer - The ArrayBuffer to encode.
 * @returns {string} - The encoded base64url string.
 */
function encode(arrayBuffer) {
  let uint8Array = new Uint8Array(arrayBuffer);
  const length = uint8Array.length;
  let base64url = '';

  for (let i = 0; i < length; i += 3) {
    base64url += lookup[uint8Array[i] >> 2];
    base64url += lookup[((uint8Array[i] & 3) << 4) | (uint8Array[i + 1] >> 4)];
    base64url += lookup[((uint8Array[i + 1] & 15) << 2) | (uint8Array[i + 2] >> 6)];
    base64url += lookup[uint8Array[i + 2] & 63];
  }

  switch (length % 3) {
    case 1:
      base64url = base64url.substring(0, base64url.length - 2);
      break;
    case 2:
      base64url = base64url.substring(0, base64url.length - 1);
      break;
  }
  return base64url;
}

/**
 * Convert an ArrayBuffer to a string.
 * @param {ArrayBuffer} arrayBuffer - The ArrayBuffer to convert.
 * @returns {string} - The converted string.
 */
function arrayBufferToString(arrayBuffer) {
  return new TextDecoder().decode(arrayBuffer);
}

/**
 * Convert a string to an ArrayBuffer.
 * @param {string} str - The string to convert.
 * @returns {ArrayBuffer} - The converted ArrayBuffer.
 */
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

export { arrayBufferToString, decode, encode, stringToArrayBuffer };
