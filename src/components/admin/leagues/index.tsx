'use client'

import { useState } from 'react'
import { League } from '@/types/League'
import Image from 'next/image'
import { CustomInput } from '@/components/custom-input'
import { updateDatabase, updateLeague } from '@/http/league'
import { Combobox } from '@/components/combobox'
import { CustomButton } from '@/components/custom-button'
import { toast } from '@/components/ui/use-toast'
import { Spinner } from '@/components/spinner'

const LeaguesManagement = ({ leagues }: { leagues: League[] | null }) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const currentYear = new Date().getFullYear()
  const [seasonYear, setSeasonYear] = useState(currentYear)
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [editedLeagues, setEditedLeagues] = useState(
    leagues?.map((league) => ({ ...league, isEditing: false })) || [],
  )
  const uniqueCountries = Array.from(
    new Set(editedLeagues.map((league) => league.country)),
  )
    .map((country) => ({ label: country, value: country }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const updateLeagueState = (id: number, updatedProperties: object) => {
    setEditedLeagues((prevLeagues) =>
      prevLeagues.map((league) =>
        league.id === id ? { ...league, ...updatedProperties } : league,
      ),
    )
  }

  const handleSave = async (id: number) => {
    const leagueToUpdate = editedLeagues.find((league) => league.id === id)
    if (leagueToUpdate) {
      const response = await updateLeague(leagueToUpdate)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Campeonato atualizado com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao atualizar campeonato.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response) updateLeagueState(id, { isEditing: false })
    }
  }

  const filteredLeagues = editedLeagues.filter((league) => {
    const isNameMatch = league.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
    const isCountryMatch =
      selectedCountry === '' || league.country === selectedCountry
    return (isNameMatch && isCountryMatch) || league.isEditing
  })

  const handleUpdateDatabase = async (season: number) => {
    setIsLoading(true)
    const response = await updateDatabase(season)
    const toastMessage = response
      ? {
          title: 'Sucesso',
          description: 'Banco de dados atualizado com sucesso!',
        }
      : { title: 'Erro', description: 'Erro ao atualizar banco de dados.' }
    toast({
      ...toastMessage,
      variant: response ? 'default' : 'destructive',
      duration: 2000,
    })
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Campeonatos</h1>
      <div className="flex flex-row gap-4 mb-4">
        <CustomInput
          type="text"
          placeholder="Buscar por nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <Combobox
          label="Filtrar por país"
          value={selectedCountry}
          onChange={(value) => setSelectedCountry(String(value))}
          data={uniqueCountries}
          errorLabel="Não foi encontrado esse país"
          searchLabel="Filtrar por país"
        />
      </div>
      <div>
        {!isInputVisible && (
          <CustomButton
            className="bg-blue-500"
            onClick={() => setIsInputVisible(!isInputVisible)}
          >
            Atualizar banco de dados
          </CustomButton>
        )}
        {isInputVisible && (
          <div className="flex flex-row gap-4">
            <CustomInput
              type="number"
              value={seasonYear}
              onChange={(e) => setSeasonYear(Number(e.target.value))}
              className="border border-gray-300 rounded p-2"
            />
            <CustomButton
              className="bg-blue-500"
              onClick={async () => {
                await handleUpdateDatabase(seasonYear)
                setIsInputVisible(!isInputVisible)
              }}
            >
              {isLoading && <Spinner size="xs" />}
              Confirmar
            </CustomButton>
          </div>
        )}
      </div>
      <ul className="w-full max-w-4xl">
        {filteredLeagues.map((league) => (
          <li
            key={league.id}
            className="flex flex-row items-center p-4 border-b border-gray-200"
          >
            <div className="w-20">
              <Image
                src={league.image}
                alt={league.name}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col mx-4 gap-2 w-full">
              <p>País: {league.country}</p>
              {league.isEditing ? (
                <CustomInput
                  type="text"
                  value={league.name}
                  onChange={(e) =>
                    updateLeagueState(league.id, { name: e.target.value })
                  }
                  className="text-lg border border-gray-300 rounded p-2"
                />
              ) : (
                <p>Nome: {league.name}</p>
              )}
              <div className="flex items-center">
                <label className="mr-2">Ativo:</label>
                <input
                  type="checkbox"
                  disabled={!league.isEditing}
                  checked={league.enabled}
                  onChange={(e) =>
                    updateLeagueState(league.id, { enabled: e.target.checked })
                  }
                  className="form-checkbox"
                />
              </div>
            </div>
            <CustomButton
              onClick={() =>
                league.isEditing
                  ? handleSave(league.id)
                  : updateLeagueState(league.id, { isEditing: true })
              }
              className={`${
                league.isEditing ? 'bg-blue-500' : 'bg-gray-500'
              } text-white w-16 ml-auto`}
            >
              {league.isEditing ? 'Salvar' : 'Editar'}
            </CustomButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeaguesManagement
