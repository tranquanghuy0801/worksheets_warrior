import React, { Fragment, useEffect, useContext, useState } from 'react';
import { HomeContext } from './';
import { sliderImages } from '../../admin/dashboardAdmin/Action';
import { prevSlide, nextSlide, chooseSlide } from './Mixins';

const apiURL = process.env.REACT_APP_API_URL


const SliderPic = (props) => {
	
	const {data, dispatch} = useContext(HomeContext)
	const [slide,setSlide] = useState(0)

	useEffect(()=> {
		sliderImages(dispatch)
	}, [dispatch])

    return (
		<Fragment>
			<div className="relative mt-16 bg-gray-100 border-2">
				{/* <div className="flex flex-col items-center">
					<div className="flex flex-col items-center">
						<div className="swiper flex overflow-x-scroll w-1/2">
							{
								data.sliderImages.map((slider,index) => {
									return (
										<img key={index + 1} id={`slide${index+1}`} className="w-full h-1/2 object-cover bg-gray-300" src={`${apiURL}/uploads/customize/${slider.slideImage}`}/>
									)
								})
							}
						</div>
					</div>
					<div className="flex mt-4">
						{
							data.sliderImages.map((slider,index) => {
								return (
									<a key={index + 1} href={`#slide${index+1}`} className="w-4 h-4 mx-1 bg-gray-400 rounded-full"></a>
								)
							})
						}
					</div>
				</div> */}
			</div>
		</Fragment>
    )
}

export default SliderPic;