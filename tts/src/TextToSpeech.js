import React, { useState } from 'react';
import TextToSpeechUI from './TextToSpeechUI';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy'); 

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value); 
  };

  const handleConvert = async () => {
    if (!text) {
      alert("Please enter text");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ text, voice: selectedVoice }), 
        
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      } else {
        alert("Error: Could not convert text to speech");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while converting text to speech.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextToSpeechUI
      text={text}
      handleTextChange={handleTextChange}
      handleConvert={handleConvert}
      loading={loading}
      audioSrc={audioSrc}
      selectedVoice={selectedVoice}  
      handleVoiceChange={handleVoiceChange} 
    />
  );
}

export default TextToSpeech;
