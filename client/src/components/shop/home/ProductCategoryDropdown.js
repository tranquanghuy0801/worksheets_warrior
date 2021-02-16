import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllCategory } from "../../admin/categories/FetchApi"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css'

const apiURL = process.env.REACT_APP_API_URL

const responsive = {
	superLargeDesktop: {
	  // the naming can be any, depends on you.
	  breakpoint: { max: 4000, min: 3000 },
	  items: 5,
	},
	desktop: {
	  breakpoint: { max: 3000, min: 1024 },
	  items: 3,
	},
	tablet: {
	  breakpoint: { max: 1024, min: 464 },
	  items: 2,
	},
	mobile: {
	  breakpoint: { max: 464, min: 0 },
	  items: 1,
	}
};

const CategoryList = () => {
	const history = useHistory()
	const [categories, setCategories] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			let responseData = await getAllCategory();
			if (responseData && responseData.Categories) {
				setCategories(responseData.Categories)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='my-4'>
			<hr />
			<Carousel responsive={responsive}
					draggable={false}
					swipeable={true}
					ssr={true} // means to render carousel on server-side.
					infinite={true}
					itemClass="carousel-item-padding-40-px"
					removeArrowOnDeviceType={["mobile","tablet"]}>
			{
				categories && categories.length>0 
				? categories.map((item,index)=>{
					return(
						<Fragment key={index}>
							<div onClick={e=> history.push(`/products/category/${item._id}`)} className="col-span-1 m-4 flex flex-col items-center">
								<img src={`${apiURL}/uploads/categories/${item.cImage}`} alt="pic"/>
								<div className="font-medium">{item.cName}</div>
							</div>
						</Fragment>
					)
				})
				: <div className="text-xl text-center my-4">No Category</div>
			}
			</Carousel>
	  	</div>
	)
}


const ProductCategoryDropdown = (props) => {
	return (
		<Fragment>
			<CategoryList/>
		</Fragment>
	)
}

export default ProductCategoryDropdown;