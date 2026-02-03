import { Accessor, createContext, useContext } from 'solid-js';





export const CNTXEmployeesManager = createContext<{
    getSelectedEmployeeId: Accessor<string>,
    setSelectedEmployeeId: (employee_id: string) => void
}>({
       setSelectedEmployeeId: (employee_id: string) => {
       },
       getSelectedEmployeeId: () => {
           return ''
       }
   })


export function useContextEmployeesManager() {
    const context = useContext(CNTXEmployeesManager)
    
    if (!context) {
        throw new Error('Employees manager context provider not found.')
    }
    
    return context
}