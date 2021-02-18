import React, { useState, useEffect, useContext } from 'react'
import { getAllProduct } from "../../admin/products/FetchApi"
import { HomeContext } from "./index"

const Filter = () => {
	const { data, dispatch } = useContext(HomeContext);
	const [range, setRange] = useState(0)

	const rangeHandle = (e) => {
		setRange(e.target.value)
		fetchData(e.target.value)
	}

	const fetchData = async (price) => {
		if (price === "all") {
			try {
				let responseData = await getAllProduct();
				if (responseData && responseData.Products) {
					dispatch({ type: "setProducts", payload: responseData.Products })
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			dispatch({ type: "loading", payload: true })
			try {
				setTimeout(async () => {
					let responseData = await getAllProduct();
					if (responseData && responseData.Products) {
						console.log(responseData.Products)
						dispatch({ type: "setProducts", payload: responseData.Products })
						dispatch({ type: "loading", payload: false })
					}
				}, 700)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const closeFilterBar = () => {
		fetchData("all")
		dispatch({ type: "filterListDropdown", payload: !data.filterListDropdown })
		setRange(0)
	}


	return (
		<div className={`${data.filterListDropdown ? "" : "hidden"} my-4`}>
			<hr />
		  <div className="w-full flex flex-col">
			<br/>
			<div className="flex justify-between items-center">	
			<div class="flex flex-row mb-1 sm:mb-0">
					<div class="relative">
						<select value={""}
							class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
							<option disabled value="">Grade</option>
							<option>5</option>
							<option>10</option>
							<option>20</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
					<div class="relative">
						<select value={""}
							class="appearance-none h-full rounded-r border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
							<option disabled value="">Subject</option>
							<option>All</option>
							<option>Active</option>
							<option>Inactive</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
					<div class="relative">
						<select value={""}
							class="appearance-none h-full rounded-r border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
							<option disabled value="">Level</option>
							<option>Easy</option>
							<option>Moderate</option>
							<option>Hard</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
				</div>
				<div onClick={e=> closeFilterBar()} className="cursor-pointer">
				  <svg className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
				</div>
			</div>
		  </div>
	  	</div>
	)
}

export default Filter
