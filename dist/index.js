'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slateHyperscript = require('slate-hyperscript');

var _nextSlatePlugin = require('@jswork/next-slate-plugin');

var _nextSlatePlugin2 = _interopRequireDefault(_nextSlatePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _nextSlatePlugin2.default.define({
  id: 'code',
  hotkey: 'mod+`',
  serialize: {
    input: function input(_ref, children) {
      var el = _ref.el;

      var nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'code') {
        return (0, _slateHyperscript.jsx)('text', { code: true }, children);
      }
    },
    output: function output(_ref2) {
      var el = _ref2.el,
          text = _ref2.text;

      var code = document.createElement('code');
      code.innerText = text;
      return code;
    }
  },
  render: function render(_, _ref3) {
    var attributes = _ref3.attributes,
        children = _ref3.children,
        leaf = _ref3.leaf;

    return _react2.default.createElement(
      'code',
      attributes,
      children
    );
  }
}); /**
     * @usage:
     * Editor.addMark(editor,'code', true)
     */