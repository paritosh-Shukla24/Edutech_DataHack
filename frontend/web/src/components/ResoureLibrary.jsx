import React from 'react';
import { motion } from 'framer-motion';

const ResourceLibrary = () => {
  const resources = [
    {
      title: "Computer Science 101: Introduction to Computer Science",
      author: "By edX",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=5nJ8SxYx3k0",
      bgColor: "bg-blue-600",
    },
    {
      title: "Learn Python Programming - Full Course for Beginners",
      author: "By FreeCodeCamp.org",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      bgColor: "bg-green-600",
    },
    {
      title: "Introduction to Data Structures and Algorithms",
      author: "By mycodeschool",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=8hly31zj_w8",
      bgColor: "bg-purple-600",
    },
    {
      title: "Learn JavaScript in 12 Minutes",
      author: "By Jake Archibald",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=Qq8ShG6a4Ms",
      bgColor: "bg-orange-600",
    },
    {
      title: "Git and GitHub for Beginners",
      author: "By Academind",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=HkdAPi_9oHE",
      bgColor: "bg-teal-600",
    },
    {
      title: "Introduction to Web Development",
      author: "By Traversy Media",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=UB1O30fR-EE",
      bgColor: "bg-red-600",
    },
    {
      title: "React JS Crash Course",
      author: "By Traversy Media",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
      bgColor: "bg-indigo-600",
    },
    {
      title: "Machine Learning with Python - Full Course",
      author: "By FreeCodeCamp.org",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=7eh4d6sabA0",
      bgColor: "bg-yellow-600",
    },
    {
      title: "Full-Stack Web Development with React",
      author: "By The Net Ninja",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=EMfE3zE5Ww8",
      bgColor: "bg-blue-500",
    },
    {
      title: "Introduction to Artificial Intelligence (AI)",
      author: "By Simplilearn",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
      bgColor: "bg-green-500",
    },
    {
      title: "Database Management Systems (DBMS)",
      author: "By GeeksforGeeks",
      level: "Intermediate",
      link: "https://www.youtube.com/watch?v=6W1bL3G1cCg",
      bgColor: "bg-purple-500",
    },
    {
      title: "Cyber Security Basics",
      author: "By Simplilearn",
      level: "Beginner",
      link: "https://www.youtube.com/watch?v=1X0xtS7j1Vg",
      bgColor: "bg-red-500",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
      <div className="container mx-auto px-3">
        <h1 className="text-4xl font-bold mb-6 text-center">Resource Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div 
              key={index} 
              className={`rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 border border-gray-300 ${resource.bgColor}`} 
              whileHover={{ scale: 1.05 }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on click
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold">{resource.title}</h3>
                  <p className="text-sm opacity-90">{resource.author}</p>
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">{resource.level}</span>
                </div>
                <div>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 block text-center mt-4"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
