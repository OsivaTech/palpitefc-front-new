'use client'

import { useState } from 'react'
import { Team } from '@/types/Team'
import Image from 'next/image'
import { CustomInput } from '@/components/custom-input'
import { updateTeam } from '@/http/team'
import { CustomButton } from '@/components/custom-button'
import { toast } from '@/components/ui/use-toast'

const TeamsManagement = ({ teams }: { teams: Team[] | null }) => {
  const [searchText, setSearchText] = useState('')

  const [editedTeams, setEditedTeams] = useState(
    teams?.map((team) => ({ ...team, isEditing: false })) || [],
  )

  const updateTeamState = (id: number, updatedProperties: object) => {
    setEditedTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === id ? { ...team, ...updatedProperties } : team,
      ),
    )
  }

  const handleSave = async (id: number) => {
    const teamToUpdate = editedTeams.find((team) => team.id === id)
    if (teamToUpdate) {
      const response = await updateTeam(teamToUpdate)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Time atualizado com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao atualizar time.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response) updateTeamState(id, { isEditing: false })
    }
  }

  const filteredTeams = editedTeams.filter((team) => {
    const isNameMatch = team.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
    return isNameMatch || team.isEditing
  })

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Times</h1>
      <div className="flex flex-row gap-4 mb-4">
        <CustomInput
          type="text"
          placeholder="Buscar por nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <ul className="w-full max-w-4xl">
        {filteredTeams.map((team) => (
          <li
            key={team.id}
            className="flex flex-row items-center p-4 border-b border-gray-200"
          >
            <div className="w-14">
              <Image
                src={team.image}
                alt={team.name}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col mx-4 gap-2 w-full">
              {team.isEditing ? (
                <CustomInput
                  type="text"
                  value={team.name}
                  onChange={(e) =>
                    updateTeamState(team.id, { name: e.target.value })
                  }
                  className="text-lg border border-gray-300 rounded p-2"
                />
              ) : (
                <p>{team.name}</p>
              )}
            </div>
            <CustomButton
              onClick={() =>
                team.isEditing
                  ? handleSave(team.id)
                  : updateTeamState(team.id, { isEditing: true })
              }
              className={`${
                team.isEditing ? 'bg-blue-500' : 'bg-gray-500'
              } text-white w-16 ml-auto`}
            >
              {team.isEditing ? 'Salvar' : 'Editar'}
            </CustomButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamsManagement
