import React, { useState, useContext } from 'react'
import { getAllProduct } from "../../admin/products/FetchApi"
import { HomeContext } from "./index"

const Search = () => {

	const { data, dispatch } = useContext(HomeContext)
	const [search, setSearch] = useState("")

	const searchHandle = () => {
		fetchData('search')
	}

	const fetchData = async (mode) => {
		dispatch({ type: "loading", payload: true })
		try {
			setTimeout(async () => {
				let responseData = await getAllProduct();
				if (responseData && responseData.Products) {
					if (mode === 'search') {
						dispatch({ type: "searchHandleInReducer", payload: search, productArray: responseData.Products })
					} else {
						dispatch({ type: "setProducts", payload:  responseData.Products})
					}
					dispatch({ type: "loading", payload: false })
				}
			}, 500)
		} catch (error) {
			console.log(error)
		}
	}

	const closeSearchBar = () => {
		dispatch({ type: "searchDropdown", payload: !data.searchDropdown })
		fetchData('close')
		setSearch("")
	}

	return (
		<div className={`${data.searchDropdown ? "" : "hidden"} my-4 flex items-center justify-between`}>
			{/* <input value={search} onChange={e=> setSearch(e.target.value)} className="px-4 text-xl py-4 focus:outline-none" type="text" placeholder="Search products..." /> */}
			<div class="w-2/3 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
				<input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} id="search" placeholder="Search worksheets"
						class="appearance-none w-full outline-none focus:outline-none active:outline-none"/>
				<button onClick={() => searchHandle() }type="submit" class="ml-1 outline-none focus:outline-none active:outline-none">
					<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						viewBox="0 0 24 24" class="w-6 h-6">
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</button>
			</div>
			<div onClick={e=> closeSearchBar()} className="cursor-pointer">
			  <svg className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
			</div>
	  	</div>
	)
}

export default Search
