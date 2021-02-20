import React, { Fragment, useContext, useState, useEffect } from 'react';
import Layout from './Layout';
import { DashboardUserContext } from './Layout'
import { updatePersonalInformationAction } from './Action';

const ProfileComponent = () => {

    const { data, dispatch } = useContext(DashboardUserContext)
    const userDetails = data.userDetails !== null ? data.userDetails : ""

    const [fData, setFdata] = useState({
        id: "",
        firstName: "",
		lastName: "",
		city: "",
		state: "",
		postCode: "",
        email: "",
        success: false,
		message: false
    })

    useEffect(() => {
        setFdata({ ...fData, id: userDetails._id, firstName: userDetails.firstName, lastName: userDetails.lastName, 
			email: userDetails.email, city: userDetails.city, state: userDetails.state, postCode: userDetails.postCode })
    }, [userDetails])

    const handleSubmit = () => {
        updatePersonalInformationAction(dispatch, fData, setFdata)
    }

    if (data.loading) {
        return <div className="w-full md:w-9/12 flex items-center justify-center "><svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
    }
    return (
        <Fragment>
			<div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
				<div className="shadow-lg border">
					<div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">Personal Information</div>
					<hr/>
					<div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
						{
							fData.success ? <div className="bg-green-200 px-4 py-2 rounded">{fData.success}</div> : ""
						}
						{
							fData.message ? <div className="bg-red-200 px-4 py-2 rounded">{fData.message}</div> : ""
						}
						<div className="flex flex-col space-y-2">
							<label htmlFor="firstName">First Name</label>
							<input onChange={e=> setFdata({...fData,firstName:e.target.value})} value={fData.firstName} type="text" id="firstName" className="border px-4 py-2 w-full focus:outline-none" />
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="lastName">Last Name</label>
							<input onChange={e=> setFdata({...fData,lastName:e.target.value})} value={fData.lastName} type="text" id="lastName" className="border px-4 py-2 w-full focus:outline-none" />
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="email">Email</label>
							<input value={fData.email} readOnly type="email" id="email" className="cursor-not-allowed border px-4 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed" />
							<span className="text-xs text-gray-500">You can't change your email</span>
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="city">City</label>
							<input onChange={e=> setFdata({...fData,city:e.target.value})} value={fData.city} type="text" id="city" className="border px-4 py-2 w-full focus:outline-none" />
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="state">State</label>
							<select onChange={e=> setFdata({...fData,state:e.target.value})} value={fData.state} type="text" id="state" className="border px-4 py-2 w-full focus:outline-none">
								<option disabled value="">Select a state</option>
								<option>ACT</option>
								<option>NSW</option>
								<option>VIC</option>
								<option>QLD</option>
								<option>SA</option>
								<option>WA</option>
								<option>NT</option>
								<option>TAS</option>
							</select>
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="postCode">Postcode</label>
							<input onChange={e=> setFdata({...fData,postCode:e.target.value})} value={fData.postCode} type="text" id="postCode" className="border px-4 py-2 w-full focus:outline-none" />
						</div>
						<div onClick={e=> handleSubmit()} style={{background: '#303031'}} className="w-full text-center cursor-pointer px-4 py-2 text-gray-100">Update Information</div>
					</div>
				</div>
			</div>
		</Fragment>
    )
}

const UserProfile = (props) => {
    return (
        <Fragment>
	    	<Layout children={<ProfileComponent/>}/>
	    </Fragment>
    )
}

export default UserProfile;