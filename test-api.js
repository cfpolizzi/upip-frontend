// Test API connection
fetch('http://148.251.51.140:3000/api/ai/personalities')
  .then(res => res.json())
  .then(data => console.log('AI Personalities:', data.total))
  .catch(err => console.error('Error:', err));

fetch('http://148.251.51.140:3000/api/consciousness')
  .then(res => res.json())
  .then(data => console.log('Consciousness:', data.current + '%'))
  .catch(err => console.error('Error:', err));
