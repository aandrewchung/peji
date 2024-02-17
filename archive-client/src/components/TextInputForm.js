// In /src/components/TextInputForm.js

import React, { useState } from 'react';

const TextInputForm = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const submitText = () => {
    fetch('/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
      setImageUrl(data.imageUrl);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={submitText}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default TextInputForm;
