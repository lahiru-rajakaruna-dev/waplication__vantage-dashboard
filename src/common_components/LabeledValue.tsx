export default function LabeledValue(props: {
    label: string;
    value: number | string
}) {
    return <div class={ 'w-full h-fit flex flex-col items-start justify-start gap-1' }>
        <div class={ 'font-semibold text-sm text-v-text-body' }>{ props.label }</div>
        <pre class={ 'font-bold text-v-text-main' }>{ props.value }</pre>
    </div>
}
