
import React from 'react';

interface ExportButtonProps {
    onClick: () => void;
    text: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, text }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 hover:transition duration-200 text-white font-bold py-2 px-4 rounded flex items-center"
        >
            <img className='text-white h-5 w-5 mr-2' src="/download.svg" alt="upload" />
            {text}
        </button>
    );
};

export default ExportButton;
