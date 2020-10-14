const initialState = {
    currentUser: [],
    isLoggedIn: false,
    classList: [],
    navigator: 'Class Periods',
    tab: {name:'',value:0}
}
  
const Reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'isLoggedIn':
            return {
                ...state,
                isLoggedIn: action.value
            }
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.user
            }
        case 'GET_CLASS':
            console.log(action.classList)
            return {
                ...state,
                classList: action.classList
            }
        case 'SET_NAVIGATOR':
            return {
                ...state,
                navigator: action.value
            }
        case 'SET_TAB':
            return{
                ...state,
                tab: {name: action.name, value: action.value}
            }
        default:
        return state
    }
}
  
export default Reducer;