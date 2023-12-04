import { decode, encode } from './index';

describe('decode', () => {
  it('should decode a valid base64url string', () => {
    const base64url = 'SGVsbG8gd29ybGQ'; // "Hello world" in base64url
    const arrayBuffer = decode(base64url);
    const decodedString = new TextDecoder().decode(arrayBuffer);
    expect(decodedString).toBe('Hello world');
  });

  it('should decode a valid base64url string wil all chars', () => {
    const base64url = 'YDEyMzQ1Njc4OTAtPX4hQCMkJV4mKigpXytxd2VydHl1aW9wW11ce318YXNkZmdoamtsOyc6Inp4Y3Zibm0sLi88Pj8gUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk0'; // "Hello world" in base64url
    const arrayBuffer = decode(base64url);
    const decodedString = new TextDecoder().decode(arrayBuffer);
    expect(decodedString).toBe('`1234567890-=~!@#$%^&*()_+qwertyuiop[]\\{}|asdfghjkl;\':"zxcvbnm,./<>? QWERTYUIOPASDFGHJKLZXCVBNM');
  });

  it('should decode a valid base64url string with padding', () => {
    const base64url = 'SGVsbG8gd29ybGQ='; // "Hello world" in base64url
    const arrayBuffer = decode(base64url);
    const decodedString = new TextDecoder().decode(arrayBuffer);
    expect(decodedString).toBe('Hello world');
  });

  it('should throw an error for an invalid base64url string', () => {
    const base64url = 'This is not a valid base64url string';
    expect(() => decode(base64url)).toThrow();
  });

  it('should return an empty ArrayBuffer for an empty string', () => {
    const arrayBuffer = decode('');
    expect(arrayBuffer.byteLength).toBe(0);
  });
});

function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

describe('encode', () => {
  it('should encode an ArrayBuffer into a base64url string', () => {
    const arrayBuffer = stringToArrayBuffer('Hello world');
    const result = encode(arrayBuffer);
    expect(result).toBe('SGVsbG8gd29ybGQ');
  });

  it('should encode an all char ArrayBuffer into a base64url string', () => {
    const arrayBuffer = stringToArrayBuffer('`1234567890-=~!@#$%^&*()_+qwertyuiop[]\\{}|asdfghjkl;\':"zxcvbnm,./<>? QWERTYUIOPASDFGHJKLZXCVBNM');
    const result = encode(arrayBuffer);
    expect(result).toBe('YDEyMzQ1Njc4OTAtPX4hQCMkJV4mKigpXytxd2VydHl1aW9wW11ce318YXNkZmdoamtsOyc6Inp4Y3Zibm0sLi88Pj8gUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk0');
  });

  it('should remove padding characters', () => {
    const arrayBuffer = stringToArrayBuffer('Hello world');
    const result = encode(arrayBuffer);
    expect(result).not.toContain('=');
  });
});
