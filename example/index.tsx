import React, { useEffect, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import usePDFcode from "../src/index";

import "webrtc-adapter";

const videoStyle: React.CSSProperties = {
  width: "100vw"
};

const videoConStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  justifySelf: "center",
  height: '20vh'
};

const overlay: React.CSSProperties = {
  position: "absolute",
  top: "40px",
  right: "25px",
  bottom: "40px",
  left: "25px",
  boxShadow: "0px 0px 20px 56px rgba(0,0,0,0.6)",
  border: "3px solid #fff",
  borderRadius: "10px",
};

const wrapper: React.CSSProperties = {
 // maxWidth: "768px",
//  height: "calc(100vh - 64px)",
  margin: "auto",
  width: "100%",
  justifyContent: "center",

  position: "relative",
};

const containerStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "90px",
  paddingBottom: "10px",
};

const App: React.FC = () => {
  const barcode = usePDFcode({
    
  });
  const [resetBtn, setResetBtn] = useState(false);

  const reset = useCallback(() => {
    setResetBtn(false);
    reset()
    
  }, [barcode, setResetBtn]);

  useEffect(() => {
    if (barcode.result && !resetBtn) {
      setResetBtn(true);
    }
  }, [barcode.result, resetBtn, setResetBtn]);

  return (
    <div>
      <div style={wrapper}>
        <div style={videoConStyle}>
          <video id="video" ref={barcode.ref} style={videoStyle} />
          <div style={overlay}></div>
        </div>
        <div style={containerStyle}>
          <div>{barcode.result ? barcode.result : null}</div>
          {resetBtn ? <button onClick={reset}>Reset</button> : null}
          <button onClick={barcode.stop}>Stop</button>
          
          <div id="cava"></div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
