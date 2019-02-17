'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = {
  renderNode: function renderNode(inProps, inEditor, inNext) {
    var children = inProps.children,
        isSelected = inProps.isSelected,
        isFocused = inProps.isFocused,
        attributes = _objectWithoutProperties(inProps, ['children', 'isSelected', 'isFocused']);

    switch (inProps.node.type) {
      case 'code':
        return React.createElement(
          'pre',
          attributes,
          React.createElement(
            'code',
            null,
            children
          )
        );
      default:
        return inNext();
    }
  }
};