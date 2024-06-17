import styles from "./Header.module.scss";

import classnames from "classnames/bind";
import images from "~/assets/images";

import { Children, useEffect, useState } from "react";
import Tippyhead from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Button from "~/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AcountItem from "~/components/AcountItem";
import Menu from "~/components/Popper/Menu";
import Image from "~/components/Image";
import { InboxIcon, MessageIcon, UploadIcon } from "~/components/Icons";
import Search from "../Search";

const cx = classnames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
          children: {
            title: "Language",
            data: [
              {
                code: "en",
                title: "English1",
              },
              {
                code: "vi",
                title: "Tiếng Việt1",
              },
            ],
          },
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];
function Header() {
  const currentUser = true;

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/@Hoa",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get Coins",
      to: "/coins",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/settings",
    },

    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/logout",
      separate: true,
    },
  ];
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <img src={images.logo.default} alt="titok" />
        </div>
        {/* search  */}
        <Search />

        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippyhead
                delay={[0, 200]}
                content="Upload video"
                placement="bottom"
              >
                <button className={cx("actions-btn")}>
                  <UploadIcon />
                </button>
              </Tippyhead>
              <Tippyhead delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx("actions-btn")}>
                  <MessageIcon />
                </button>
              </Tippyhead>
              <Tippyhead delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx("actions-btn")}>
                  <InboxIcon />
                  <span className={cx("badge")}>12</span>
                </button>
              </Tippyhead>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS}>
            {currentUser ? (
              <Image
                className={cx("user-avt")}
                src={images.avt}
                alt="nguyenhia"
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
