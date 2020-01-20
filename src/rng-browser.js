// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues =
  (typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
  (typeof msCrypto != 'undefined' &&
    typeof window.msCrypto.getRandomValues == 'function' &&
    msCrypto.getRandomValues.bind(msCrypto));

var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
export default function rng() {
  if (!getRandomValues) {
    throw new Error(
      'uuid: This browser does not seem to support crypto.getRandomValues(). If you need to support this browser, please provide a custom random number generator through options.rng',
    );
  }
  return getRandomValues(rnds8);
}
