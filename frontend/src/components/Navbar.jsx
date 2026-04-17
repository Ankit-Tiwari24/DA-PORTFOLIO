import { NavLink } from 'react-router-dom';

function NavItem({ to, label }) {
  return (
    <li>
      <NavLink 
        to={to} 
        end 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  return (
    <>
      {/* Desktop Top Right Navbar */}
      <nav className="absolute top-0 right-0 bg-[#2b2b2c] rounded-bl-3xl border border-dark-border hidden lg:block z-10 opacity-95">
        <ul className="flex px-10 py-5 gap-10">
          <NavItem to="/" label="About" />
          <NavItem to="/resume" label="Resume" />
          <NavItem to="/portfolio" label="Portfolio" />
          <NavItem to="/contact" label="Contact" />
        </ul>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#2b2b2c]/95 border-t border-dark-border lg:hidden z-50 rounded-t-3xl backdrop-blur-md">
         <ul className="flex justify-around px-4 py-4">
          <NavItem to="/" label="About" />
          <NavItem to="/resume" label="Resume" />
          <NavItem to="/portfolio" label="Portfolio" />
          <NavItem to="/contact" label="Contact" />
         </ul>
      </nav>
    </>
  );
}
