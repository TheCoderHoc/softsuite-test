import Sidebar from "../Sidebar";
import "./styles.scss";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="dashboard__layout">
            <Sidebar />
        </div>
    );
}
