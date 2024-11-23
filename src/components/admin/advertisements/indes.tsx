'use client'

import { useState } from 'react'
import { Advertisement } from '@/types/Advertisement'
import { CustomInput } from '@/components/custom-input'
import { createAdvertisement, updateAdvertisement } from '@/http/advertisement'
import { CustomButton } from '@/components/custom-button'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AdvertisementsManagement = ({
  advertisements,
}: {
  advertisements: Advertisement[] | null
}) => {
  const [editedAdvertisements, setEditedAdvertisements] = useState(
    advertisements?.map((ad) => ({
      ...ad,
      isEditing: false,
      isCreating: false,
    })) || [],
  )

  const updateAdvertisementState = (id: number, updatedProperties: object) => {
    setEditedAdvertisements((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, ...updatedProperties } : ad,
      ),
    )
  }

  const handleSave = async (id: number) => {
    const ad = editedAdvertisements.find((ad) => ad.id === id)
    ad?.isCreating ? handleCreate(ad) : handleUpdate(ad)
  }

  const handleUpdate = async (ad: Advertisement | undefined) => {
    if (ad) {
      const response = await updateAdvertisement(ad)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Anúncio atualizado com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao atualizar anúncio.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response) updateAdvertisementState(ad.id, { isEditing: false })
    }
  }

  const handleCreate = async (ad: Advertisement | undefined) => {
    if (ad) {
      const response = await createAdvertisement(ad)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Anúncio criado com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao criar anúncio.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response)
        updateAdvertisementState(ad.id, { isCreating: false, isEditing: false })
    }
  }

  const createNewAdvertisement = () => {
    const newAd = {
      id: Math.max(...editedAdvertisements.map((ad) => ad.id)) + 1,
      name: '',
      description: '',
      imageBanner: '',
      imageCard: '',
      enabled: false,
      startDate: new Date(),
      endDate: new Date(),
      urlGoTo: '',
      isEditing: true,
      isCreating: true,
    }
    setEditedAdvertisements((prevAds) => [newAd, ...prevAds])
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Anúncios</h1>
      <div className="flex flex-col w-full items-center mb-4">
        <CustomButton
          onClick={createNewAdvertisement}
          className="bg-green-500 text-white w-1/3 mb-4"
        >
          Novo Anúncio
        </CustomButton>
      </div>
      <ul className="w-full max-w-4xl">
        {editedAdvertisements.map((ad) => (
          <li
            key={ad.id}
            className="flex flex-col justify-between p-4 border-b border-gray-200 gap-4"
          >
            <div className="flex flex-col gap-2">
              {ad.isEditing ? (
                <>
                  <CustomInput
                    value={ad.name}
                    onChange={(e) =>
                      updateAdvertisementState(ad.id, { name: e.target.value })
                    }
                    className="text-lg border border-gray-300  p-2"
                    placeholder="Título"
                  />
                  <CustomInput
                    value={ad.description}
                    onChange={(e) =>
                      updateAdvertisementState(ad.id, {
                        description: e.target.value,
                      })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="Descrição"
                  />
                  <DatePicker
                    selected={new Date(ad.startDate)}
                    onChange={(date) =>
                      updateAdvertisementState(ad.id, {
                        startDate: date,
                      })
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    className=" font-medium text-xs px-[20px] py-[12px] border w-full bg-app-background h-[38px] border-gray-300 rounded-full p-2"
                    placeholderText="Data Início"
                  />
                  <DatePicker
                    selected={new Date(ad.endDate)}
                    onChange={(date) =>
                      updateAdvertisementState(ad.id, {
                        endDate: date,
                      })
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    className=" font-medium text-xs px-[20px] py-[12px] border w-full bg-app-background h-[38px] border-gray-300 rounded-full p-2"
                    placeholderText="Data Fim"
                  />
                  <CustomInput
                    value={ad.urlGoTo}
                    onChange={(e) =>
                      updateAdvertisementState(ad.id, {
                        urlGoTo: e.target.value,
                      })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="Url Go To"
                  />
                  <CustomInput
                    type="text"
                    value={ad.imageBanner}
                    onChange={(e) =>
                      updateAdvertisementState(ad.id, {
                        imageBanner: e.target.value,
                      })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="URL da Imagem Banner"
                  />
                  <CustomInput
                    type="text"
                    value={ad.imageCard}
                    onChange={(e) =>
                      updateAdvertisementState(ad.id, {
                        imageCard: e.target.value,
                      })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="URL da Imagem Card"
                  />
                </>
              ) : (
                <>
                  <p className="text-xl font-bold">{ad.name}</p>
                  <p className="text-normal italic">{ad.description}</p>
                  <p>Data Início: {new Date(ad.startDate).toISOString()}</p>
                  <p>Data Fim: {new Date(ad.endDate).toISOString()}</p>
                  <p className="break-words">Url Go To: {ad.urlGoTo}</p>
                  <Image
                    src={ad.imageBanner}
                    alt=""
                    width={2150}
                    height={750}
                    className="w-full h-auto"
                  />
                  <Image
                    src={ad.imageCard}
                    alt=""
                    width={2150}
                    height={750}
                    className="w-full h-auto"
                  />
                </>
              )}
            </div>
            <div className="flex items-center">
              <label className="mr-2">Ativo:</label>
              <input
                type="checkbox"
                disabled={!ad.isEditing}
                checked={ad.enabled}
                onChange={(e) =>
                  updateAdvertisementState(ad.id, {
                    enabled: e.target.checked,
                  })
                }
                className="form-checkbox"
              />
            </div>
            <div className="flex flex-row gap-4">
              <CustomButton
                onClick={() =>
                  ad.isEditing
                    ? handleSave(ad.id)
                    : updateAdvertisementState(ad.id, { isEditing: true })
                }
                className={`${
                  ad.isEditing ? 'bg-blue-500' : 'bg-gray-500'
                } text-white`}
              >
                {ad.isEditing ? 'Salvar' : 'Editar'}
              </CustomButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdvertisementsManagement
