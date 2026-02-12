import { TextField }  from '@kobalte/core/text-field';
import { JSX }        from 'solid-js';
import { v4 as uuid } from 'uuid'



export default function TextInput(props: {
    onChange: (value: string) => void
    placeholder?: string
    value: string,
    label?: string,
    dataDataValidationFunction?: (value: string) => 'valid' | 'invalid'
    errorMessage?: string
    inputConfig: Pick<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'>
    datalist?: string[]
}) {
    const id = uuid()
    
    return (<TextField
            class={ 'flex flex-col items-stretch justify-start gap-1' }
            onChange={ (value) => {
                props.onChange(value)
            } }
    >
        { props.label
          ? <pre class={ 'text-sm text-v-text-body' }>{ props.label }</pre>
          : <></> }
        <TextField.Input
                type={ props.inputConfig.type }
                class={ 'w-full h-fit px-4 py-2 border-2 border-teal-400/60 rounded-md bg-teal-200/30 text-sm font-semibold outline-0 backdrop-blur-xs shadow-inner' }
                placeholder={ props.placeholder }
                value={ props.value }
                list={ `input-data-list-${ id }` }
        
        />
        <TextField.ErrorMessage>{ props.errorMessage ?? 'Invalid data...' }</TextField.ErrorMessage>
        <datalist id={ `input-data-list-${ id }` }>
            { props.datalist?.map((value) => {
                return <option value={ value }/>
            }) }
        </datalist>
    </TextField>)
}