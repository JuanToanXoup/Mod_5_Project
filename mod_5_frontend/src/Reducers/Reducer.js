const initialState = {
    currentUser: [],
    userType: [],
    selectedStudent: [],
    isLoggedIn: false,
    periodList: [],
    classList: [],
    navigator: 'Class Periods',
    tab: {name:'',value:0},
    currentPeriod: 0
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
        case 'SET_TYPE':
            return {
                ...state,
                userType: action.userType
            }
        case'SET_STUDENT':
            return {
                ...state,
                selectedStudent: action.student,
                navigator: 'Student Page'
            }
        case 'GET_PERIODS':
            return {
                ...state,
                periodList: action.periodList
            }
        case 'SET_PERIOD':
            return {
                ...state,
                currentPeriod: action.period
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