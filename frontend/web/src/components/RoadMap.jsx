import React, { useState } from 'react';
import axios from 'axios';

const RoadMap = () => {
    const [domainName, setDomainName] = useState('');
    const [roadmapImage, setRoadmapImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form submission
    const handleGenerateRoadmap = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRoadmapImage(null);

        try {
            // Make a POST request to generate the roadmap
            const response = await axios.post('http://localhost:8000/generate-roadmap/', { domain_name: domainName });
            // Fetch the roadmap image after it's generated
            const imageResponse = await axios.get(`http://localhost:8000/roadmap-image/${domainName}`, {
                responseType: 'blob'
            });

            // Create an object URL for the image to display it
            const imageUrl = URL.createObjectURL(imageResponse.data);
            setRoadmapImage(imageUrl);

        } catch (err) {
            setError('Error generating roadmap, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}> {/* Ensure paddingTop here */}
            <h1>Generate Learning Roadmap</h1>

            <form onSubmit={handleGenerateRoadmap}>
                <label htmlFor="domainName">Enter Domain Name</label>
                <br />
                <input
                    type="text"
                    id="domainName"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="e.g., Data Science, Web Development"
                    required
                    style={{ width: '300px', padding: '10px', marginTop: '10px' }}
                />
                <br />
                <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Generate Roadmap
                </button>
            </form>

            {loading && <p>Generating roadmap...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {roadmapImage && (
                <div style={{ marginTop: '30px' }}>
                    <h3>Roadmap for {domainName}</h3>
                    <img src={roadmapImage} alt="Generated Roadmap" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default RoadMap;
