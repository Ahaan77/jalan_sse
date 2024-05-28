import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';


interface UploadButtonProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onChange, text }) => {
    const [isUploaded, setIsUploaded] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploaded(false); // Reset state before handling new upload
        onChange(event);
        if (event.target.files?.length) {
            setIsUploaded(true); // Set state to uploaded if there are files selected
        }
    };

    useEffect(() => {
        if (isUploaded) {
            setTimeout(() => {
                setIsUploaded(false)

            }, 4000)
        }

    }, [isUploaded])

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className={`flex items-center ${isUploaded ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'} transition duration-200 text-white font-bold py-2 px-4 rounded cursor-pointer`}
            >
                
                {isUploaded ? <CheckIcon className="h-5 w-5 mr-2" /> : <img className='text-white h-5 w-5 mr-2' src="/upload.svg" alt="upload" />}
                {text}
            </label>
        </div>
    );
};

export default UploadButton;
