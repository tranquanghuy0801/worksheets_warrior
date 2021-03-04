import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { getProductByCategoryDescriptor } from "../../../Mixins/fetchDescriptor";
import { groupProductsByThirdDescriptor  } from "./Mixins";
import SingleWorksheet from "./SingleWorksheet";

const Submenu = ({ product }) => {
	return (
	  <Fragment>
		{/* <section className="m-4 md:mx-8 md:my-6"> */}
			<div className="flex inline-block font-medium">
				<div className="flex items-center space-x-1 cursor-pointer">
					<span className="text-md md:text-base">Year {product.pGrade} / {product.pCategory.cName} / {product.pDescriptor1.dContent}</span>
				</div>
			</div>
			<br></br>
			<hr />
		{/* </section> */}
	  </Fragment>
	);
};

const AllProduct = ({products}) => {
	return (
		<Fragment>
			{
				products && products.length > 0 ? 
				<Submenu product={products[0]}/>
				: ""
			}
			<br />
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
							<hr />
						</Fragment>
					)
				})
				: <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">No worksheet found</div>
			}
		</Fragment>
	)

}

const PageComponent = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState(null);
  	const { catId, dFirstId } = useParams();

	useEffect(() => {
		fetchData();
	}, [dFirstId, catId, fetchData]);

	const fetchData = async () => {
		setLoading(true);
		try {
			let responseData = await getProductByCategoryDescriptor(catId, dFirstId);
			if (responseData && responseData.Products) {
				setProducts(responseData.Products);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24"><svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
	}
	return (
		
		<Fragment>
			<section className="m-4 md:mx-8 md:my-6">
				<AllProduct products={products}/>
			</section>
		</Fragment>
	);
}

const ProductByCategoryDescriptor = (props) => {
	return (
	  <Fragment>
		<Layout children={<PageComponent/>} />
	  </Fragment>
	);
  };
  
export default ProductByCategoryDescriptor;




