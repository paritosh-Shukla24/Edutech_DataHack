// import React, { useState } from 'react';
// import axios from 'axios';

// const RoadMap = () => {
//     const [domainName, setDomainName] = useState('');
//     const [roadmapImage, setRoadmapImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [courseRecommendations, setCourseRecommendations] = useState([]); // State for course recommendations

//     // Handle form submission
//     const handleGenerateRoadmap = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setRoadmapImage(null);
//         setCourseRecommendations([]); // Clear previous recommendations

//         try {
//             // Make a POST request to generate the roadmap
//             const response = await axios.post('http://localhost:8000/generate-roadmap/', { domain_name: domainName });
//             console.log('API Response:', response.data); // Debugging the response

//             if (response.data && response.data.course_recommendations) {
//                 const recommendations = response.data.course_recommendations;
//                 console.log('Course Recommendations:', recommendations); // Debugging the recommendations
//                 setCourseRecommendations(recommendations); // Store the recommendations in state
//             } else {
//                 console.log("No course recommendations found.");
//             }

//             const imageResponse = await axios.get(`http://localhost:8000/roadmap-image/${domainName}`, {
//                 responseType: 'blob'
//             });

//             // Create an object URL for the image to display it
//             const imageUrl = URL.createObjectURL(imageResponse.data);
//             setRoadmapImage(imageUrl);

//         } catch (err) {
//             setError('Error generating roadmap, please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', paddingTop: '100px' }}> {/* Ensure paddingTop here */}
//             <h1>Generate Learning Roadmap</h1>

//             <form onSubmit={handleGenerateRoadmap}>
//                 <label htmlFor="domainName">Enter Domain Name</label>
//                 <br />
//                 <input
//                     type="text"
//                     id="domainName"
//                     value={domainName}
//                     onChange={(e) => setDomainName(e.target.value)}
//                     placeholder="e.g., Data Science, Web Development"
//                     required
//                     style={{ width: '300px', padding: '10px', marginTop: '10px' }}
//                 />
//                 <br />
//                 <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
//                     Generate Roadmap
//                 </button>
//             </form>

//             {loading && <p>Generating roadmap...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {roadmapImage && (
//                 <div style={{ marginTop: '30px' }}>
//                     <h3>Roadmap for {domainName}</h3>
//                     <img src={roadmapImage} alt="Generated Roadmap" style={{ maxWidth: '100%' }} />
//                 </div>
//             )}

//             {courseRecommendations.length > 0 && ( // Display the recommendations
//                 <div style={{ marginTop: '20px', textAlign: 'left', marginLeft: '20%', marginRight: '20%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
//                     <h3>Recommended Courses:</h3>
//                     <ul>
//                         {courseRecommendations.map((recommendation, index) => (
//                             <li key={index} style={{ marginBottom: '10px', fontSize: '16px' }}>{recommendation}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RoadMap;
import React, { useState } from 'react';
import axios from 'axios';

const Roadmap = () => {
    const blockyTextStyle = {
        fontFamily: "Nasalization",
        textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
    };

    const [domainName, setDomainName] = useState('');
    const [courseRecommendations, setCourseRecommendations] = useState(null);
    const [roadmapImage, setRoadmapImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form submission
    const handleGenerateRoadmap = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRoadmapImage(null);
        setCourseRecommendations(null);

        try {
            // Make a POST request to generate the roadmap
            const response = await axios.post('http://localhost:8000/generate-roadmap/', { domain_name: domainName });
            setCourseRecommendations(response.data.course_recommendations);

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
        <div className='w-full h-screen relative'>
            <video
                src="/src/assets/142928-781314443.mp4"
                autoPlay
                muted
                loop
                className='fixed inset-0 w-full h-full object-cover -z-50'
            ></video>

            <div style={blockyTextStyle} className='relative w-full h-full flex flex-col justify-center items-center mt-10 z-10'>
                <h1 className='text-5xl text-white mb-20'>Roadmap</h1>

                <form onSubmit={handleGenerateRoadmap} className='flex flex-col justify-center items-center'>
                    <input
                        type="text"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                        placeholder="E.g., Data Science"
                        required
                        className='w-auto mb-10 p-2 rounded-md transition-transform duration-200 hover:scale-110'
                    />
                    <button
                        type="submit"
                        className='text-xl text-white bg-gray-500 border rounded-xl p-2 transition-transform duration-200 hover:scale-110 hover:bg-gray-700'
                    >
                        Generate Roadmap
                    </button>
                </form>

                {loading && <p className='text-white mt-2'>Generating roadmap...</p>}
                {error && <p className='text-red bg-red-700'>{error}</p>}

                {roadmapImage && (
                    <div className='flex flex-col justify-center items-center z-10 mt-20 text-white relative h-screen w-full'>
                        <h3>Roadmap for {domainName}</h3>
                        <img src={roadmapImage} alt="Generated Roadmap" className='max-w-[90vh]' />
                    </div>
                )}

                <div className='text-white p-5'>
                    {courseRecommendations && (
                        <div className='bg-cyan-800 border border-white rounded-lg'>
                            <h3>Course Recommendations:</h3>
                            <ul className='p-3'>
                                {Object.keys(courseRecommendations).map((key, index) => (
                                    <li key={index} className='p-3'>
                                        <strong>{key}:</strong> {courseRecommendations[key]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
