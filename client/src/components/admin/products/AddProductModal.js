import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ProductContext } from "./index";
import { createProduct, getAllProduct, getDescriptorFirst, getDescriptorSecond, getDescriptorThird } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";


const AddProductDetail = ({ categories }) => {

		const { data, dispatch } = useContext(ProductContext);
		const [subjectSelected, setSubjectSelected] = useState(false);
		const [descriptorSelected, setDescriptorSelected] = useState(false);
		const [descriptorContent1, setContent1] = useState([]);
		const [descriptorContent2, setContent2] = useState([]);
		const [descriptorContent3, setContent3] = useState([]);

		const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

		const [fData, setFdata] = useState({
				pName: "",
				pGrade: 1,
				pStatus: "Active",
				pCategory: "",
				pLevel: "",
				pFile: "",
				pDescriptor1: "",
				pDescriptor2: "",
				pDescriptor3: "",
				pCode1: null,
				pCode2: null,
				pCode3: null,
				success: false,
				error: false
		})

		const subjectHandle = (e) => {
			setFdata({...fData,error:false,success:false,pCategory:e.target.value});
			setSubjectSelected(true);
			setDescriptorSelected(false);
			fetchDescriptor1(e.target.value, fData.pGrade);
		}

		const gradeHandle = (e) => {
			setFdata({...fData, error: false, success: false, pGrade: e.target.value});
			if (fData.pCategory) {
				setSubjectSelected(true);
				setDescriptorSelected(false);
				fetchDescriptor1(fData.pCategory, e.target.value);
			}
		}

		const descriptorFirstHandle = (e) => {
			setFdata({...fData, error: false, success: false, pDescriptor1: e.target.value.split('-')[0], pCode1: e.target.value.split('-')[1]})
			fetchDescriptor2(e.target.value.split('-')[0]);
			fetchDescriptor3(e.target.value.split('-')[0]);
			setDescriptorSelected(true);
		}

		const fetchDescriptor1 = async (cId, grade) => {
			let responseData = await getDescriptorFirst(cId, grade);
			setTimeout(() => {
				if (responseData && responseData.Descriptors) {
					setContent1(responseData.Descriptors);
				}
			}, 1000)
		}

		const fetchDescriptor2 = async (firstId) => {
			let responseData = await getDescriptorSecond(firstId);
			setTimeout(() => {
				if (responseData && responseData.Descriptors) {
					console.log(responseData.Descriptors);
					setContent2(responseData.Descriptors);
				}
			}, 1000)
		}

		const fetchDescriptor3 = async (firstId) => {
			let responseData = await getDescriptorThird(firstId);
			setTimeout(() => {
				if (responseData && responseData.Descriptors) {
					console.log(responseData.Descriptors);
					setContent3(responseData.Descriptors);
				}
			}, 1000)
		}

		const fetchData = async () => {
				let responseData = await getAllProduct()
				setTimeout(() => {
						if (responseData && responseData.Products) {
								dispatch({ type: "fetchProductsAndChangeState", payload: responseData.Products })
						}
				}, 1000)
		}

		const submitForm = async (e) => {
				e.preventDefault();
				e.target.reset();

				console.log(fData);

				try {
					let responseData = await createProduct(fData);
					if (responseData.success) {
							fetchData();
							setFdata({ ...fData, pName: "", pStatus: "Active", pCategory: "", pLevel: "", pFile: "", pGrade: 1, pDescriptor1: "", pDescriptor2: "", pDescriptor3: "", pCode1: "", pCode2: "", pCode3: "", success: responseData.success, error: false })
							setTimeout(() => {
									setFdata({ ...fData, pName: "", pStatus: "Active", pCategory: "", pLevel: "", pFile: "", pGrade: 1, pDescriptor1: "", pDescriptor2: "", pDescriptor3: "", pCode1: "", pCode2: "", pCode3: "", success: false, error: false })
							}, 2000)
					} else if (responseData.error) {
							setFdata({ ...fData, success: false, error: responseData.error })
							setTimeout(() => {
									return setFdata({ ...fData, error: false, success: false })
							}, 2000)
					}
				} catch (error) {
						console.log(error);
				}

		}

		return (
				<Fragment>
					{/* Black Overlay */}
					<div onClick={e=> dispatch({type:"addProductModal",payload:false})} className={`${data.addProductModal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />
					{/* End Black Overlay */}

					{/* Modal Start */}
					<div className={`${data.addProductModal ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
						<div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
							<div className="flex items-center justify-between w-full pt-4">
								<span className="text-left font-semibold text-2xl tracking-wider">Add Worksheet</span>
								{/* Close Modal */}
								<span style={{background: '#303031'}} onClick={e=> dispatch({type:"addProductModal",payload:false})} className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></span>
							</div>
							{ fData.error ? alert(fData.error,"red") : ""}
							{ fData.success ? alert(fData.success,"green") : ""}
							<form className="w-full" onSubmit={e=> submitForm(e)}>
								<div className="flex space-x-1 py-4">
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="name">Worksheet Name *</label>
										<input 
											value={fData.pName} 
											onChange={e=> setFdata({...fData,error:false,success:false,pName:e.target.value})}
											className="px-4 py-2 border focus:outline-none" type="text" />
									</div>
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="status">Worksheet Status *</label>
										<select 
											value={fData.pStatus} 
											onChange={e=> setFdata({...fData,error:false,success:false,pStatus:e.target.value})} 
											name="status"
											className="px-4 py-2 border focus:outline-none" 
											id="status">
											<option name="status" value="Active">Active</option>
											<option name="status" value="Disabled">Disabled</option>
										</select>
									</div>
								</div>
								<div className="flex space-x-1 py-4">
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="subject">Worksheet Subject *</label>
										<select 
											value={fData.pCategory} 
											onChange={e=> subjectHandle(e)}
											name="subject" 
											className="px-4 py-2 border focus:outline-none" id="subject">
											<option disabled value="">Select a subject</option>
											{
												categories.length>0
												? categories.map(function(elem) {
													return (
														<option name="subject" value={elem._id} key={elem._id}>{elem.cName}</option>
													)
												})
												: ""
											}
										</select>
									</div>
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="grade">Worksheet Grade *</label>
										<input value={fData.pGrade}
											onChange={(e) => gradeHandle(e)}
											type="number"
											className="px-4 py-2 border focus:outline-none"
											id="grade"
										/>
									</div>
								</div>
								<div className="flex space-x-1 py-4">
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="difficulty">Worksheet Difficulty *</label>
										<select 
											value={fData.pLevel} 
											onChange={e=> setFdata({...fData,error:false,success:false,pLevel:e.target.value})} 
											name="difficulty"
											className="px-4 py-2 border focus:outline-none" 
											id="difficulty">
											<option disabled value="">Select a difficulty</option>
											<option name="difficulty" value="E">Easy</option>
											<option name="difficulty" value="M">Moderate</option>
											<option name="difficulty" value="H">Hard</option>
										</select>
									</div>
									{
										subjectSelected ? 
										<div className="w-1/2 flex flex-col space-y-1">
											<label htmlFor="descriptor1">Content Descriptor 1 *</label>
											<select 
												value={fData.pDescriptor1} 
												onChange={e=> descriptorFirstHandle(e)}
												name="descriptor1" 
												className="px-4 py-2 border focus:outline-none" id="descriptor1">
												<option disabled value="">Select a descriptor</option>
												{
													descriptorContent1.length>0
													? descriptorContent1.map(function(elem) {
														return (
															<option value={elem._id + '-' + elem.dCode} key={elem._id}>{elem.dContent} - {elem.dCode}</option>
														)
													})
													: ""
												}
											</select>
										</div>
										: ""
									}
								</div>
								{
									descriptorSelected ?
									<div>
										<div className="flex space-x-1 py-4">
											<div className="w-full flex flex-col space-y-2">
												<label htmlFor="descriptor2">Content Descriptor 2 *</label>
												<select 
													value={fData.pDescriptor2} 
													onChange={e=> setFdata({...fData, error: false, success: false, pDescriptor2: e.target.value.split('-')[0], pCode2: e.target.value.split('-')[1]})}
													name="descriptor2" 
													className="px-4 py-2 border focus:outline-none" id="descriptor2">
													<option disabled value="">Select a descriptor</option>
													{
														descriptorContent2.length>0
														? descriptorContent2.map(function(elem) {
															return (
																<option value={elem._id + '-' + elem.dCode} key={elem._id}>{elem.dContent} - {elem.dCode}</option>
															)
														})
														: ""
													}
												</select>
											</div>
										</div>
										<div className="flex space-x-1 py-4">
											<div className="w-full flex flex-col space-y-2">
												<label htmlFor="descriptor3">Content Descriptor 3 *</label>
												<select 
													value={fData.pDescriptor3} 
													onChange={e=> setFdata({...fData, error: false, success: false, pDescriptor3: e.target.value.split('-')[0], pCode3: e.target.value.split('-')[1]})}
													name="descriptor3" 
													className="px-4 py-2 border focus:outline-none" id="descriptor3">
													<option disabled value="">Select a descriptor</option>
													{
														descriptorContent3.length>0
														? descriptorContent3.map(function(elem) {
															return (
																<option value={elem._id + '-' + elem.dCode} key={elem._id}>{elem.dContent} - {elem.dCode}</option>
															)
														})
														: ""
													}
												</select>
											</div>
										</div>
									</div>
									
									: ""
								}
								<div className="flex flex-col mt-4">
									<label htmlFor="worksheet">Worksheet File *</label>
									<span className="text-gray-600 text-xs">(Accept .docx, .pdf format)</span>
									<input 
										onChange={e=> setFdata({...fData,error:false,success:false,pFile:e.target.files[0]})} 
										type="file" 
										accept=".docx, .pdf"
										className="px-4 py-2 border focus:outline-none" 
										id="worksheet" />
								</div>
								<div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
									<button style={{background: '#303031'}} type="submit" className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2">Create worksheet</button>
								</div>
							</form>
						</div>
					</div>
				</Fragment>
		)
}

const AddProductModal = (props) => {

		let isMounted = true; // note this flag denote mount status
		useEffect(() => {
			fetchCategoryData()
			return () => { isMounted = false };
		}, [])

		const [allCat, setAllCat] = useState({})

		const fetchCategoryData = async () => {
			let responseData = await getAllCategory();
			if (responseData.Categories && isMounted) {
					setAllCat(responseData.Categories)
			}
		}	

		return (
				<Fragment>
					<AddProductDetail categories={allCat} />
				</Fragment>
		)

}

export default AddProductModal;