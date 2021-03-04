import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from './Action';
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllDescriptorFirst } from "../../../Mixins/fetchDescriptor";
import logo from "../../../logo-small.png";
import "./style.css";

const Navber = (props) => {

	const history = useHistory();
	const location = useLocation();
	let [isOpen, setIsOpen] = useState(true);
	const [categories, setCategories] = useState([]);
	const [descriptorFirst, setDescriptorFirst] = useState([]);

	useEffect(() => {
		let unmounted = false;
		const fetchDescriptorFirst = async () => {
			let responseData = await getAllDescriptorFirst();
			setTimeout(() => {
				if (responseData && !unmounted) {
					setDescriptorFirst(responseData.Descriptors)
				}
			}, 1000)
		}
		fetchDescriptorFirst();
		return () => {
			unmounted = true
		}
	}, [])

	useEffect(() => {
		let unmounted = false;
		const fetchCategories = async () => {
			let responseData = await getAllCategory();
			setTimeout(() => {
				if (responseData && !unmounted) {
					setCategories(responseData.Categories)
				}
			}, 1000)
		}
		fetchCategories();
		return () => {
			unmounted = true
		}
	}, [])

	const clickDescriptor = (catId, dFirstId) => {
		history.push(`/products/category/${catId}/${dFirstId}`)
		setIsOpen(isOpen = !isOpen)
	}

	const { data, dispatch } = useContext(LayoutContext);

	const loginModalOpen = () => data.loginSignupModal ? dispatch({ type: "loginSignupModalToggle", payload: false }) : dispatch({ type: "loginSignupModalToggle", payload: true })

	return (
		<Fragment>
			<nav className="px-6 py-3 top-10 w-full z-10 shadow-lg lg:shadow-none bg-gray-700">
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<div class="h-20 w-20 self-center mr-2">
							<img src={logo} alt="website logo"/>
						</div>
						<div className="text-white text-xl font-bold md:text-2xl" onClick={e=> history.push('/')}>Worksheets Warrior</div>
					</div>

					<div className="flex md:hidden">
						<button onClick={() => setIsOpen(false)} type="button" className={`${isOpen === false ? "hidden" : "block"} text-white focus:outline-none`} aria-label="toggle menu">
							<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
							<path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
							</svg>
						</button>
						<button onClick={() => setIsOpen(true)} type="button" className={`${isOpen === true ? "hidden" : "block"} text-white focus:outline-none`} aria-label="toggle menu">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
						</button>
					</div>
				</div>

				<div className={`${isOpen === true ? "hidden" : "block"} md:flex items-center`}>
					<div className="flex text-lg flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
						<div class="my-1 text-white leading-5 hover:bg-gray-800 hover:underline bg-gray-700 md:mx-4 md:my-0" onClick={e=> history.push('/')}>
							<button class="px-3 py-3 rounded-lg flex items-center min-w-20">
								<span class="pr-1 font-semibold flex-1">Home</span>
							</button>
						</div>
						<div class="my-1 text-white leading-5 hover:bg-gray-800 hover:underline md:mx-4 md:my-0 bg-gray-700" onClick={e=> history.push('/membership')}>
							<button class="px-3 py-3 rounded-lg flex items-center min-w-20">
								<span class="pr-1 font-semibold flex-1">Membership</span>
							</button>
						</div>
						<div class="my-1 text-white leading-5 hover:bg-gray-800 hover:underline md:mx-4 md:my-0 bg-gray-700" onClick={e=> history.push('/')}>
							<button class="px-3 py-3 rounded-lg flex items-center min-w-20">
								<span class="pr-1 font-semibold flex-1">Contact Us</span>
							</button>
						</div>
					</div>

					<div className="flex items-center py-2 -mx-1 md:mx-0">
						<div onClick={e=> history.push('/wish-list')} className="hover:bg-gray-800 rounded-lg px-2 py-2 cursor-pointer" title="Wishlist">
							<svg className={`${location.pathname === '/wish-list' ? "fill-current text-white" : ""} w-8 h-8 text-white cursor-pointer`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
						</div>
						{
							localStorage.getItem('jwt') 
							? <Fragment>
								<div className="userDropdownBtn hover:bg-gray-800 px-2 py-2 rounded-lg relative" title="Logout">
									<svg className="cursor-pointer w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
									<div className="userDropdown absolute right-0 mt-1 bg-white rounded">
									{
										!isAdmin()
										? <Fragment>
											<li className="flex flex-col text-gray-800 w-48 shadow-lg">
												<span onClick={e=> history.push('/user/profile')} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
													<span>My Account</span>
												</span>
												<span onClick={e=> history.push('/wish-list')} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></span>
													<span>Favourites</span>
												</span>
												<span onClick={e=> history.push('/user/setting')} className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
													<span>Setting</span>
												</span>
												<span onClick={e=> logout() } className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></span>
													<span>Logout</span>
												</span>
											</li>
											</Fragment>
										: <Fragment>
											<li className="flex flex-col text-gray-800 w-48 shadow-lg">
												<span onClick={e=> history.push('/admin/dashboard')}  className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
													<span>Admin Panel</span>
												</span>
												<span onClick={e=> logout() } className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
													<span><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></span>
													<span>Logout</span>
												</span>
											</li>
											</Fragment>
									}
									
									</div>
								</div>
								</Fragment>
							: (
								/* Login Modal Button */
								<div onClick={e=> loginModalOpen()} className="cursor-pointer hover:bg-gray-800 px-2 py-2 rounded-lg" title="Login">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
									</svg>
								</div>
							)
						}
					</div>

				</div>
				</div>
				<div class="py-4">
						<hr />
				</div>
				<div class="-mx-3 overflow-y-auto whitespace-no-wrap scroll-hidden">
						{
							[1, 2, 3, 4, 5, 6].map((year, sInd) => {
								return (
									<div key={sInd} class="group inline-block my-1 text-base text-white leading-5 mx-4 md:my-0">
										<button class="hover:bg-gray-800 hover:underline focus:outline-none px-3 py-2 bg-gray-700 rounded-sm flex items-center min-w-20">
											<span class="pr-1 font-semibold flex-1">Year {year}</span>
											<span>
												<svg className="fill-current h-4 w-4 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
											</span>
										</button>
										<ul class="text-gray-800 bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
										transition duration-150 ease-in-out origin-top min-w-32">
											{
												categories.map((category, index) => {
													return (
														<li key={category._id} class="rounded-sm px-3 py-2 hover:bg-gray-400">
															<button class="w-full text-left flex items-center outline-none focus:outline-none">
																<span class="pr-1 flex-1">
																	{category.cName}
																</span>
																<span class="mr-auto">
																<svg class="fill-current h-4 w-4 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
																	<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
																</svg>
																</span>
															</button>
															<ul class="text-gray-800 bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-20">
																{
																	descriptorFirst.map((descriptor, index) => {
																		return (		
																			<li onClick={(e) => clickDescriptor(category._id, descriptor._id)} 
																			key={descriptor._id} className={`${descriptor.grade === year && descriptor.dCategory._id === category._id ? "block" : "hidden"} px-3 py-2 hover:bg-gray-400 cursor-pointer`}>{descriptor.dContent}</li>
																		)
																	})
																}
															</ul>
														</li>
													)
												})
											}
										</ul>
									</div>
								)
							})
						}
  				</div>

			</nav>
		</Fragment>
	)
}

export default Navber;