import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ProductContext } from "./index";
import { editProduct, getAllProduct, getDescriptorFirst, getDescriptorSecond, getDescriptorThird } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
import TagsInput from './TagsInput';
const apiURL = process.env.REACT_APP_API_URL

const EditProductModal = (props) => {
    const { data, dispatch } = useContext(ProductContext);

    const [categories, setCategories] = useState(null);
    const [descriptorContent1, setContent1] = useState([]);
		const [descriptorContent2, setContent2] = useState([]);
		const [descriptorContent3, setContent3] = useState([]);

    const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

    const [editformData, setEditformdata] = useState({
        pId: "",
        pName: "",
        pGrade: 1,
        pImages: null,
        pStatus: "",
        pCategory: "",
        pLevel: "",
        pFile: "",
        pEditFile: "",
        pDescriptor1: "",
        pDescriptor2: "",
        pDescriptor3: "",
        pKeywords: [],
        error: false,
        success: false,
    })

    let isMounted = true; // note this flag denote mount status

    useEffect(() => {
        isMounted = true;
        fetchCategoryData()
        return () => { isMounted = false };
    }, [])

    const firstDescriptorHandle = (e) => {
      setEditformdata({...editformData,error:false,success:false,pDescriptor1:e.target.value});
      fetchDescriptor2(e.target.value.split('-')[0])
      fetchDescriptor3(e.target.value.split('-')[0])
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

    const fetchCategoryData = async () => {
        let responseData = await getAllCategory();
        if (responseData.Categories && isMounted) {
          setCategories(responseData.Categories)
        }
    }

    useEffect(() => {
      isMounted = true;
      if (isMounted) {
        setEditformdata({
            pId: data.editProductModal.pId,
            pName: data.editProductModal.pName,
            pGrade: data.editProductModal.pGrade,
            pImages: data.editProductModal.pImages,
            pStatus: data.editProductModal.pStatus,
            pCategory: data.editProductModal.pCategory,
            pLevel: data.editProductModal.pLevel,
            pFile: data.editProductModal.pFile,
            pDescriptor1: data.editProductModal.pDescriptor1,
            pDescriptor2: data.editProductModal.pDescriptor2,
            pDescriptor3: data.editProductModal.pDescriptor3,
            pKeywords: data.editProductModal.pKeywords,
        })
        console.log(data.editProductModal.pKeywords)
        if (data.editProductModal.pCategory && data.editProductModal.pGrade) {
          fetchDescriptor1(data.editProductModal.pCategory, data.editProductModal.pGrade)
        }
        if (data.editProductModal.pDescriptor1) {
          fetchDescriptor2(data.editProductModal.pDescriptor1)
          fetchDescriptor3(data.editProductModal.pDescriptor1)
        }
      }
      return () => { isMounted = false };
    }, [data.editProductModal])

    const fetchData = async () => {
        let responseData = await getAllProduct()
        if (responseData && responseData.Products) {
            console.log(responseData.Products);
            dispatch({ type: "fetchProductsAndChangeState", payload: responseData.Products })
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(editformData);
        if (!editformData.pEditFile) {
          console.log("File Not upload=============", editformData);
        } else {
          console.log("File uploading");
        }
        try {
            let responseData = await editProduct(editformData);
            if (responseData.success) {
                fetchData();
                setEditformdata({ ...editformData, success: responseData.success })
                setTimeout(() => {
                    return setEditformdata({ ...editformData, success: responseData.success })
                }, 2000)
            } else if (responseData.error) {
                setEditformdata({ ...editformData, error: responseData.error })
                setTimeout(() => {
                    return setEditformdata({ ...editformData, error: responseData.error })
                }, 2000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
          {/* Black Overlay */}
          <div onClick={e=> dispatch({type:"editProductModalClose",payload:false})} className={`${data.editProductModal.modal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />
          {/* End Black Overlay */}

          {/* Modal Start */}
          <div className={`${data.editProductModal.modal ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
            <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
              <div className="flex items-center justify-between w-full pt-4">
                <span className="text-left font-semibold text-2xl tracking-wider">Edit Worksheet</span>
                {/* Close Modal */}
                <span style={{background: '#303031'}} onClick={e=> dispatch({type:"editProductModalClose",payload:false})} className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></span>
              </div>
              { editformData.error ? alert(editformData.error,"red") : ""}
              { editformData.success ? alert(editformData.success,"green") : ""}
               <form className="w-full" onSubmit={e=> submitForm(e)}>
                <div className="flex space-x-1 py-2">
                  <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                    <label htmlFor="name">Worksheet Name *</label>
                    <input 
                      value={editformData.pName} 
                      onChange={e=> setEditformdata({...editformData,error:false,success:false,pName:e.target.value})}
                      className="px-4 py-2 border focus:outline-none" type="text" />
                  </div>
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="status">Worksheet Status *</label>
                    <select 
                      value={editformData.pStatus} 
                      onChange={e=> setEditformdata({...editformData,error:false,success:false,pStatus:e.target.value})} 
                      name="status"
                      className="px-4 py-2 border focus:outline-none" 
                      id="status">
                      <option name="status" value="Active">Active</option>
                      <option name="status" value="Disabled">Disabled</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-1 py-2">
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="subject">Worksheet Subject *</label>
                    <h1 className="px-4 py-2 border focus:outline-none" id="subject">{editformData.pCategory.cName}</h1>
                    {/* <select 
                      onChange={e=> setEditformdata({...editformData,error:false,success:false,pCategory:e.target.value})}
                      name="subject" 
                      className="px-4 py-2 border focus:outline-none" id="subject">
                      <option disabled value="">Select a subject</option>
                      {
                        categories && categories.length>0
                        ? categories.map((elem)=> {
                          return (
                            <Fragment key={elem._id}>
                              { editformData.pCategory._id && editformData.pCategory._id  === elem._id
                                ? <option name="subject" value={elem._id} key={elem._id} selected>{elem.cName}</option>
                                : <option name="subject" value={elem._id} key={elem._id}>{elem.cName}</option>
                              }
                            </Fragment>
                          )
                        })
                        : ""
                      }
                    </select>   */}
                  </div>
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="grade">Worksheet Grade *</label>
                    <h1 className="px-4 py-2 border focus:outline-none" id="subject">{editformData.pGrade}</h1>
                  </div>
                </div>
                <div className="flex space-x-1 py-2">
                  <div className="w-1/2 flex flex-col space-y-1">
										<label htmlFor="difficulty">Worksheet Difficulty *</label>
										<select 
											value={editformData.pLevel} 
											onChange={e=> setEditformdata({...editformData,error:false,success:false,pLevel:e.target.value})}
											name="difficulty"
											className="px-4 py-2 border focus:outline-none" 
											id="difficulty">
											<option name="difficulty" value="E">Easy</option>
											<option name="difficulty" value="M">Moderate</option>
											<option name="difficulty" value="H">Hard</option>
										</select>
									</div>
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="subject">Content Descriptor 1 *</label>
                    <select 
												value={typeof editformData.pDescriptor1 !== 'string' ? editformData.pDescriptor1._id + '-' + editformData.pDescriptor1.dCode : editformData.pDescriptor1} 
												onChange={e=> firstDescriptorHandle(e)}
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
                </div>
                <div className="flex space-x-1 py-2">
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="subject">Content Descriptor 2 *</label>
                    <select 
												value={typeof editformData.pDescriptor2 !== 'string' ? editformData.pDescriptor2._id + '-' + editformData.pDescriptor2.dCode : editformData.pDescriptor2} 
												onChange={e=> setEditformdata({...editformData,error:false,success:false,pDescriptor2:e.target.value})}
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
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="subject">Content Descriptor 3 *</label>
                    <select 
												value={typeof editformData.pDescriptor3 !== 'string' ? editformData.pDescriptor3._id + '-' + editformData.pDescriptor3.dCode : editformData.pDescriptor3} 
												onChange={e=> setEditformdata({...editformData,error:false,success:false,pDescriptor3:e.target.value})}
												name="descriptor2" 
												className="px-4 py-2 border focus:outline-none" id="descriptor2">
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
                <div className="flex space-x-1 py-2">
									<div className="w-1/2 flex flex-col space-y-2">
										<label htmlFor="tags">Worksheet Tags *</label>
										<TagsInput setFdata={setEditformdata} fData={editformData}/>
									</div>
								</div>
                <div className="flex flex-col mt-2">
									<label htmlFor="worksheet">Worksheet File *</label>
                  {/* {
                    editformData.pFile ? (
                                    <div className="flex space-x-1">
                                      <img className="h-16 w-16 object-cover" src={`${apiURL}/uploads/worksheets-images/${editformData.pFile.split('-')[0]}/${editformData.pImages[0]}`} alt="" />
                                    </div>
                    ) : ""
                  } */}
                  <h1 id="worksheet">{editformData.pFile}</h1>
									<span className="text-gray-600 text-xs">(Accept .docx, .pdf format)</span>
									<input 
										onChange={e=> setEditformdata({...editformData,error:false,success:false,pEditFile:e.target.files[0]})} 
										type="file" 
										accept=".docx, .pdf"
										className="px-4 py-2 border focus:outline-none" 
										id="worksheet" />
								</div>
                <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                  <button style={{background: '#303031'}} type="submit" className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2">Update worksheet</button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
    )
}

export default EditProductModal;