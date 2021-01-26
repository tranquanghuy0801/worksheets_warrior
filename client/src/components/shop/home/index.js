import React, { Fragment, createContext, useReducer } from 'react';
import Layout from "../layout";
import SliderPic from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
    return (
        <Fragment>
			<SliderPic/>
			{/* Category, Search & Filter Section */}
			<section className="m-4 md:mx-8 md:my-6">
				<ProductCategory/>
			</section>
			{/* Product Section */}
			<SingleProduct/>
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