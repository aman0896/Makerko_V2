import React from "react";
import { MdOutlineDeviceHub } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { CgPlayList } from "react-icons/cg";

export const SideData = [
  {
    title: "My Profile",
    path: "/makerko/myprofile",
    Icon: <FiUser size={25} />,
  },
  {
    title: "My Hub",
    path: "/makerko/myhub",
    Icon: <MdOutlineDeviceHub size={25} />,
  },

  {
    title: "My Orders",
    path: "/makerko/myorders",
    Icon: <CgPlayList size={30} />,
  },

  {
    title: "My Projects",
    path: "/makerko/myprojects",
    Icon: <ImFilesEmpty size={20} />,
  },
  {
    title: "My Blogs",
    path: "/makerko/myblogs",
    Icon: <ImFilesEmpty size={20} />,
  },
];
