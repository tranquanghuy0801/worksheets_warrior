import React, { Fragment, useEffect, useState } from 'react';
import {useHistory,useParams} from "react-router-dom";
import Layout from "../layout";
import {productByCategory} from '../../admin/products/FetchApi'
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL

const Submenu = ({category}) => {
	const history = useHistory()
	return (
		<Fragment>
			{/* Submenu Section */}
			  <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
				<div className="flex justify-between items-center">
				  <div className="text-sm flex space-x-3">
					<span className="hover:text-yellow-700 cursor-pointer" onClick={e=> history.push('/')}>Products</span>
					<span className="cursor-default">/</span>
					<span className="text-yellow-700 cursor-default">{category}</span>
				  </div>
				  <div>
					<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
				  </div>
				</div>
			  </section>
		  	{/* Submenu Section */}
		</Fragment>
	)
}

const AllProduct = ({products})=> {
	const history = useHistory()

	/* WhisList State */
	const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")))

	console.log(products);
	
	const category = products && products.length > 0 ? products[0].pCategory.cName : ""
	return (
		<Fragment>
			<Submenu category={category} />
			<div class="container mx-auto p-8">
				<div class="flex flex-row flex-wrap -mx-2">    
				{
					products && products.length > 0 
					? products.map((item,index)=> {
						return (
							<Fragment key={index}>
								<div class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
									<div class="relative bg-white rounded border">
										<picture class="block bg-gray-200 border-b">
										<img class="h-56 w-full object-cover object-center" onClick={e=> history.push(`/products/${item._id}`)} src={`${apiURL}/uploads/categories/${item.pCategory.cImage}`} alt="" />
										</picture>
										<div class="p-4">
											<h3 class="text-lg font-bold">
												<a class="stretched-link" href="#" title="Card 1">
													{item.pName}
												</a>
											</h3>
											<div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
												{ item.pDescription }
											</div>
											<div className="relative">
												<svg onClick={e=> isWishReq(e,item._id,setWlist)} className={`${isWish(item._id,wList) && "hidden"} inline w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
												<svg onClick={e=> unWishReq(e,item._id,setWlist)} className={`${!isWish(item._id,wList) && "hidden"} inline w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
												<a className="inline bg-white-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">
													<i className="inline fas fa-search fa-lg"></i>
												</a>
												<a className="inline bg-white-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">
													<i className="inline fas fa-file-download fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
							</Fragment>   
						)
					})
					: <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No worksheet found</div>
				}
				</div>
			</div>
		</Fragment>
	)
}

const PageComponent = () => {

	const [products,setProducts] = useState(null)
	const {catId} = useParams()

	useEffect(()=> {
		fetchData()
	},[])

	const fetchData = async ()=> {
		try {
			let responseData = await productByCategory(catId);
			if(responseData && responseData.Products){
				setProducts(responseData.Products)
			}
		}catch(error){
			console.log(error)
		}
	}

	return (
		<Fragment>
			<AllProduct products={products} />
		</Fragment>
	)
}


const ProductByCategory = (props) => {
	return (
		<Fragment>
			<Layout children={<PageComponent/>} />
		</Fragment>
	)
}

export default ProductByCategory;