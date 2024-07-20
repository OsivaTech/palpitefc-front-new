import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: string, pattern: string): string {
  const localDate = new Date(parseISO(date))

  localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset())
  return format(localDate, pattern, { locale: ptBR })
}
