import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
const apiURL = process.env.REACT_APP_API_URL

const EditProductModal = (props) => {
    const { data, dispatch } = useContext(ProductContext);

    const [categories, setCategories] = useState(null);

    const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

    const [editformData, setEditformdata] = useState({
        pId: "",
        pName: "",
        pDescription: "",
        pImages: null,
        pStatus: "",
        pCategory: "",
        pFile: "",
        pEditFile: "",
        error: false,
        success: false,
    })

    let isMounted = true; // note this flag denote mount status

    useEffect(() => {
        isMounted = true;
        fetchCategoryData()
        return () => { isMounted = false };
    }, [])

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
            pDescription: data.editProductModal.pDescription,
            pImages: data.editProductModal.pImages,
            pStatus: data.editProductModal.pStatus,
            pCategory: data.editProductModal.pCategory,
            pFile: data.editProductModal.pFile,
        })
      }
      return () => { isMounted = false };
    }, [data.editProductModal])

    const fetchData = async () => {
        let responseData = await getAllProduct()
        if (responseData && responseData.Products) {
            dispatch({ type: "fetchProductsAndChangeState", payload: responseData.Products })
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
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
                <div className="flex space-x-1 py-4">
                  <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                    <label htmlFor="name">Worksheet Name *</label>
                    <input 
                      value={editformData.pName} 
                      onChange={e=> setEditformdata({...editformData,error:false,success:false,pName:e.target.value})}
                      className="px-4 py-2 border focus:outline-none" type="text" />
                  </div>
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="status">Worksheet Subject *</label>
                    <select 
                      onChange={e=> setEditformdata({...editformData,error:false,success:false,pCategory:e.target.value})}
                      name="status" 
                      className="px-4 py-2 border focus:outline-none" id="status">
                      <option disabled value="">Select a subject</option>
                      {
                        categories && categories.length>0
                        ? categories.map((elem)=> {
                          return (
                            <Fragment key={elem._id}>
                              { editformData.pCategory._id && editformData.pCategory._id  === elem._id
                                ? <option name="status" value={elem._id} key={elem._id} selected>{elem.cName}</option>
                                : <option name="status" value={elem._id} key={elem._id}>{elem.cName}</option>
                              }
                            </Fragment>
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
                    value={editformData.pDescription} 
                    onChange={e=> setEditformdata({...editformData,error:false,success:false,pDescription:e.target.value})} 
                    className="px-4 py-2 border focus:outline-none"
                    name="description" 
                    id="description" cols={5} rows={2} />
                </div>
                <div className="flex flex-col mt-4">
									<label htmlFor="worksheet">Worksheet File *</label>
                  {
                    editformData.pFile ? (
                                    <div className="flex space-x-1">
                                      <img className="h-16 w-16 object-cover" src={`${apiURL}/uploads/worksheets-images/${editformData.pFile.replace('.pdf','')}/${editformData.pImages[0]}`} alt="" />
                                    </div>
                    ) : ""
                  }
									<span className="text-gray-600 text-xs">(Accept .docx, .pdf format)</span>
									<input 
										onChange={e=> setEditformdata({...editformData,error:false,success:false,pEditFile:e.target.files[0]})} 
										type="file" 
										accept=".docx, .pdf"
										className="px-4 py-2 border focus:outline-none" 
										id="worksheet" />
								</div>
                <div className="flex space-x-1 py-4">
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