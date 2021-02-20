import React, { Fragment, createContext, useReducer, useEffect } from 'react';
import { Navber, Footer, TopBanner } from "../partials";
import Sidebar from './Sidebar'
import {dashboardUserState,dashboardUserReducer} from './DashboardUserContext'
import {fetchData} from './Action'

export const DashboardUserContext = createContext()

const Layout = ({ children }) => {
	const [data,dispatch] = useReducer(dashboardUserReducer,dashboardUserState)

	useEffect(()=>{
		fetchData(dispatch)
	},[])

    return (
        <Fragment>
	        <DashboardUserContext.Provider value={{ data, dispatch }}>
			    <div className="flex-grow">  
					<TopBanner />  	
					<Navber />
					<div className="mx-4 mt-12 md:mx-12 md:mt-24 lg:mt-12 flex flex-col md:flex-row">				
						<Sidebar/>
						{/* All Children pass from here */}
						{children}
					</div>
			    </div>
				<br />
			    <Footer/>
			</DashboardUserContext.Provider>
    	</Fragment>
    )
}

export default Layout;