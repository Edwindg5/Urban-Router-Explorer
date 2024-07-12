import React from 'react';

function HeadingEstacion({ level, children, className }) {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
}

export default HeadingEstacion;