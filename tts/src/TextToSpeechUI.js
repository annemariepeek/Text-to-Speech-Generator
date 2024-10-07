import React from 'react';
import './TextToSpeechUI.css';

function TextToSpeechUI({ text, handleTextChange, handleConvert, loading, audioSrc, selectedVoice, handleVoiceChange }) {
  return (
    <div>
      <h1>Text-to-Speech Converter</h1>
      
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to convert."
        rows="5"
        cols="50"
      />
      <br />
      
      <label class="custom-select">
        Select Voice: 
        <select value={selectedVoice} onChange={handleVoiceChange}>
          <option value="alloy">Alloy</option>
          <option value="echo">Echo</option>
          <option value="onyx">Onyx</option>
          <option value="fable">Fable</option>
          <option value="nova">Nova</option>
          <option value="shimmer">Shimmer</option>
        </select>
      </label>
      <br />

      <button onClick={handleConvert} class="button button-item">
        <span class="button-bg">
            <span class="button-bg-layers">
            <span class="button-bg-layer button-bg-layer-1 -purple"></span>
            <span class="button-bg-layer button-bg-layer-2 -turquoise"></span>
            <span class="button-bg-layer button-bg-layer-3 -yellow"></span>
            </span>
        </span>
        <span class="button-inner">
            <span class="button-inner-static">Convert to Speech</span>
            <span class="button-inner-hover">Convert to Speech</span>
        </span>
    </button>
      
      {audioSrc && (
        <div>
          <h3>Audio Output:</h3>
          <audio controls src={audioSrc}>
          </audio>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechUI;
