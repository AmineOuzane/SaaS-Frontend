import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link, // Using HeroUI Link for navigation items
  Button, // Using HeroUI Button for dropdown toggles
} from "@heroui/react";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleAccountDropdown = () => {
    if (isServicesDropdownOpen) setIsServicesDropdownOpen(false);
    setIsAccountDropdownOpen((prev) => !prev);
  };

  const toggleServicesDropdown = () => {
    if (isAccountDropdownOpen) setIsAccountDropdownOpen(false);
    setIsServicesDropdownOpen((prev) => !prev);
  };

  // DEFINE handleLogout FIRST
  const handleLogout = () => {
    console.log("LOGOUT: handleLogout CALLED!"); // Add log here
    console.log("LOGOUT: Clearing authentication data...");
    localStorage.removeItem('access_token');
    localStorage.removeItem('loggedInUsername'); // Remove if you stored it
    console.log("LOGOUT: Redirecting to /login");
    navigate('/login');
    setIsMenuOpen(false);
    setIsAccountDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };

  // Close dropdowns when mobile menu is toggled
  const handleMenuToggle = () => {
    setIsAccountDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMenuOpen(prev => !prev);
  };

  // Define menuItems AFTER handleLogout
  const menuItems = [
    { name: "Profile", href: "/profil" },
    { name: "Settings", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Log Out", action: handleLogout }, // Action defined
  ];

  const servicesItems = [ 
    "Demande d'approbation",
    "OTP",
    "Marketing SMS"
   ];


  return (
     <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-gray-200">
      {/* ... Left Content ... */}
       <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={handleMenuToggle} // Use standard onClick for toggle button
        />
        <NavbarBrand>
          <p className="font-bold text-black text-2xl">WhatsOps</p>
        </NavbarBrand>
      </NavbarContent>

      {/* ... Center Content ... */}
       <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {/* Services Dropdown */}
        <NavbarItem className="relative">
          <Button
            className="text-black hover:text-gray-400 p-3"
            onPress={toggleServicesDropdown} // Use onPress for HeroUI Button
          >
            Services
          </Button>
          {isServicesDropdownOpen && (
            <div className="absolute top-0 left-full ml-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul>
                {servicesItems.map((item, index) => (
                  <li key={`service-${index}-desktop`} className="hover:bg-gray-100">
                    <Link href="#" className="block px-4 py-2 text-gray-700 text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-black hover:text-gray-400">Pricing</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-black hover:text-gray-400">Contact</Link>
        </NavbarItem>
      </NavbarContent>


      {/* Right Aligned Content: Account Dropdown (Desktop) */}
      <NavbarContent justify="end">
        <NavbarItem className="relative hidden sm:flex">
          <Button
            className="text-black hover:text-gray-400 p-3"
            onPress={toggleAccountDropdown} // Use onPress for HeroUI Button
          >
            Account Settings
          </Button>
          {isAccountDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul>
                {/* --- RE-ADD CONDITIONAL RENDERING --- */}
                {menuItems.map((item, index) => (
                  <li key={`${item.name}-${index}-desktop`} className="hover:bg-gray-100">
                    {item.action ? (
                       // Render a BUTTON for items with an action
                       <button
                         onClick={item.action} // Use standard onClick for HTML button
                         className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                       >
                         {item.name}
                       </button>
                    ) : (
                      // Render a LINK for items without an action
                      <Link href={item.href} className="block px-4 py-2 text-gray-700 text-sm">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                {/* --- END CONDITIONAL RENDERING --- */}
              </ul>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Overlay */}
      <NavbarMenu className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        {/* ... Services, Pricing, Contact sections ... */}
         <NavbarMenuItem>
             <hr className="my-4 border-gray-300"/>
         </NavbarMenuItem>

        {/* Account Section (uses updated menuItems) */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`mobile-${item.name}-${index}`}>
            {/* --- RE-ADD CONDITIONAL RENDERING --- */}
            {item.action ? (
                // Render a BUTTON for items with an action
                <button
                  onClick={item.action} // Use standard onClick for HTML button
                  className="w-full text-left text-lg py-2" // Adjusted padding/style
                >
                  {item.name}
                </button>
             ) : (
                // Render a LINK for items without an action
               <Link className="block w-full text-lg py-2" href={item.href} size="lg"> {/* Use block display */}
                 {item.name}
               </Link>
             )}
            {/* --- END CONDITIONAL RENDERING --- */}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;