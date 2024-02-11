import Header from "../Header";
import Sidebar from "../Sidebar";
import "./styles.scss";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="dashboard__layout">
            <Sidebar />

            <main className="dashboard__layout__main__view">
                <Header />

                <section className="dashboard__layout__outlet">
                    {children}
                </section>
            </main>
        </div>
    );
}
