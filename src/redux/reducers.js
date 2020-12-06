function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_BOARD":
            return Object.assign({}, state, {
                ...action.payload
            })
        case "DELETE_THREAD": 
            return Object.assign({}, {
                ...state,
                threads: state.threads.filter((a,i) => (a._id === action.payload._id))
            })
        default:
        return state
    }
}

export default reducer