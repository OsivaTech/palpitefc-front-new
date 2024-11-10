'use client'

import { useState } from 'react'
import { Poll } from '@/types/Poll'
import { CustomInput } from '@/components/custom-input'
import { createPoll, deletePoll, updatePoll } from '@/http/poll'
import { CustomButton } from '@/components/custom-button'
import { toast } from '@/components/ui/use-toast'

const PollsManagement = ({ polls }: { polls: Poll[] | undefined }) => {
  const [editedPolls, setEditedPolls] = useState(
    polls?.map((poll) => ({ ...poll, isEditing: false, isCreating: false })) ||
      [],
  )

  const createNewPoll = () => {
    const newPoll = {
      id: Math.max(...editedPolls.map((poll) => poll.id)) + 1,
      title: '',
      options: [],
      isEditing: true,
      isCreating: true,
    }
    setEditedPolls((prevPolls) => [newPoll, ...prevPolls])
  }

  const addOptionToPoll = (id: number) => {
    setEditedPolls((prevPolls) =>
      prevPolls.map((poll) =>
        poll.id === id
          ? {
              ...poll,
              options: [
                ...poll.options,
                {
                  id:
                    Math.max(...poll.options.map((option) => option.id), 0) + 1,
                  title: '',
                  count: 0,
                  pollId: id,
                },
              ],
            }
          : poll,
      ),
    )
  }

  const updatePollState = (id: number, updatedProperties: object) => {
    setEditedPolls((prevPolls) =>
      prevPolls.map((poll) =>
        poll.id === id ? { ...poll, ...updatedProperties } : poll,
      ),
    )
  }

  const handleSave = async (id: number) => {
    const poll = editedPolls.find((poll) => poll.id === id)
    poll?.isCreating ? handleCreate(poll) : handleUpdate(poll)
  }

  const handleUpdate = async (poll: Poll | undefined) => {
    if (poll) {
      const response = await updatePoll(poll)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Enquete atualizada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao atualizar enquete.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response) updatePollState(poll.id, { isEditing: false })
    }
  }

  const handleCreate = async (poll: Poll | undefined) => {
    if (poll) {
      const response = await createPoll(poll)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Enquete criada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao criar enquete.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response)
        updatePollState(poll.id, { isCreating: false, isEditing: false })
    }
  }

  const handleDelete = async (id: number) => {
    const pollToDelete = editedPolls.find((poll) => poll.id === id)
    if (pollToDelete) {
      const response = await deletePoll(pollToDelete.id)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Enquete deletada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao deletar enquete.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response)
        setEditedPolls((prevPolls) =>
          prevPolls.filter((poll) => poll.id !== id),
        )
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Enquetes</h1>
      <ul className="w-full max-w-4xl">
        {editedPolls.map((poll) => (
          <li
            key={poll.id}
            className="flex flex-row justify-between p-4 border-b border-gray-200"
          >
            <div className="flex flex-col gap-2 w-full px-4">
              <div className="flex flex-row items-center gap-2">
                <p>Título:</p>
                {poll.isEditing ? (
                  <CustomInput
                    type="text"
                    value={poll.title}
                    onChange={(e) =>
                      updatePollState(poll.id, { title: e.target.value })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                  />
                ) : (
                  <p>{poll.title}</p>
                )}
              </div>
              {poll.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-2">
                  <p className="text-nowrap">
                    Opção {String.fromCharCode(65 + index)}:
                  </p>
                  {poll.isEditing ? (
                    <CustomInput
                      type="text"
                      value={option.title}
                      onChange={(e) =>
                        updatePollState(poll.id, {
                          options: poll.options.map((opt) =>
                            opt.id === option.id
                              ? { ...opt, title: e.target.value }
                              : opt,
                          ),
                        })
                      }
                      className="text-lg border border-gray-300 rounded p-2"
                    />
                  ) : (
                    <p>{option.title}</p>
                  )}
                </div>
              ))}
              {poll.isCreating && (
                <CustomButton
                  onClick={() => addOptionToPoll(poll.id)}
                  className="bg-blue-500 text-white w-32 self-center"
                >
                  Adicionar Opção
                </CustomButton>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <CustomButton
                onClick={() =>
                  poll.isEditing
                    ? handleSave(poll.id)
                    : updatePollState(poll.id, { isEditing: true })
                }
                className={`${
                  poll.isEditing ? 'bg-blue-500' : 'bg-gray-500'
                } text-white`}
              >
                {poll.isEditing ? 'Salvar' : 'Editar'}
              </CustomButton>
              {!poll.isCreating && (
                <CustomButton
                  onClick={() => handleDelete(poll.id)}
                  className="bg-red-800 text-white"
                >
                  Excluir
                </CustomButton>
              )}
            </div>
          </li>
        ))}
        <div className="flex flex-col w-full items-center py-4">
          <CustomButton
            onClick={createNewPoll}
            className="bg-green-500 text-white w-1/3"
          >
            Nova Enquete
          </CustomButton>
        </div>
      </ul>
    </div>
  )
}

export default PollsManagement
