import React from 'react';

interface JsonLDProps {
  data: object;
  id?: string;
}

// Dedicated component for JSON-LD structured data
const JsonLD: React.FC<JsonLDProps> = ({ data, id }) => {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLD;