# Base64URL-ArrayBuffer

[![npm version](https://badge.fury.io/js/base64url-arraybuffer.svg)](https://badge.fury.io/js/base64url-arraybuffer)

Converts between Base64URL and ArrayBuffer.

## Available functions

```javascript
// Encode an ArrayBuffer to a base64url string.
encode(buffer:ArrayBuffer) : string

// Decode a base64url string to an ArrayBuffer.
decode(base64url: string) : ArrayBuffer

// Utilities
// Convert a string to an ArrayBuffer.
arrayBufferToString(buffer: ArrayBuffer) : string

// Convert an ArrayBuffer to a string.
stringToArrayBuffer(str: string) : ArrayBuffer
```

## Getting Started

This library can be used on Node.js and Browser

### Node.js/AMD

```shell
npm install base64url-arraybuffer
```

#### ESM

```javascript
import { encode, decode } from "base64url-arraybuffer";

const base64url = encode(arrayBuffer);

const arrayBuffer = decode(base64url);
```

#### CommonJS

```javascript
const base64url = require("base64url-arraybuffer");

const base64url = base64url.encode(arrayBuffer);

const arrayBuffer = base64url.decode(base64url);
```

### Browser

```html
<script src="https://unpkg.com/base64url-arraybuffer"></script>

<script>
  const base64url = base64url.encode(arrayBuffer);

  const arrayBuffer = base64url.decode(base64url);
</script>
```
