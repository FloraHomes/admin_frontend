import { Link, useNavigate } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import { useDispatch, useSelector } from "react-redux";
import profilePlaceholder from "../../assets/images/placeholders/default.png";
import { setRefferalLinkModal } from "../../redux/slices/modalSlice";
import storeInit from "../../redux/store";
import { updateStep } from "../../redux/slices/ownEarnerSlice";

function Main(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();
    dispatch(updateStep(1));
    storeInit.persistor.purge();
    navigate("/");
  };

  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link to="/" className="-intro-x hidden md:flex">
            {/* <img
              alt="Icewall Tailwind HTML Admin Template"
              className="w-6"
              src={logoUrl}
            /> */}
            <span className="text-white text-lg ml-3"> FloraHomesGC </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                {/* <a href="#">Application</a> */}
              </li>
              {/* <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li> */}
            </ol>
          </nav>

          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={user?.photoUrl ? user?.photoUrl : profilePlaceholder}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    {user?.role}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                {/* <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem> */}
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change
                  Password
                </DropdownItem>
                {user?.role === "ownEarner" && (
                  <DropdownItem
                    className="hover:bg-white/5"
                    onClick={() =>
                      dispatch(setRefferalLinkModal({ status: true }))
                    }
                  >
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Referal Link
                  </DropdownItem>
                )}
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={signOut}>
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
