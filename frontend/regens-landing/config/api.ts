import { useState as reactUseState } from 'react';

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
  // Define formData state and setFormData function
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
  }

  interface FetchResponse {
    ok: boolean;
    json: () => Promise<any>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
      const response: FetchResponse = await fetch(`${API_URL}/api/waitlist/submit`, {
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
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
      console.error('Submission error:', err);
    }
  };
  const [error, setError] = useState('');

  function updateError(message: string) {
    // Assuming you have a state to manage the error message
    setError(message);
  }
const [submitted, setSubmitted] = useState(false);

function updateSubmitted(value: boolean) {
  // Assuming you have a state to manage the submission status
  setSubmitted(value);
}
function useState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return reactUseState(initialValue);
}

