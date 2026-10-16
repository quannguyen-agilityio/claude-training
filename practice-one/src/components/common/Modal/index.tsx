import React from 'react';

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  iconUrl?: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, iconUrl }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white min-w-[600px] p-8 rounded-xl flex flex-col justify-center items-center gap-8 shadow-lg">
        {iconUrl && <img className="w-1/4" src={iconUrl} alt="Icon" />}
        {title && <h3 className="text-2xl">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
