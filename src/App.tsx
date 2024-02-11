import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/elements" />} />
            <Route path="/elements" element={<h1>Element</h1>} />
        </Routes>
    );
}
