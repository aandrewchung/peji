// In /src/components/TextInputForm.js
import React, { useState } from 'react';

const TextInputForm = () => {
  const [text, setText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [submitted, setSubmitted] = useState(false); // Track if submission has occurred

  const submitText = () => {
    fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
      setImageUrls(data.imageUrls); // Assume this is an array of image URLs
      setSubmitted(true); // Set submitted to true to hide form elements
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      {!submitted && ( // Only display the input and button if not submitted
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />
          <button onClick={submitText}>Generate Image</button>
        </>
      )}
      {imageUrls.map((url, index) => ( // Adjust image size using inline styles
        <img key={index} src={url} alt={`Generated ${index + 1}`} style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ))}
    </div>
  );
};

export default TextInputForm;
