import React, { useState, useEffect, useRef } from "react";
import SearchBox from "../Navbar/SearchBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart, FaPlus, FaRegEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import UserProfileDropdown from "../Navbar/UserProfileDropdown";
import { useDispatch } from "react-redux";
import { removeToken } from "../../redux/slices/auth";
import { setUserData } from "../../redux/slices/userData";
import toast from "react-hot-toast";
const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { allProducts } = useSelector((state) => state.wishlist);
  
  const [showDropDown, setShowDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const naviagte = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(removeToken());
  dispatch(setUserData(null));
  localStorage.clear();
  setIsMobileMenuOpen(false); // Close the sidebar
  toast.success("Logout Successfully");
  naviagte("/login");
};
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative">
      <header className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-700 sticky top-0 z-[100]">
        
        {/* LOGO SECTION */}
        <Link to={"/"} className="shrink-0">
          <h2 className="flex items-center font-bold text-2xl md:text-3xl">
            <span> 😉 </span>
            <span className="text-3xl md:text-5xl text-yellow-400">Buy</span>
          </h2>
        </Link>

        {/* SEARCH BOX - Hidden on small mobile, visible on tablet/PC */}
        <div className="hidden md:block flex-1 max-w-2xl mx-4">
          <SearchBox />
        </div>

        {/* RIGHT ACTIONS - PC VERSION */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-semibold">
          <Link to="/about-us" className={location.pathname === "/about-us" ? "text-yellow-400" : "hover:text-yellow-400"}>
            About Us
          </Link>
          <Link to="/contact-us" className={location.pathname === "/contact-us" ? "text-yellow-400" : "hover:text-yellow-400"}>
            Contact Us
          </Link>

          {token ? (
            <div ref={dropdownRef} className="relative">
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>
                <img src={userData?.profilePicture} alt="User" className="h-9 w-9 rounded-full object-cover border border-gray-600" />
                <IoIosArrowDown size={20} />
              </div>
              {showDropDown && (
                <div className="absolute z-50 top-12 right-0 bg-white text-black w-[200px] rounded-md shadow-2xl overflow-hidden">
                  <div className="bg-white h-4 w-4 absolute -top-2 right-4 rotate-45"></div>
                  <UserProfileDropdown setShowDropDown={setShowDropDown} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="bg-slate-950 px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">Login</Link>
            </div>
          )}

          {/* ICON BUTTONS */}
          <div className="relative cursor-pointer hover:text-yellow-400" onClick={() => naviagte("/wishlist-products")}>
            <FaRegHeart size={28} />
            {allProducts?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-gray-900 text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-bold">
                {allProducts.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-gray-950 rounded-full px-4 py-2 cursor-pointer hover:bg-slate-800" onClick={() => naviagte("/inbox")}>
            <FaRegEnvelope size={18} />
            <span className="text-sm">Inbox</span>
          </div>

          <button 
            className="flex items-center gap-1 bg-yellow-400 text-gray-900 rounded-full px-5 py-2 hover:bg-yellow-500 transition-colors shadow-lg"
            onClick={() => token ? naviagte("/upload-product") : naviagte("/login")}
          >
            <FaPlus size={16} />
            <span className="font-bold">SELL</span>
          </button>
        </nav>

        {/* MOBILE & TABLET TOGGLE */}
        <div className="flex lg:hidden items-center gap-4">
          <div className="relative cursor-pointer" onClick={() => naviagte("/wishlist-products")}>
            <FaRegHeart size={25} />
            {allProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] h-4 w-4 flex items-center justify-center rounded-full font-bold">
                {allProducts.length}
              </span>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE SEARCH BAR (Visible only on mobile/tablet) */}
      <div className="md:hidden bg-gray-900 px-4 pb-3 border-b border-gray-700">
        <SearchBox />
      </div>

      {/* MOBILE SIDEBAR MENU */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-[280px] bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            {token ? (
               <div className="flex items-center gap-3">
                  <img src={userData?.profilePicture} className="h-10 w-10 rounded-full object-cover" alt="Profile" />
                  <p className="font-bold">My Account</p>
               </div>
            ) : (
              <p className="font-bold">Welcome Guest</p>
            )}
            <FaTimes onClick={() => setIsMobileMenuOpen(false)} size={24} />
          </div>

          <div className="flex flex-col gap-4 font-semibold text-lg">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link to="/inbox" onClick={() => setIsMobileMenuOpen(false)}>Inbox</Link>
            {token && <Link to="/myproducts" onClick={() => setIsMobileMenuOpen(false)}>My Ads</Link>}
          </div>

          <div className="mt-auto flex flex-col gap-3">
             {!token ? (
               <>
                <Link to="/login" className="w-full py-3 bg-gray-800 text-center rounded-lg">Login</Link>
                <Link to="/signup" className="w-full py-3 bg-yellow-400 text-gray-900 font-bold text-center rounded-lg">Sign Up</Link>
               </>
             ) : (
                <button 
  onClick={handleLogout}
  className="w-full py-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
>
  Logout
</button>
             )}
             <button 
              className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg flex items-center justify-center gap-2"
              onClick={() => token ? naviagte("/upload-product") : naviagte("/login")}
             >
                <FaPlus /> SELL
             </button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[105] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;