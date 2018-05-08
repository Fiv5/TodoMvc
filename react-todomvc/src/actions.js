export const ADD_TODO = 'ADD_TODO'

export const DEL_TODO = 'DEL_TODO'

export const TOGGLE_ALL = 'TOGGLE_ALL'

export const TOGGLE_TODO = 'TOGGLE'

export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const EDIT_TODO = 'EDIT_TODO'

export const SHOW_ALL = 'ALL'

export const SHOW_ACTIVE = 'ACTIVE'

export const SHOW_COMPLETED = 'COMPLETED'

export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

export const addTodo = payload => ({ type: ADD_TODO, payload })

export const delTodo = payload => ({ type: DEL_TODO, payload })

export const toggleFilter = payload => ({ type: TOGGLE_FILTER, payload })
