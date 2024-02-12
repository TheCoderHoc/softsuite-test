import "./styles.scss";
import logo from "../../assets/images/logo.png";
import { Divider } from "antd";
import sidebarNavLinks from "../../data/sidebarNavLinks";
import SidebarNavLink from "../../components/shared/SidebarNavLink";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <a href="/">
                    <img
                        src={logo}
                        width={177}
                        height={40}
                        alt="Soft Alliance Logo"
                    />
                </a>
            </div>

            <div className="sidebar__container">
                <ul className="sidebar__nav">
                    {sidebarNavLinks.slice(0, 6).map((item) => (
                        <SidebarNavLink key={item.id} {...item} />
                    ))}
                </ul>

                <Divider style={{ borderColor: "$primary-color-50" }} />

                <ul className="sidebar__nav">
                    {sidebarNavLinks.slice(6).map((item) => (
                        <SidebarNavLink key={item.id} {...item} />
                    ))}
                </ul>
            </div>
        </aside>
    );
}
