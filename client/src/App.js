import React, { Fragment, useReducer } from 'react';
import Routes from './components';
import './style.css';
import { hot } from 'react-hot-loader/root'
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
	const [data, dispatch] = useReducer(layoutReducer, layoutState)
	return (
		<Fragment>
			<LayoutContext.Provider value={{data,dispatch}}>
		  		<Routes/>
			</LayoutContext.Provider>
		</Fragment>
	)
}

export default process.env.NODE_ENV === "development" ? hot(App) : App