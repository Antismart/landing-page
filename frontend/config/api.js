// frontend/config/api.js
const getApiUrl = () => {
    if (typeof window === 'undefined') {
      // Server-side
      return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    }
    
    // Client-side
    return window.location.origin.includes('localhost')
      ? 'http://localhost:5000'
      : window.location.origin;
  };
  
  export const API_URL = getApiUrl();
  
  // Update your LandingPage.js fetch call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all fields');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies if needed
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Submission failed');
      }
  
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
      console.error('Submission error:', err);
    }
  };