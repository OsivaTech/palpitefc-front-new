'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PendingSubscription } from '@/types/api/responses/PendingSubscriptionResponse'
import { useState, useEffect } from 'react'
import { differenceInSeconds, intervalToDuration } from 'date-fns'
import { useRouter } from 'next/navigation'

const PendingPayment = ({
  pendingPayment,
}: {
  pendingPayment: PendingSubscription
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const calculateCountdown = (expirationDate: Date) => {
    const now = new Date()
    return differenceInSeconds(expirationDate, now)
  }
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(
      new Date(pendingPayment.paymentDetails.pix.expirationDate),
    ),
  )

  const duration = intervalToDuration({ start: 0, end: countdown * 1000 })
  const formatted = `${duration.minutes && duration.minutes < 10 ? 0 : ''}${duration.minutes || 0}:${duration.seconds && duration.seconds < 10 ? 0 : ''}${duration.seconds || 0}`

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        calculateCountdown(
          new Date(pendingPayment.paymentDetails.pix.expirationDate),
        ),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [pendingPayment.paymentDetails.pix.expirationDate])

  useEffect(() => {
    if (duration.minutes === undefined && duration.seconds === undefined) {
      router.refresh()
    }
  }, [duration, router])

  return (
    <div className="container">
      <h1 className="text-xl text-center p-10">Pagamento pendente</h1>

      <Separator />
      <div className="flex flex-col gap-5 justify-center items-center h-full flex-1 pt-10">
        <div className="flex items-center justify-evenly w-full">
          <div className="flex items-center">
            <Image
              src={'/assets/logoPix.png'}
              width={100}
              height={100}
              alt="pix"
            />
          </div>
          <span className="text-3xl"> R$ 9,99 </span>
        </div>
        <Separator />
        <div className="rounded-lg bg-white h-[210px] w-[210px] flex items-center justify-center">
          <Image
            src={pendingPayment.paymentDetails.pix.qrCode.imagePng || ''}
            width={200}
            height={200}
            alt="qrCode"
          />
        </div>
        <small className="font-semibold text-lg">{formatted}</small>
        <code className="bg-white/20 text-xs text-ellipsis p-3 w-80 break-words rounded-lg">
          {pendingPayment.paymentDetails.pix.copyAndPaste}
        </code>
        <Separator />
        {/* <ol className="list-decimal text-sm w-72 flex flex-col gap-1">
          <li>
            Abra o app do banco, vá em "Pix" e escolha "Ler QR Code" ou "Copia e
            Cola".
          </li>
          <li>
            Escaneie o código ou cole o código recebido, verifique os dados e
            confirme o pagamento.
          </li>
          <li>Após a confirmação do pagamento você se tornará VIP</li>
        </ol> */}

        <div className="flex justify-between items-center gap-4">
          <Button
            variant="default"
            className="w-28"
            onClick={() => {
              setIsCopied(true)
              navigator.clipboard.writeText(
                pendingPayment.paymentDetails.pix.copyAndPaste || '',
              )
            }}
          >
            {isCopied ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PendingPayment
