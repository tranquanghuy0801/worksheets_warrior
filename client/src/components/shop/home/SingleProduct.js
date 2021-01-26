import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi"
import { HomeContext } from "./index"
import { isWishReq, unWishReq, isWish } from "./Mixins";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import {PDFtoIMG} from 'react-pdf-to-image';

const apiURL = process.env.REACT_APP_API_URL

const SingleProduct = (props) => {

		const { data, dispatch } = useContext(HomeContext)
		const { products } = data
		const history = useHistory()

		const [numPages, setNumPages] = useState(null);
		const [pageNumber, setPageNumber] = useState(1);
		const [viewFile, setViewFile] = useState({});  

		function setFile(index) {
			setViewFile(viewFile => ({...viewFile, [index]: true}))
		}

		function closeFile(index) {
			setViewFile(viewFile => ({...viewFile, [index]: false}))
		}

		function onDocumentLoadSuccess({ numPages }) {
			if (numPages > 3) {
				setNumPages(numPages - 2);
			} else {
				setNumPages(numPages);
			}
			setPageNumber(1);
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
											<picture className="block bg-gray-200 border-b">
											<img className="h-56 w-full object-cover object-center" onClick={e=> history.push(`/products/${item._id}`)} src={`${apiURL}/uploads/categories/${item.pCategory.cImage}`} alt="" />
											</picture>
											<div className="p-4">
												<div class="flex">
													<div class="w-2/3">
														<h1 class="font-semibold">
															{ item.pName }
														</h1>
														<svg onClick={e=> isWishReq(e,item._id,setWlist)} className={`${isWish(item._id,wList) && "hidden"} inline w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
														<svg onClick={e=> unWishReq(e,item._id,setWlist)} className={`${!isWish(item._id,wList) && "hidden"} inline w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
													</div>
														<div class="w-1/3">
															<span className={`${item.pOffer == 'Free' ? "" : "hidden"} float-right text-xs bg-blue-400 rounded px-2 py-1 text-white`}>{item.pOffer}</span>
														</div>
													</div>
												<div className="text-gray-600 text-base leading-relaxed block md:text-sm lg:text-base">
													{ item.pDescription }
												</div>
												<br></br>
												<div class="px-5 py-4 flex justify-end">
												
													<a onClick={ () => setFile(index) }class="bg-blue-200 mr-1 rounded text-sm py-2 px-3 text-gray-700 hover:bg-blue-500 hover:text-gray-100">Preview</a>
													<a href={`${apiURL}/uploads/worksheets/${item.pFile}`} class="bg-blue-200 mr-1 rounded text-sm py-2 px-3 text-gray-700 hover:bg-blue-500 hover:text-gray-100">Download</a>
												</div>

												<div className={`${viewFile[index] ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />

												<div className={`${viewFile[index] ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
													<div class="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
														<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg w-full">
															<div class="lg:w-4/5">
																<div class="h-64 bg-cover lg:rounded-lg lg:h-full">
																	<Document file={`${apiURL}/uploads/worksheets/${item.pFile}`} 
																	onLoadSuccess={onDocumentLoadSuccess} renderMode={"canvas"} loading={"Loading...."}
																	>
																		<Page pageNumber={pageNumber} />
																	</Document>
																	{/* <iframe src={`${apiURL}/uploads/worksheets/${item.pFile}`} ></iframe> */}
																	{/* <img className="h-56 w-full object-cover object-center" onClick={e=> history.push(`/products/${item._id}`)} src={`${apiURL}/uploads/categories/${item.pCategory.cImage}`} alt="" /> */}
																</div>
															</div>
															<div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/5">
																<p className="mt-4 text-gray-600 justify-center">
																	Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
																</p>
																<section class="container mx-auto px-6 my-1 flex flex-wrap -m-4">
																	<div className="p-2 md:w-40">
																		<a onClick={pageNumber > 1 ? previousPage : new Function()} class="flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100">	
																			<div>
																				<p class=" text-xs font-medium ml-2 ">
																					Prev
																				</p>
																			</div>
																		</a>
																	</div>

																	<div className="p-2 md:w-40">
																		<a onClick={pageNumber < numPages ? nextPage : new Function()} class="flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100">
																			<div>
																				<p class=" text-xs font-medium ml-2 ">
																					Next
																				</p>
																			</div>
																		</a>
																	</div>

																	<div onClick={ () => closeFile(index) } className="p-2 md:w-40">
																		<a class="flex items-center p-4 bg-green-400 rounded-lg shadow-xs cursor-pointer hover:bg-green-700 hover:text-gray-100">
																			<div>
																				<p class="text-xs font-medium ml-2">
																					Close
																				</p>		
																			</div>
																		</a>
																	</div>
																</section>
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