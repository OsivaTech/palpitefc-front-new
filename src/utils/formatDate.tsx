import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: string, pattern: string): string {
  return format(parseISO(date), pattern, { locale: ptBR })
}
