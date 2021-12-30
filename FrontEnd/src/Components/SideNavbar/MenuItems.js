import React from "react";
import { MdOutlineDeviceHub } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { CgPlayList } from "react-icons/cg";

export const MakerMenuItems = [
    {
        title: "Edit Profile",
        path: "/profile/customer/edit",
        icon: <FiUser size={25} />,
    },
    {
        title: "My Hub",
        path: "/profile/makers/additionaldetails",
        icon: <MdOutlineDeviceHub size={25} />,
    },

    {
        title: "Orders",
        path: "/profile/maker/:id/order",
        icon: <CgPlayList size={25} />,
    },

    {
        title: "My Projects",
        path: "/makerko/myprojects",
        icon: <ImFilesEmpty size={20} />,
    },
    {
        title: "My Blogs",
        path: "/makerko/myblogs",
        icon: <ImFilesEmpty size={20} />,
    },
];

export const CustomerMenuItems = [
    {
        title: "Edit Profile",
        path: "/makerko/myprofile",
        icon: <FiUser size={25} />,
    },

    {
        title: "My Orders",
        path: "/makerko/myorders",
        icon: <CgPlayList size={25} />,
    },
    {
        title: "Requested Design",
        path: "/makerko/myprojects",
        icon: <ImFilesEmpty size={20} />,
    },
    {
        title: "My Projects",
        path: "/makerko/myprojects",
        icon: <ImFilesEmpty size={20} />,
    },
];
