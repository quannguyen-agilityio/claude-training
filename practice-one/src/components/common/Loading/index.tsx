import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 flex items-center justify-center">
      <div className="w-32 h-32 border-b-2 border-white rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
