const NormalizeMinaOptions = (): void => {
  console.log('hello');
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NormalizeMinaOptions;
}

export default NormalizeMinaOptions;
