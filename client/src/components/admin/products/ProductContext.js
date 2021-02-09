export const productState = {
    products: null,
    addProductModal: false,
    editProductModal: {
        modal: false,
        pId: "",
        pName: "",
        pStatus: "",
        pCategory: "",
        pGrade: 1,
        pLevel: "",
        pFile: "",
        pImages: [],
        pDescriptor1: "",
        pDescriptor2: "",
        pDescriptor3: "",
        pKeywords: [],
    },
    descriptor: false,
}

export const productReducer = (state, action) => {
    switch (action.type) {
        /* Get all product */
        case 'fetchProductsAndChangeState':
            return {
                ...state,
                products: action.payload
            }
            /* Create a product */
        case 'addProductModal':
            return {
                ...state,
                addProductModal: action.payload
            }
            /* Edit a product */
        case 'editProductModalOpen':
            return {
                ...state,
                editProductModal: {
                    modal: true,
                    pId: action.product.pId,
                    pName: action.product.pName,
                    pStatus: action.product.pStatus,
                    pCategory: action.product.pCategory,
                    pGrade: action.product.pGrade,
                    pLevel: action.product.pLevel,
                    pFile: action.product.pFile,
                    pImages: action.product.pImages,
                    pDescriptor1: action.product.pDescriptor1,
                    pDescriptor2: action.product.pDescriptor2,
                    pDescriptor3: action.product.pDescriptor3,
                    pKeywords: action.product.pKeywords,
                }
            }
        case 'editProductModalClose':
            return {
                ...state,
                editProductModal: {
                    modal: false,
                    pId: "",
                    pName: "",
                    pGrade: 1,
                    pLevel: "",
                    pImages: null,
                    pStatus: "",
                    pCategory: "",
                    pFile: "",
                    pDescriptor1: "",
                    pDescriptor2: "",
                    pDescriptor3: "",

                }
            }
        case 'descriptorHandler':
            return {
                ...state,
                descriptor: action.payload,
            }
        default:
            return state
    }
}