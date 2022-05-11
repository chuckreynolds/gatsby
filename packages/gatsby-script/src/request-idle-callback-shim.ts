// https://developer.chrome.com/blog/using-requestidlecallback/#checking-for-requestidlecallback
// https://github.com/vercel/next.js/blob/canary/packages/next/client/request-idle-callback.ts

export const requestIdleCallback =
  (typeof self !== `undefined` &&
    self.requestIdleCallback &&
    self.requestIdleCallback.bind(window)) ||
  function (cb: IdleRequestCallback): number {
    // @ts-ignore - SHIM_WAS_USED not on window
    if (process.env.CYPRESS_SUPPORT) window.SHIM_WAS_USED = true

    const start = Date.now()
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1) as unknown as number
  }
