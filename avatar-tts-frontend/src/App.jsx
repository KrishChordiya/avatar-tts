import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';


function App() {
  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_KEY
  );
  const [text, setText] = useState("")
  const [resText, setResText] = useState("")
  const submit = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(text + ".Give me response as short as possible");
    const response = result.response;
    setResText(response.text())
  }


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={submit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </div>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        <Experience resText={resText ? resText : ""} />
      </Canvas>
    </>
  );
}

export default App;
