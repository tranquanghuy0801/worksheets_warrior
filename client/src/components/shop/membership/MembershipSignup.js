import React, { Fragment, useState, useEffect, useContext } from 'react';
import { signupReq } from "../auth/fetchApi";

const MembershipSignup = (props) => {

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		cEmail: "",
		password: "",
		cPassword: "",
		city: "",
		state: "",
		postCode: "",
		error: false,
		loading: false,
		success: false,
	})
	const [showPassword, setShowPassword] = useState(false)
	const alert = (msg, type) => <div className={`text-sm text-${type}-500`} >{msg}</div>

	const formSubmit = async () => {
        setData({ ...data, loading: true });
        if (data.cPassword !== data.password) {
            return setData({ ...data, error: { cPassword: "Password doesn't match", password: "Password doesn't match" } });
        }
		else if (data.cEmail !== data.email) {
			return setData({ ...data, error: { cEmail: "Email doesn't match", email: "Email doesn't match" } });
		}
        try {
            let responseData = await signupReq(data);
            if (responseData.error) {
                setData({ ...data, loading: false, error: responseData.error, password: "", cPassword: "" })
            } else if (responseData.success) {
                setData({ success: responseData.success, firstName: "", lastName: "", email: "", password: "", cPassword: "", 
					email: "", cEmail: "", state: "", city: "", postCode: "", loading: false, error: false })
            }
        } catch (error) {
            console.log(error);
        }
    }

	if (data.loading) {
		return <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24"><svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
	}
	return (
		<Fragment>
			<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
				{
					data.success ? <div className="bg-green-200 px-4 py-2 rounded">{data.success}</div> : ""
				}
				{
					data.error.text ? <div className="bg-red-200 px-4 py-2 rounded">{data.error.text}</div> : ""
				}
				<div class="-mx-3 md:flex mb-6">
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							First Name *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},firstName:e.target.value})} className={`${data.error.firstName ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" type="text" value={data.firstName}  required/>
						{ !data.error.firstName ? "" : alert(data.error.firstName,"red") }
					</div>
					<div class="md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Last Name *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},lastName:e.target.value})} className={`${data.error.lastName ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4`} id="grid-last-name" type="text" value={data.lastName} required/>
						{ !data.error.lastName ? "" : alert(data.error.lastName,"red") }
					</div>
				</div>
				<div class="-mx-3 md:flex mb-6">
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Email *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},email:e.target.value})} className={`${data.error.email ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`} id="grid-email" type="text" value={data.email} required/>
						{ !data.error.email ? "" : alert(data.error.email,"red") }
					</div>
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Confirm Email *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},cEmail:e.target.value})} className={`${data.error.cEmail ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-confirm-email`} type="text" value={data.cEmail} required/>
						{ !data.error.cEmail ? "" : alert(data.error.cEmail,"red") }
					</div>
				</div>
				<div class="-mx-3 md:flex mb-6">
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="inline-block block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Password *
						</label>
						<div class="relative">
							{
								showPassword 
								? <input onChange={e=> setData({...data,success:false,error:{},password:e.target.value})} className={`${data.error.password ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password`} type="text" value={data.password} required/>
								: <input onChange={e=> setData({...data,success:false,error:{},password:e.target.value})} className={`${data.error.password ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password`} type="password" value={data.password} required/>
							}
							{
								showPassword 
								? <div onClick={() => setShowPassword(false)} class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
									<svg className="right-0 inline-block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
								</div>
								: <div onClick={() => setShowPassword(true)} class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
									<svg className="-right-0 inline-block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
								</div>

							}
						</div>
						{ !data.error.password ? "" : alert(data.error.password,"red") } 
					</div>
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Confirm Password * 
						</label>
						{
							showPassword 
							? <input onChange={e=> setData({...data,success:false,error:{},cPassword:e.target.value})} className={`${data.error.cPassword ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-confirm-password`} type="text" value={data.cPassword} required/>
							: <input onChange={e=> setData({...data,success:false,error:{},cPassword:e.target.value})} className={`${data.error.cPassword ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-confirm-password`} type="password" value={data.cPassword} required/>
						}
						{ !data.error.cPassword ? "" : alert(data.error.cPassword,"red") }
					</div>
				</div>
				<div class="-mx-3 md:flex mb-2">
					<div class="md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							City *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},city:e.target.value})} className={`${data.error.city ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city`} type="text" value={data.city} required/>
						{ !data.error.city ? "" : alert(data.error.city,"red") }
					</div>
					<div class="md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							State *
						</label>
						<div class="relative">
							<select onChange={e=> setData({...data,success:false,error:{},state:e.target.value})} value={data.state} className={`${data.error.state ? "border-red-500" : ""} block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`} id="grid-state" required>
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
							{ !data.error.state ? "" : alert(data.error.state,"red") }
						</div>
					</div>
					<div class="md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-grey-darker text-base font-bold mb-2">
							Postcode *
						</label>
						<input onChange={e=> setData({...data,success:false,error:{},postCode:e.target.value})} className={`${data.error.postCode ? "border-red-500" : ""} appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4`} id="grid-zip" type="text" value={data.postCode} required/>
						{ !data.error.postCode ? "" : alert(data.error.postCode,"red") }
					</div>
				</div>
				<div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
					<button onClick={() => formSubmit()} style={{background: '#303031'}} type="submit" className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2">Complete Registration</button>
				</div>
			</div>
		</Fragment>
	)

}

export default MembershipSignup;