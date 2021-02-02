import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi"
import { HomeContext } from "./index"
import { isWishReq, unWishReq, isWish } from "./Mixins";
import { isAdmin } from "../auth/fetchApi";
import { LayoutContext } from "../layout";

const apiURL = process.env.REACT_APP_API_URL

const SingleProduct = (props) => {

		const { data, dispatch } = useContext(HomeContext)
		const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);
		const { products } = data
		const history = useHistory()

		const loginModalOpen = () => layoutData.loginSignupModal ? layoutDispatch({ type: "loginSignupModalToggle", payload: false }) : layoutDispatch({ type: "loginSignupModalToggle", payload: true })

		const [pageNumber, setPageNumber] = useState(0);
		const [viewFile, setViewFile] = useState({});  

		function setFile(index, mode) {
			setViewFile(viewFile => ({...viewFile, [index]: mode}))
			if(!mode) {
				setPageNumber(0);
			}
		}
		
		function changePage(offset) {
			setPageNumber(prevPageNumber => prevPageNumber + offset);
		}
		
		function previousPage() {
			changePage(-1);
		}
		
		function nextPage() {
			changePage(1);
		}

		/* WhisList State */
		const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")))

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
						}, 500)
				} catch (error) {
						console.log(error)
				}
		}

		if (data.loading) {
				return <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24"><svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
		}
		return (
				<Fragment>
				<div className="container mx-auto p-8">	
					<div className="flex flex-row flex-wrap -mx-2">    
					{
						products && products.length > 0 
						? products.map((item,index)=> {
							return (
								<Fragment key={index}>
									<div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
										<div className="relative bg-white rounded border">
											{/* <picture className="block bg-gray-200 border-b">
												<img className="h-40 w-full h-full" onClick={e=> history.push(`/products/${item._id}`)} src={`${apiURL}/uploads/worksheets-images/${item.pFile.replace('.pdf','')}/${item.pImages[0]}`} alt="" />
											</picture> */}
											<div className="p-4">
												<div className="flex">
													<div className="w-2/3">
														<h1 className="font-semibold">
															{ item.pName }
														</h1>
													</div>
														{/* <div className="w-1/3">
															<span className={`${item.pOffer == 'Free' ? "" : "hidden"} float-right text-xs bg-blue-400 rounded px-2 py-1 text-white`}>{item.pOffer}</span>
														</div> */}
													</div>
												<div className="text-gray-600 text-base leading-relaxed block md:text-sm lg:text-base">
													{ item.pDescription }
												</div>
												<div className="px-5 py-4 flex justify-end">
													<a onClick={e=> isWishReq(e,item._id,setWlist)} className={`${isWish(item._id,wList) && "hidden"} bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500`}>
														<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
													</a>
													<a onClick={e=> unWishReq(e,item._id,setWlist)} className={`${!isWish(item._id,wList) && "hidden"} bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500`}>
														<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="black" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
													</a>
													<a onClick={() => setFile(index, true)} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
														<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
													</a>
													{
														localStorage.getItem('jwt') 
														? <a href={`${apiURL}/uploads/worksheets/${item.pFile}`} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
															<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
														</a>
														: <a onClick={e=> loginModalOpen()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
															<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
														</a>
													}
												</div>

												<div className={`${viewFile[index] ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />

												<div className={`${viewFile[index] ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
													<div className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
														<div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg w-full">
															<picture className="block bg-gray-200 border-b">
																<img className="h-40 w-full h-full" src={`${apiURL}/uploads/worksheets-images/${item.pFile.replace('.pdf','')}/${item.pImages[pageNumber]}`} alt="" />
															</picture>
															<div className="p-4">
																	{/* <div className="w-2/3">
																		<h1 className="font-semibold inline">
																			{ item.pName }
																		</h1>
																		<button onClick={ () => setFile(index, false) } className="inline bg-red-200 mr-1 rounded text-sm py-1 px-1 hover:bg-red-500">
																			<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
																		</button>
																	</div> */}
																<div className="flex items-center justify-between w-full pt-4">
																	<span className="text-left font-semibold tracking-wider">{ item.pName }</span>
																	<span style={{background: '#303031'}} onClick={() => setFile(index, false)} className="cursor-pointer text-gray-100 py-1 px-1 rounded-full">
																		<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
																	</span>
																</div>
																<div className="text-gray-600 text-base leading-relaxed block md:text-sm lg:text-base">
																	Page {pageNumber + 1 || (item.pImages.length ? 1 : '--')} of {item.pImages.length || '--'}
																</div>
																<div className="px-5 py-4 flex justify-end">
																	<button onClick={pageNumber > 0 ? previousPage : new Function()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
																		<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
																	</button>
																	<button onClick={pageNumber < item.pImages.length - 1 ? nextPage : new Function()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
																		<svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
																	</button>
																	{
																		localStorage.getItem('jwt') 
																		? <a href={`${apiURL}/uploads/worksheets/${item.pFile}`} className="bg-blue-200 py-2 px-3 rounded inline-flex items-center hover:bg-blue-500">
																			<svg className="-5 h-5 md:w-6 md:h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
																		</a>
																		: <a className="bg-blue-200 py-2 px-3 rounded inline-flex items-center hover:bg-blue-500">
																			<span>Subscribe Now</span>
																		</a>
																	}
																</div>
															</div>
														</div>
													</div> 
												</div>
											</div>
										</div>
									</div>
								</Fragment>   
							)
						})
						: <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No product found</div>
					}
					</div>
				</div>
			</Fragment>
		)
}

export default SingleProduct;