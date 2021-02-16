import React, { Fragment, createContext, useReducer } from 'react';
import Layout from "../layout";
import SliderPic from "./Slider";
import ProductControl from "./ProductControl";
import { homeState, homeReducer } from "./HomeContext";
import ProductHomePage from "./ProductHomePage";

export const HomeContext = createContext();

const HomeComponent = () => {
    return (
        <Fragment>
			<div className="h-20">

			</div>
			{/* <SliderPic/> */}
			<section className="h-15 m-4 md:mx-8 md:my-6">
				<ProductControl/>
			</section>
			<section className="m-4 md:mx-8 md:my-6">
				<ProductHomePage/>
			</section>
		</Fragment>
    )
}

const Home = (props) => {
    const [data, dispatch] = useReducer(homeReducer, homeState)
    return (
        <Fragment>
	    	<HomeContext.Provider value={{data,dispatch}}>
	        	<Layout children={<HomeComponent/>} />
	        </HomeContext.Provider>
        </Fragment>
    )
}

export default Home;