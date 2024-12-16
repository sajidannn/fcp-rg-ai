import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';

const ResponseSection = ({ response }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true); // State untuk memeriksa interaksi pertama

  // Menangani teks yang sedang ditampilkan
  useEffect(() => {
    if (currentIndex < response.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + response[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 15); // Kecepatan animasi (30ms per huruf)
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, response]);

  // Reset teks dan index ketika response berubah
  useEffect(() => {
    if (!response || response === 'Tanya sesuatu...') {
      setIsFirstInteraction(true); // Reset ke interaksi pertama jika response kosong
      setDisplayedText('');
      setCurrentIndex(0);
    } else {
      setIsFirstInteraction(false); // Jika response sudah berubah, itu bukan interaksi pertama
    }
  }, [response]);

  // Membantu mengubah respons menjadi elemen list
  const renderResponse = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('**')) {
        // Format teks yang dibungkus dengan ** menjadi bold
        return (
          <p key={index} className="font-semibold">
            {line}
          </p>
        );
      }
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-white p-6 mb-6 border border-gray-300 rounded-lg shadow-md relative">
      <div className="flex items-center mb-4">
        <FaRobot className="text-blue-500 text-2xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
      </div>
      <div className="text-gray-700">
        {isFirstInteraction ? (
          <p className="text-gray-400">{'Tanya sesuatu...'}</p> // Placeholder default
        ) : (
          renderResponse(displayedText)
        )}
        <span className="text-gray-400">
          {currentIndex < response.length ? '|' : ''}{' '}
          {/* Tanda kursor animasi */}
        </span>
      </div>
    </div>
  );
};

export default ResponseSection;
