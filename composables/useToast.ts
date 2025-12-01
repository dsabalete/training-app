export interface Toast {
  id?: number
  title: string
  color?: string
  timeout?: number
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const add = (toast: Toast) => {
    const id = Date.now()
    toasts.value.push({ id, ...toast })
    setTimeout(() => {
      remove(id)
    }, toast.timeout || 3000)
  }

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    add,
    remove,
  }
}
