import { Navigate, Route, Routes } from "react-router-dom";
import AllElements from "./pages/AllElements";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/elements" />} />
            <Route path="/elements" element={<AllElements />} />
        </Routes>
    );
}
