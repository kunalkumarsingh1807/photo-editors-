/* Photo Editor Container */
.photo-editor {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #f6f6f6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.13);
  text-align: center;
}

/* Image display */
.photo-editor img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 18px;
  transition: filter 0.2s;
}

/* Controls (buttons/sliders) */
.editor-controls {
  margin-top: 11px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.editor-controls label {
  font-weight: 500;
  margin-bottom: 3px;
}

.editor-controls input[type="range"] {
  width: 100%;
  accent-color: #3399ff;
}

.editor-controls button {
  margin-top: 8px;
  padding: 8px 18px;
  background: #3399ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.editor-controls button:hover {
  background: #267acc;
}
