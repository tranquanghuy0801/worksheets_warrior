import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { HomeContext } from "./index";
import { getProductByCategoryDescriptor } from "../../../Mixins/fetchDescriptor";
import { groupProductsByThirdDescriptor  } from "./Mixins";
import SingleWorksheet from "./SingleWorksheet";

const Submenu = ({ product }) => {
	const history = useHistory();
	return (
	  <Fragment>
		<section className="m-4 md:mx-8 md:my-6">
			<div className="flex inline-block font-medium">
				<div className="flex items-center space-x-1 cursor-pointer">
					<span className="text-md md:text-base">Year {product.pGrade} / {product.pCategory.cName} / {product.pDescriptor1.dContent}</span>
				</div>
			</div>
			<br></br>
			<hr />
		</section>
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
			{
				products && products.length > 0 
				? groupProductsByThirdDescriptor(products).map((descriptor, dIndex)=> {
					return (
						<Fragment key={descriptor.id}>
							<div className="p-6 text-md md:text-lg text-gray-700">
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
	const [products, setProducts] = useState(null);
  	const { catId, dFirstId } = useParams();

	useEffect(() => {
		fetchData();
	}, [dFirstId, catId]);

	const fetchData = async () => {
		try {
			let responseData = await getProductByCategoryDescriptor(catId, dFirstId);
			if (responseData && responseData.Products) {
				setProducts(responseData.Products);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
		  <AllProduct products={products}/>
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




