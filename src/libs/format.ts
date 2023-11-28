import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date: string) =>
  format(new Date(date), 'dd MMMM yyyy', { locale: id })
