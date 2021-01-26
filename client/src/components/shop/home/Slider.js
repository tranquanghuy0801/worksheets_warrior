import React, { Fragment, useEffect, useContext, useState } from 'react';
import OrderSuccessMessage from './OrderSuccessMessage'
import { HomeContext } from './';
import { sliderImages } from '../../admin/dashboardAdmin/Action';
import { prevSlide, nextSlide, chooseSlide } from './Mixins';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const apiURL = process.env.REACT_APP_API_URL


const SliderPic = (props) => {
	
	const {data, dispatch} = useContext(HomeContext)
	const [slide,setSlide] = useState(0)

	const responsive = {
		superLargeDesktop: {
		  // the naming can be any, depends on you.
		  breakpoint: { max: 4000, min: 3000 },
		  items: 1,
		},
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 1,
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 1,
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1,
		}
	  };

	useEffect(()=> {
		sliderImages(dispatch)
	}, [])

    return (
        <Fragment>
		    <div className="relative mt-16 bg-gray-100 border-2">
				<Carousel swipeable={true}
					draggable={false}
					responsive={responsive}
					ssr={true} // means to render carousel on server-side.
					showDots={true}
					infinite={true}
					autoPlay={true}
					autoPlaySpeed={5000}
					keyBoardControl={true}
					containerClass="carousel-container"
					arrows={false}
					itemClass="carousel-item-padding-40-px">
			    {
					data.sliderImages.map((slider,index) => {
						return (
						<div key={ index + 1}>
							<img className="w-screen" src={`${apiURL}/uploads/customize/${slider.slideImage}`} alt="sliderImage" />
						</div> )
					})
				}
				</Carousel>
		    </div>
		    <OrderSuccessMessage/>
	    </Fragment>
    )
}

export default SliderPic;