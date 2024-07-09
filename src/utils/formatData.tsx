import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatarData = (dataISO: string) => {
  const data = parseISO(dataISO)

  return format(data, 'dd/MM EEEE HH:mm', { locale: ptBR })
}

export function formatarDataDDMMYYY(date: string): string {
  const localDate = new Date(date)
  localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset())
  return format(localDate, 'dd/MM/yyyy')
}
