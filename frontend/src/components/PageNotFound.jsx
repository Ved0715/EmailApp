import React from "react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 animate-background-slide" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?lost')" }}></div>
      <div className="relative flex flex-col items-center justify-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg animate-fade-in">
        <h1 className="text-6xl font-bold text-blue-600 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go Back Home
        </a>
        <img
          src="https://source.unsplash.com/500x300/?lost,404"
          alt="Page Not Found"
          className="mt-8 max-w-full w-96 rounded-lg shadow-lg animate-fade-in hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.onerror = null; e.target.src = "/path/to/fallback-image.jpg"; }}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
