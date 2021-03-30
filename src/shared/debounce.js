// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let context = this;
    let args = arguments;

    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}