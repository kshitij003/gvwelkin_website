import React from 'react';
import Image from 'next/image';

function Winner() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-900">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/real_background.jpg"
                    alt="background"
                    layout="fill" // use layout="fill" to cover the parent div
                    objectFit="cover" // ensures the image covers the area
                    quality={100} // optional: specify image quality (defaults to 75)
                />
            </div>
            
            {/* Content */}
            <div className="z-10 flex flex-col items-center">
                <h1 className="text-black text-3xl font-semibold">NO GIVEAWAYS RECENTLY HAPPENING</h1>
            </div>
        </div>
    );
}

export default Winner;
