import React, { Fragment, createContext } from 'react';
import { Navber, Footer, TopBanner } from "../partials";
import LoginSignup from "../auth/LoginSignup";

export const LayoutContext = createContext()

const Layout = ({ children }) => {
	return (
		<Fragment>	
			<div className="flex-grow">   
				<TopBanner /> 		
				<Navber />
				<LoginSignup />
				{children}
			</div>
			<Footer/>
		</Fragment>
	)
}

export default Layout;