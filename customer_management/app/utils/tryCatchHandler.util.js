/* module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}; */

module.exports = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};
