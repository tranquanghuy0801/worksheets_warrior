import React, { Fragment, useEffect, useContext } from 'react';
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { groupProductsByThirdDescriptor } from "./Mixins";
import SingleWorksheet from "./SingleWorksheet";

const ProductHomePage = (props) => {

		const { data, dispatch } = useContext(HomeContext)
		const { products } = data

		useEffect(() => {
			fetchData()
		}, [])

		const fetchData = async () => {
				dispatch({ type: "loading", payload: true })
				try {
					let responseData = await getAllProduct();
					setTimeout(() => {
							if (responseData && responseData.Products) {
								dispatch({ type: "setProducts", payload: responseData.Products })
								dispatch({ type: "loading", payload: false })
							}
						}, 700)
				} catch (error) {
						console.log(error)
				}
		}

		if (data.loading) {
				return <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24"><svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
		}
		return (
				<Fragment>
					{
						products && products.length > 0 
						? groupProductsByThirdDescriptor(products).map((descriptor, dIndex)=> {
							return (
								<Fragment key={descriptor.id}>
									<div className="border-l-4 border-red-700 p-3 text-md md:text-lg text-gray-700">
										<h1>{descriptor.name}</h1>
									</div>
									<div className="container mx-auto p-8">	
										<div className="flex flex-row flex-wrap -mx-2">  
										{
											descriptor.listProducts.length > 0
											? descriptor.listProducts.map((item, index) => {
												return (						
													<SingleWorksheet key={item._id} item={item}/>
												)
											})

											:
											""
										}
										</div>
									</div>
									<hr className="text-gray-700"/>
									<br />
								</Fragment>
							)
						})
						: <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No worksheet found</div>
					}
			</Fragment>
		)
}

export default ProductHomePage;