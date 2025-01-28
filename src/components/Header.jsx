import React from "react";

const Header = ({styLst}) => {
  return (
    <header className={styLst.header2}>
      <div className={styLst.div2}>
        <h1 className={styLst.title} >ProjectSim Free</h1>
        <nav>
          <ul className={styLst.ul1}>
            <li><a href="#" className={styLst.a1}>Home</a></li>
            <li><a href="#" className={styLst.a1}>About</a></li>
            <li><a href="#" className={styLst.a1}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
