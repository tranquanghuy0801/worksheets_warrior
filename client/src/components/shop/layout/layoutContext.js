export const layoutState = {
    navberHamburger: false,
    loginSignupModal: false,
    loginSignupError:false,
    singleProductDetail:null,
    loading:false,
    showBanner: false,
    mountBanner: true,
}

export const layoutReducer = (state, action) => {
    switch (action.type) {
        case 'hamburgerToggle':
            return {
                ...state,
                navberHamburger: action.payload
            }
        case 'loginSignupModalToggle':
            return {
                ...state,
                loginSignupModal: action.payload
            }
        case 'singleProductDetail':
            return {
                ...state,
                singleProductDetail: action.payload
            }
        case 'loginSignupError':
            return {
                ...state,
                loginSignupError: action.payload
            }
        case 'loading':
            return {
                ...state,
                loading: action.payload
            }
        case 'showBanner':
            return {
                ...state,
                showBanner: action.payload
            }
        case 'mountBanner':
            return {
                ...state,
                mountBanner: action.payload
            }
        default:
            return state
    }
}