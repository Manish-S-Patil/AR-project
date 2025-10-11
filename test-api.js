// Test script to check API connection
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
console.log('API URL:', apiUrl);

// Test the backend connection
fetch(`${apiUrl}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser2',
    password: 'testpass123'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Backend connection test:', data);
})
.catch(error => {
  console.error('Backend connection failed:', error);
});
