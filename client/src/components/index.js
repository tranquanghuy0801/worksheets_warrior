import React from 'react';
import { Home, ProductByCategoryDescriptor, Membership, WishList, ProtectedRoute, AdminProtectedRoute, CartProtectedRoute, PageNotFound, ProductDetails, CheckoutPage } from "./shop";
import { DashboardAdmin, Categories, Products } from "./admin";
import { UserProfile, SettingUser } from './shop/dashboardUser';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

/* Routing All page will be here */
const Routes = (props) => {
    return (
        <Router>
            <Switch>

                {/* Shop & Public Routes */}
                <Route exact path="/" component={Home} />
                <Route exact path="/membership" component={Membership} />
                <Route exact path="/wish-list" component={WishList} />
                <Route exact path="/products/:id" component={ProductDetails} />
                <Route exact path="/products/category/:catId/:dFirstId" component={ProductByCategoryDescriptor}/>
                <CartProtectedRoute exact={true} path="/checkout" component={CheckoutPage} />
                {/* Shop & Public Routes */}


                {/* Admin Routes */}
                <AdminProtectedRoute exact={true} path="/admin/dashboard" component={DashboardAdmin} />
                <AdminProtectedRoute exact={true} path="/admin/dashboard/categories" component={Categories} />
                <AdminProtectedRoute exact={true} path="/admin/dashboard/products" component={Products} />
                {/* Admin Routes */}
                

                {/* User Dashboard */}
                <ProtectedRoute exact={true} path="/user/profile" component={UserProfile} />
                <ProtectedRoute exact={true} path="/user/setting" component={SettingUser} />
                {/* User Dashboard */}


                {/* 404 Page */}
                <Route component={PageNotFound} />

           </Switch>
        </Router>
    )
}

export default Routes;