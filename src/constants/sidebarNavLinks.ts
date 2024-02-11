import switchModuleIcon from "../assets/icons/tabler_switch-3.png"
import { MdDashboard } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { PiTreeStructureLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { SidebarNavLink } from "../types/sidebarNavLink";

const sidebarNavLinks: SidebarNavLink[] = [
    {
        id: 1,

        label: {
            mainText: "Switch Module",
            subText: "Payroll Management"
        },

        icon: {
            type: "img",
            imgSrc: switchModuleIcon,
        },

        children: [
            {
                id: 1,
                label: "System Administrator",
                href: "/"
            },
            {
                id: 2,
                label: "People Management",
                href: "/",
            },
            {
                id: 3,
                label: "Payroll Management",
                href: "/"
            },
            {
                id: 4,
                label: "Self Service",
                href: '/',
            }
        ]
    },
    
    {
        id: 2,

        label: {
            mainText: "Dashboard",
        },

        icon: {
            type: "ico",
            Icon: MdDashboard,
        },
    },

    {
        id: 3,
        
        label: {
            mainText: "Payroll Activities",
        },

        icon: {
            type: "ico",
            Icon: IoMdAnalytics,
        },

        children: [
            {
                id: 1,
                label: "Payroll Run",
                href: "",
            },

            {
                id: 2,
                label: "Payroll Reversal",
                href: "",
            }, 

            {
                id: 3,
                label: "Payroll History",
                href: "/",
            },

            {
                id: 4,
                label: "Payroll Lock",
                href: "/"
            }, 

            {
                id: 5,
                label: "Enable Payslip",
                href: "/",
            },

            {
                id: 6,
                label: "Payroll Log",
                href: "/"
            },

            {
                id: 7,
                label: "Payroll Approval",
                href: ""
            }
        ]
    },

    {
        id: 4,

        label: {
            mainText: "Salary Structure"
        },

        icon: {
            type: "ico",
            Icon: PiTreeStructureLight,
        }
    },

    {
        id: 5,

        label: {
            mainText: "Element Setup"
        },

        icon: {
            type: "ico",
            Icon: IoSettingsOutline,
        },

        href: "/elements",

        children: [
            {
                id: 1,
                label: "Elements",
                href: "/",
            },

            {
                id: 2,
                label: "Balances",
                href: "/"
            }
        ]
    },

    {
        id: 6,

        label: {
            mainText: "Employees",   
        },

        icon: {
            type: "ico",
            Icon: FaUsers,
        },
    },

    {
        id: 7,
        label: {
            mainText: "Payroll Settings",
        },
        icon: {
            type: "ico",
            Icon: IoSettingsOutline,
        },
        children: [
            {
                id: 1,
                label: "Payroll Options",
                href: "/"
            },
            {
                id: 2,
                label: "Deduction Account Setup",
                href: "/"
            },
            {
                id: 3,
                label: "Variation Portal Period",
                href: "/"
            },
            {
                id: 4,
                label: "Paygroup Setup",
                href: "/"
            },
            {
                id: 5,
                label: "Tax Setup",
                href: "/"
            }
        ]
    },

    {
        id: 8,
        label: {
            mainText: "My Account",
        },
        icon: {
            type: "ico",
            Icon: FaUser,
        },
    },

    {
        id: 9,
        label: {
            mainText: "Logout",
        },
        icon: {
            type: "ico",
            Icon: IoIosLogOut,
        }
    }
]

export default sidebarNavLinks;