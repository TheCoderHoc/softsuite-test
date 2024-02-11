import { IconType } from "react-icons";

type SidebarNavLinkIcon = {
    type: "ico" | "img";
    Icon?: IconType;
    imgSrc?: string,

};

export interface SidebarNavLink {
    id: number;
    label: {
        mainText: string;
        subText?: string;
    };
    href?: string;
    icon: SidebarNavLinkIcon;

    children?: {
        id: number;
        label: string;
        href: string;
    }[];
}