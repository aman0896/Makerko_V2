import React from "react";
import { MdDeviceHub } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { CgPlayList } from "react-icons/cg";
import { FaBlog } from "react-icons/fa";
import { VscGitPullRequestDraft } from "react-icons/vsc";

export const MakerMenuItems = [
    {
        title: "Edit Profile",
        path: "/profile/makers/edit",
        icon: <FiUser size={25} />,
    },
    {
        title: "My Hub",
        path: "/profile/makers/additionaldetails",
        icon: <MdDeviceHub size={25} />,
    },

    {
        title: "Orders",
        path: "/profile/makers/order",
        icon: <CgPlayList size={25} />,
    },
    {
        title: "Requested Design",
        path: "/profile/request_design",
        icon: <VscGitPullRequestDraft size={20} />,
    },
    {
        title: "My Projects",
        path: "/profile/myprojects",
        icon: <ImFilesEmpty size={20} />,
    },
    {
        title: "My Blogs",
        path: "/profile/makers/myblogs",
        icon: <FaBlog size={20} />,
    },
];

export const CustomerMenuItems = [
    {
        title: "Edit Profile",
        path: "/profile/customer/edit",
        icon: <FiUser size={25} />,
    },

    {
        title: "My Orders",
        path: "/profile/order",
        icon: <CgPlayList size={25} />,
    },
    {
        title: "Requested Design",
        path: "/profile/request_design",
        icon: <VscGitPullRequestDraft size={20} />,
    },
    {
        title: "My Projects",
        path: "/profile/myprojects",
        icon: <ImFilesEmpty size={20} />,
    },
];
