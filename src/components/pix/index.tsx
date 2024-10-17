/* eslint-disable react/no-unescaped-entities */
import { makeSubscription } from '@/http/subscription'
import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { usePageModal } from '@/context/usePageModal'
import { MakeSubscriptionResponse } from '@/types/api/responses/SubscriptionReponse'
import { SubscriptionRequest } from '@/types/api/resquests/SubscriptionRequest'
import { useRouter } from 'next/navigation'

export const Pix = () => {
  const [pix, setPix] = useState<MakeSubscriptionResponse>()
  const { closePageModal } = usePageModal()
  const [isPending, startTransition] = useTransition()
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const loadPix = () => {
      startTransition(async () => {
        const body: SubscriptionRequest = {
          paymentMethod: 'pix',
        }
        const resultSubscription = await makeSubscription(body)
        setPix(resultSubscription)
      })
    }
    loadPix()
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return (
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
        {!isPending ? (
          <Image
            src={pix?.pixDetails.qrCode.imagePng || ''}
            width={200}
            height={200}
            alt="qrCode"
          />
        ) : (
          <Loader2 className="mr-2 h-10 w-10 animate-spin stroke-app-secondary" />
        )}
      </div>
      <code className="bg-white/20 text-xs text-ellipsis p-3 w-80 break-words rounded-lg">
        {pix?.pixDetails.copyAndPaste}
      </code>
      <Separator />
      <ol className="list-decimal text-sm w-72 flex flex-col gap-1">
        <li>
          Abra o app do banco, vá em "Pix" e escolha "Ler QR Code" ou "Copia e
          Cola".
        </li>
        <li>
          Escaneie o código ou cole o código recebido, verifique os dados e
          confirme o pagamento.
        </li>
        <li>Após a confirmação do pagamento você se tornará VIP</li>
      </ol>

      <div className="flex justify-between items-center gap-4">
        <Button
          className="w-28"
          variant="outline"
          onClick={() => {
            router.refresh()
            closePageModal()
          }}
        >
          Fechar
        </Button>

        <Button
          variant="default"
          className="w-28"
          onClick={() => {
            setIsCopied(true)
            navigator.clipboard.writeText(pix?.pixDetails.copyAndPaste || '')
          }}
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
    </div>
  )
}
