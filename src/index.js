export default {
  renderNode(inProps, inEditor, inNext) {
    const { children, isSelected, isFocused, ...attributes } = inProps;
    switch (inProps.node.type) {
      case 'quote':
        return (
          <pre {...attributes}>
            <code>{children}</code>
          </pre>
        );
      default:
        return inNext();
    }
  }
};
