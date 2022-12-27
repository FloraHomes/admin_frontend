import { Transition } from "react-transition-group";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import menuData from "../../mock/menuData"
import { useSelector } from "react-redux";



function Main({children}) {
  const sideMenuStore = useRecoilValue(useSideMenuStore);
  // location = useLocation

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
  }, [sideMenuStore]);

  const navigate = useNavigate();
  const role = useSelector((state) => state?.user?.user?.role);

  return (
    <div className="py-2 -mt-2">
      <DarkModeSwitcher />
      <MobileMenu />
      <TopBar />
      <div className="wrapper">
        <div className="wrapper-box">
          {/* BEGIN: Side Menu */}
          <nav className="side-nav">
            <ul>
              {/* BEGIN: First Child */}
              {menuData[role]?.map((menu, menuKey) =>
                menu == "devider" ? (
                  <li
                    className="side-nav__devider my-6"
                    key={menu + menuKey}
                  ></li>
                ) : (
                  <li key={menu + menuKey}>
                    <SideMenuTooltip
                      tag="a"
                      content={menu.title}
                      href={menu.subMenu ? "#" : menu.pathname}
                      className={classnames({
                        "side-menu": true,
                        "side-menu--active": menu.active,
                        "side-menu--open": menu.activeDropdown,
                      })}
                      onClick={(event) => {
                        event.preventDefault();
                        linkTo(menu, navigate);
                      }}
                    >
                      <div className="side-menu__icon">
                        <Lucide icon={menu.icon} />
                      </div>
                      <div className="side-menu__title">
                        {menu.title}
                        {menu.subMenu && (
                          <div
                            className={classnames({
                              "side-menu__sub-icon": true,
                              "transform rotate-180": menu.activeDropdown,
                            })}
                          >
                            <Lucide icon="ChevronDown" />
                          </div>
                        )}
                      </div>
                    </SideMenuTooltip>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <Transition
                        in={menu.activeDropdown}
                        onEnter={enter}
                        onExit={leave}
                        timeout={300}
                      >
                        <ul
                          className={classnames({
                            "side-menu__sub-open": menu.activeDropdown,
                          })}
                        >
                          {menu.subMenu.map((subMenu, subMenuKey) => (
                            <li key={subMenuKey}>
                              <SideMenuTooltip
                                tag="a"
                                content={subMenu.title}
                                href={subMenu.subMenu ? "#" : subMenu.pathname}
                                className={classnames({
                                  "side-menu": true,
                                  "side-menu--active": subMenu.active,
                                })}
                                onClick={(event) => {
                                  event.preventDefault();
                                  linkTo(subMenu, navigate);
                              
                                }}
                              >
                                <div className="side-menu__icon">
                                  <Lucide icon="Activity" />
                                </div>
                                <div className="side-menu__title">
                                  {subMenu.title}
                                  {subMenu.subMenu && (
                                    <div
                                      className={classnames({
                                        "side-menu__sub-icon": true,
                                        "transform rotate-180":
                                          subMenu.activeDropdown,
                                      })}
                                    >
                                      <Lucide icon="ChevronDown" />
                                    </div>
                                  )}
                                </div>
                              </SideMenuTooltip>
                              {/* BEGIN: Third Child */}
                              {subMenu.subMenu && (
                                <Transition
                                  in={subMenu.activeDropdown}
                                  onEnter={enter}
                                  onExit={leave}
                                  timeout={300}
                                >
                                  <ul
                                    className={classnames({
                                      "side-menu__sub-open":
                                        subMenu.activeDropdown,
                                    })}
                                  >
                                    {subMenu.subMenu.map(
                                      (lastSubMenu, lastSubMenuKey) => (
                                        <li key={lastSubMenuKey}>
                                          <SideMenuTooltip
                                            tag="a"
                                            content={lastSubMenu.title}
                                            href={
                                              lastSubMenu.subMenu
                                                ? "#"
                                                : lastSubMenu.pathname
                                            }
                                            className={classnames({
                                              "side-menu": true,
                                              "side-menu--active":
                                                lastSubMenu.active,
                                            })}
                                            onClick={(event) => {
                                              event.preventDefault();
                                              linkTo(lastSubMenu, navigate);
                                            }}
                                          >
                                            <div className="side-menu__icon">
                                              <Lucide icon="Zap" />
                                            </div>
                                            <div className="side-menu__title">
                                              {lastSubMenu.title}
                                            </div>
                                          </SideMenuTooltip>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Transition>
                              )}
                              {/* END: Third Child */}
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    )}
                    {/* END: Second Child */}
                  </li>
                )
              )}
              {/* END: First Child */}
            </ul>
          </nav>
          {/* END: Side Menu */}
          {/* BEGIN: Content */}
          <div className="content">
            {children}
          </div>
          {/* END: Content */}
        </div>
      </div>
    </div>
  );
}

export default Main;
