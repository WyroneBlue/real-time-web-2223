export const useToast = (toast = { msg: "", type: '', duration: 0 }) => useState('toast', () => toast)

export const useSetToast = ({ msg, type = 'success', duration = 3000 }) => {
    const toast = useToast()
    toast.value = { msg, type, duration }
    return toast
}

export const clearToast = () => {
    const toast = useToast()
    useSetToast({ msg: '' })
    return toast
}
