import React, { Fragment, useContext , useState } from 'react';
import { getAllProduct } from "../../admin/products/FetchApi"
import { HomeContext } from "./index";

const Search = () => {

	const { data, dispatch } = useContext(HomeContext)
	const [search, setSearch] = useState("")
	const [productArray, setPa] = useState(null)

	const searchHandle = (e) => {
		setSearch(e.target.value)
		fetchData()
		dispatch({ type: "searchHandleInReducer", payload: e.target.value, productArray: productArray })
	}

	const fetchData = async () => {
		dispatch({ type: "loading", payload: true })
		try {
			setTimeout(async () => {
				let responseData = await getAllProduct();
				if (responseData && responseData.Products) {
					setPa(responseData.Products)
					dispatch({ type: "loading", payload: false })
				}
			}, 700)
		} catch (error) {
			console.log(error)
		}
	}

	const closeSearchBar = () => {
		dispatch({ type: "searchDropdown", payload: !data.searchDropdown })
		fetchData()
		dispatch({ type: "setProducts", payload: productArray })
		setSearch("")
	}

	return (
		<div className={`${data.searchDropdown ? "" : "hidden"} my-4 flex items-center justify-between`}>
			<input value={search} onChange={e=> searchHandle(e)} className="px-4 text-xl py-4 focus:outline-none" type="text" placeholder="Search products..." />
			<div onClick={e=> closeSearchBar()} className="cursor-pointer">
			  <svg className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
			</div>
	  	</div>
	)
}

const ProductCategory = (props) => {
    const { data, dispatch } = useContext(HomeContext);

    return (
        <Fragment>
	    	<div className="flex justify-between font-medium">
				<div className="flex items-center space-x-1 cursor-pointer">
					<span className="text-md md:text-lg">Worksheets</span>
					{/* <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> */}
				</div>
				<div className="flex space-x-2">
					<div onClick={e=> dispatch({type:"filterListDropdown",payload:!data.filterListDropdown})} className={`flex items-center space-x-1 cursor-pointer ${data.filterListDropdown ? "text-yellow-700" : ""}`}>
						<span className="text-md md:text-lg">Filter</span>
						<span><svg className="w-4 h-4 text-gray-700 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></span>
					</div>
					<span>/</span>
					<div onClick={e=> dispatch({type:"searchDropdown",payload:!data.searchDropdown})} className={`flex items-center space-x-1 cursor-pointer ${data.searchDropdown ? "text-yellow-700" : ""}`}>
						<span className="text-md md:text-lg">Search</span>
						<span><svg className="w-4 h-4 text-gray-700 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
					</div>
				</div>
			</div>
			<Search/>
			<br></br>
			<hr />
	    </Fragment>
    )
}

export default ProductCategory;