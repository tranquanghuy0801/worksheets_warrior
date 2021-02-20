import React, { Fragment, createContext, useReducer } from 'react';
import Layout from "../layout";
import MembershipSignup from "./MembershipSignup";

const MembershipComponent = () => {
    return (
        <Fragment>
			{/* Category, Search & Filter Section */}
			<section className="m-4 md:mx-8 md:my-6">
				<MembershipSignup />
			</section>
			{/* Product Section */}
		</Fragment>
    )
}

const Membership = (props) => {
    return (
        <Fragment>
	        <Layout children={<MembershipComponent/>} />
        </Fragment>
    )
}

export default Membership;