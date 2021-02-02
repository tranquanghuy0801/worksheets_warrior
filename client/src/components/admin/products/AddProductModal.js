import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ProductContext } from "./index";
import { createProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";


const AddProductDetail = ({ categories }) => {

		const { data, dispatch } = useContext(ProductContext);

		const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

		const [fData, setFdata] = useState({
				pName: "",
				pDescription: "",
				pStatus: "Active",
				pCategory: "",
				pFile: "",
				success: false,
				error: false
		})

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

				if (!fData.pFile) {
					setFdata({ ...fData, error: "Please upload the worksheet's file" })
					setTimeout(() => {
							setFdata({ ...fData, error: false })
					}, 2000)
				}

				try {
					let responseData = await createProduct(fData);
					if (responseData.success) {
							fetchData();
							setFdata({ ...fData, pName: "", pDescription: "", pStatus: "Active", pCategory: "", pFile: "", success: responseData.success, error: false })
							setTimeout(() => {
									setFdata({ ...fData, pName: "", pDescription: "", pStatus: "Active", pCategory: "", pFile: "", success: false, error: false })
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
									<div className="w-1/2 flex flex-col space-y-1 space-x-1">
										<label htmlFor="name">Worksheet Name *</label>
										<input 
											value={fData.pName} 
											onChange={e=> setFdata({...fData,error:false,success:false,pName:e.target.value})}
											className="px-4 py-2 border focus:outline-none" type="text" />
									</div>
									<div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="status">Worksheet Subject *</label>
										<select 
											value={fData.pCategory} 
											onChange={e=> setFdata({...fData,error:false,success:false,pCategory:e.target.value})}
											name="status" 
											className="px-4 py-2 border focus:outline-none" id="status">
											<option disabled value="">Select a subject</option>
											{
												categories.length>0
												? categories.map(function(elem) {
													return (
														<option name="status" value={elem._id} key={elem._id}>{elem.cName}</option>
													)
												})
												: ""
											}
										</select>
									</div>
								</div>
								<div className="flex flex-col space-y-2">
									<label htmlFor="description">Worksheet Description *</label>
									<textarea 
										value={fData.pDescription} 
										onChange={e=> setFdata({...fData,error:false,success:false,pDescription:e.target.value})} 
										className="px-4 py-2 border focus:outline-none"
										name="description" 
										id="description" cols={5} rows={2} />
								</div>
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
								<div className="flex space-x-1 py-4">
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