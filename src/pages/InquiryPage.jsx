import { useState, useEffect } from 'react'

import ProjectInquiryStepper from './ProjectInquiryStepper';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/portfolio-images/img1.jpg';
import img1_2 from '../images/portfolio-images/img1-2.jpg';
import img1_3 from '../images/portfolio-images/img1-3.jpg';
import img2 from '../images/portfolio-images/img2.jpg';
import img2_1 from '../images/portfolio-images/img2-1.jpg';
import img2_4 from '../images/portfolio-images/img2-4.jpg';
import img3 from '../images/portfolio-images/img3.jpg';
import img3_2 from '../images/portfolio-images/img3-2.jpg';
import img3_3 from '../images/portfolio-images/img3-3.jpg';
import img3_4 from '../images/portfolio-images/img3-4.jpg';
import img4 from '../images/portfolio-images/img4.jpg';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  projectType: 'Building Construction',
  location: '',
  preferredDate: '',
  budgetRange: '',
  notes: '',
}

function InquiryPage() {
  const navigate = useNavigate();
  const images = [img1, img1_2, img1_3, img2, img2_1, img2_4, img3, img3_2, img3_3, img3_4, img4];
  const [slideIdx, setSlideIdx] = useState(0);
  const [fade, setFade] = useState(true);

  // Slideshow effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setSlideIdx((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearTimeout(timer);
  }, [slideIdx, images.length]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 max-w-2xl mx-auto">
        <button
          className="self-start mb-6 px-4 py-2 rounded-xl bg-gray-100 text-yellow-600 font-semibold shadow hover:bg-yellow-200 transition"
          onClick={() => navigate('/')}
        >
          ← Go Back
        </button>
        <ProjectInquiryStepper onSuccess={() => setTimeout(() => navigate('/'), 3000)} />
      </div>
      {/* Right: Visual Panel with Slideshow */}
      <div className="hidden md:flex flex-col justify-center items-center w-3/5 bg-gradient-to-br from-yellow-50 to-white p-0 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative" style={{ minHeight: 600 }}>
          {images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="Portfolio"
              className={`absolute rounded-2xl shadow-2xl object-cover transition-opacity duration-500 ${idx === slideIdx && fade ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ width: '90%', height: '80%', maxHeight: 600, maxWidth: 900 }}
            />
          ))}
        </div>
        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center">
         
        </div>
      </div>
    </div>
  );
}

export default InquiryPage

