import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import the decoder


const ProfilDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null); // Separate error state for actions
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable buttons during action
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8083'; // Adjust if necessary

  useEffect(() => {
    const fetchProfileData = async () => {
        let token = null; // Define token variable outside try block
        let username = null; // Define username outside try block
    
        try {
            // 1. Get the token from localStorage
            token = localStorage.getItem('access_token');
            console.log('FETCH_PROFILE: Token retrieved from localStorage:', token); // Log the actual value
    
            // 1a. Explicit check for empty string which would fail decode
            if (token === "") {
                // Treat empty string same as null/undefined token
                token = null; // Set to null to trigger the next check correctly
            }
    
            // 2. Check if token exists (or was set to null above)
            if (!token) {
                // This is the block currently being hit immediately based on your description
                setError("Authentication required. Please log in.");
                // setLoading(false); // Set loading false before navigate
                navigate('/login');
                return; // Stop execution
            }
    
            // --- Token exists, now try decoding ---
            try {
                // 3. Decode the token to get the username
                const decodedToken = jwtDecode(token);
    
                // IMPORTANT: Verify 'subject' is the correct claim name in YOUR JWT payload
                username = decodedToken.sub; // Using .subject based on your code
                console.log('FETCH_PROFILE: Extracted username from decoded token:', username);
    
                if (!username) {
                    // Throw error to be caught by the outer catch block which handles token removal/redirect
                    throw new Error("Username claim missing or invalid in token payload.");
                }
                console.log('FETCH_PROFILE: Username found. Proceeding to fetch API.');
    
            } catch (decodeError) {
                // --- Catch block specifically for jwtDecode errors ---
                setError("Invalid token format. Please log in again.");
                localStorage.removeItem('access_token'); // Remove invalid token
                navigate('/login');
                return; // Stop execution
            }
    
            // --- Token decoded, username extracted, now call API ---
            // 4. Construct the URL
            const apiUrl = `${API_BASE_URL}/user/${username}`;
    
            // 5. Make the authenticated API request
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('FETCH_PROFILE API SUCCESS: Received response:', response);
    
            // 6. Store the received profile data
            console.log('FETCH_PROFILE API SUCCESS: Setting profile data:', response.data);
            setProfileData(response.data);
            setError(null); // Clear previous errors on success
    
        } catch (err) {
            if (err.response) {
                // Specific error from API response (e.g., 401, 403, 404, 500)
                 console.error('FETCH_PROFILE API ERROR DETAILS:', {
                    status: err.response.status,
                    data: err.response.data,
                    headers: err.response.headers
                 });
                if (err.response.status === 401 || err.response.status === 403) {
                    setError("Your session may have expired or access denied. Please log in again.");
                    if (token) localStorage.removeItem('access_token'); // Remove the rejected token
                    navigate('/login');
                } else {
                    // Other API errors (e.g., 404 Not Found, 500 Server Error)
                    setError(`Failed to load profile: Server responded with status ${err.response.status}. ${err.response.data?.message || ''}`);
                     navigate('/login'); 
                }
            } else if (err.message === "Username claim missing or invalid in token payload.") {
                 setError("Invalid token content (username missing). Please log in again.");
                 console.log('FETCH_PROFILE USERNAME ERROR: Removing token from localStorage.');
                 if (token) localStorage.removeItem('access_token');
                 navigate('/login');
            } else {
                setError(`Failed to load profile: ${err.message}`);
            }
        } finally {
            
            setLoading(false);
        }
    };

    fetchProfileData();
    console.log(profileData);

  }, [navigate]);


  const handleDeleteAccount = async () => {
    // 1. Confirmation
    if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setActionError(null); // Clear previous action errors
    setIsSubmitting(true); // Delete buttons

    try {
        // 2. Re-check token existence just before action
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("DELETE ACTION ERROR: Token missing before delete attempt.");
            setActionError("Authentication missing. Please log in again.");
            navigate('/login'); // Redirect if token disappeared
            return;
        }

        // 3. Make the DELETE request (adjust URL/method if needed)
        console.log('DELETE ACTION: Sending request to /deleteMyAccount');
        await axios.delete(`${API_BASE_URL}/deleteMyAccount`, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // 4. Success Handling
        console.log('DELETE ACTION: Account deleted successfully.');
        alert('Your account has been successfully deleted.');
        localStorage.removeItem('access_token'); // Log out
        navigate('/login'); // Redirect to login

    } catch (err) {
        console.error("DELETE ACTION ERROR:", err.response || err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            setActionError("Authentication failed. Your session may have expired.");
            localStorage.removeItem('access_token'); // Log out on auth failure
            navigate('/login');
        } else {
            setActionError(`Failed to delete account: ${err.response?.data?.message || err.message}`);
        }
    } finally {
        setIsSubmitting(false); // Re-enable buttons
    }
  };

    const handleDisableAccount = async () => {
        // 1. Confirmation (Optional, depends on severity)
        if (!window.confirm('Are you sure you want to disable your account? You may need admin help to re-enable it.')) {
        return;
        }

        setActionError(null);
        setIsSubmitting(true);

        try {
            // 2. Re-check token
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error("DISABLE ACTION ERROR: Token missing before disable attempt.");
                setActionError("Authentication missing. Please log in again.");
                navigate('/login');
                return;
            }

            // 3. Make the PUT/POST request 
            console.log('DISABLE ACTION: Sending request to /deactivateMyAccount');
            await axios.post(`${API_BASE_URL}/deactivateMyAccount`, {}, { 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // 4. Success Handling
            console.log('DISABLE ACTION: Account disabled successfully.');
            alert('Your account has been disabled.');
            localStorage.removeItem('access_token'); // Log out after disabling
            navigate('/login');

        } catch (err) {
            console.error("DISABLE ACTION ERROR:", err.response || err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setActionError("Authentication failed. Your session may have expired.");
                localStorage.removeItem('access_token');
                navigate('/login');
            } else {
                setActionError(`Failed to disable account: ${err.response?.data?.message || err.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };


  // --- Render Logic (Remains the same as before) ---
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  if (error && !profileData) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (profileData) {
    return (
      <div style={{ padding: '20px', border: '1px solid #eee', margin: '20px', borderRadius: '8px' }}>
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
        My Profile
        </h1>        
        {/* Display data based on what AppUser object contains */}
        <div className="max-w-md mx-auto p-4">
            <table className="table-auto w-full">
                <tbody>
                <tr>
                    <th className="px-4 py-2">Username:</th>
                    <td className="px-4 py-2">{profileData.username}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Email:</th>
                    <td className="px-4 py-2">{profileData.email || 'N/A'}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Company Name:</th>
                    <td className="px-4 py-2">{profileData.companyName || 'N/A'}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Telephone:</th>
                    <td className="px-4 py-2">{profileData.phone || 'N/A'}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Cagnotte: </th>
                    <td className="px-4 py-2">{profileData.cagnotte || 'N/A'}$</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Status du compte: </th>
                    <td className="px-4 py-2">{profileData.isActive || 'N/A'} Active </td>
                </tr>
                </tbody>
            </table>
            
            <div class="flex justify-center">
                    <button onClick={() => handleDeleteAccount()}
                    class="inline-flex items-center mr-10 px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                    <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        ></path>
                    </svg>
                    Supprimer mon compte
                    </button>

                <button onClick={()=> handleDisableAccount()}
                    class="inline-flex items-center px-4 py-2 ml-10 bg-orange-400 transition ease-in-out delay-75 hover:bg-orange-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>

                    Desactiver mon compte
                    </button>
                </div>

        </div>
        {/* Adjust the fields below based on your AppUser structure */}
        {/* <p><strong>Roles:</strong> {profileData.roles?.join(', ') || 'N/A'}</p> */}
      </div>
    );
  }

  return <div style={{ padding: '20px' }}>Could not load profile data.</div>;
};

export default ProfilDetails;