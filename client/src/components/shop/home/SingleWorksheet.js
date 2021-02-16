import React, { Fragment, useState, useContext } from 'react'
import { isWishReq, unWishReq, isWish, levels } from "./Mixins";
import { LayoutContext } from "../layout";

const apiURL = process.env.REACT_APP_API_URL

const SingleWorksheet = ({item}) => {

    const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);
    const loginModalOpen = () => layoutData.loginSignupModal ? layoutDispatch({ type: "loginSignupModalToggle", payload: false }) : layoutDispatch({ type: "loginSignupModalToggle", payload: true })

    const [pageNumber, setPageNumber] = useState(0);
    const [viewFile, setViewFile] = useState({});  

    function setFile(index, mode) {
        setViewFile(viewFile => ({...viewFile, [index]: mode}))
        if(!mode) {
            setPageNumber(0);
        }
    }
    
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    
    function previousPage() {
        changePage(-1);
    }
    
    function nextPage() {
        changePage(1);
    }

    /* WhisList State */
    const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")))

    return (
    <Fragment>
        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <div className="relative bg-white rounded border">
                {/* <picture className="block bg-gray-200 border-b">
                    <img className="h-40 w-full h-full" onClick={e=> history.push(`/products/${item._id}`)} src={`${apiURL}/uploads/worksheets-images/${item.pFile.replace('.pdf','')}/${item.pImages[0]}`} alt="" />
                </picture> */}
                <div className="p-4">
                    <div className="flex">
                        <div className="w-2/3">
                            <h1 className="font-semibold">
                                { item.pName }
                            </h1>
                        </div>
                            <div className="w-1/3">
                                <span className='float-right text-xs bg-blue-400 rounded px-2 py-1 text-white'>{levels[item.pLevel]}</span>
                            </div>
                    </div>
                    <div className="text-gray-600 text-base leading-relaxed block md:text-sm lg:text-base">
                        { item.pDescriptor1.dContent }
                    </div>
                    <div className="px-5 py-4 flex justify-end">
                        <a onClick={e=> isWishReq(e,item._id,setWlist)} className={`${isWish(item._id,wList) && "hidden"} bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500`}>
                            <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </a>
                        <a onClick={e=> unWishReq(e,item._id,setWlist)} className={`${!isWish(item._id,wList) && "hidden"} bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500`}>
                            <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="black" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </a>
                        <a onClick={() => setFile(item._id, true)} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                            <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </a>
                        {
                            localStorage.getItem('jwt') 
                            ? <a href={`${apiURL}/uploads/worksheets/${item.pFile}`} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                                <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </a>
                            : <a onClick={e=> loginModalOpen()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                                <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </a>
                        }
                    </div>

                    <div className={`${viewFile[item._id] ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />

                    <div className={`${viewFile[item._id] ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
                        <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
                            <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                                <div className="w-full md:w-1/2">
                                    <div className="mb-10 md:mb-20 text-gray-600 font-light">
                                        <h1 className="font-black uppercase text-md md:text-lg text-black-500 mb-10">{item.pName}</h1>
                                        <p>Page {pageNumber + 1 || (item.pImages.length ? 1 : '--')} of {item.pImages.length || '--'}</p>
                                    </div>
                                    <div className="mb-5 md:mb-0">
                                        <div className="flex">
                                            <div className="w-2/3">
                                                <button onClick={pageNumber > 0 ? previousPage : new Function()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                                                    <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                                                </button>
                                                <button onClick={pageNumber < item.pImages.length - 1 ? nextPage : new Function()} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                                                    <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </button>
                                                {
                                                    localStorage.getItem('jwt') 
                                                    ? <a href={`${apiURL}/uploads/worksheets/${item.pFile}`} className="bg-blue-200 py-2 px-3 rounded inline-flex items-center hover:bg-blue-500">
                                                        <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                                    </a>
                                                    : <a className="bg-blue-200 py-2 px-3 rounded inline-flex items-center hover:bg-blue-500">
                                                        <span>Subscribe Now</span>
                                                    </a>
                                                }
                                            </div>
                                            <div className="w-1/3">
                                                <button onClick={() => setFile(item._id, false)} className="bg-blue-200 mr-1 rounded text-sm py-2 px-3 hover:bg-blue-500">
                                                    <svg className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        </div>											 
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 text-center">
                                    <img className="h-40 w-full h-full" src={`${apiURL}/uploads/worksheets-images/${item.pFile.split('-')[0]}/${item.pImages[pageNumber]}`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default SingleWorksheet
