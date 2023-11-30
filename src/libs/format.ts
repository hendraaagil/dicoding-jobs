import { format } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Format date to dd MMMM yyyy
 *
 * Example output: `01 Januari 2023`
 */
export const formatDate = (date: string) =>
  format(new Date(date), 'dd MMMM yyyy', { locale: id })

/**
 * Format number to currency
 *
 * Example output: `Rp 1.000.000`
 */
export const formatCurrency = (number: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number)
