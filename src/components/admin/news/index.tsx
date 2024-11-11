'use client'

import { useState } from 'react'
import { News } from '@/types/News'
import { CustomInput } from '@/components/custom-input'
import { createNews, deleteNews, updateNews } from '@/http/news'
import { CustomButton } from '@/components/custom-button'
import { toast } from '@/components/ui/use-toast'
import CustomTextArea from '@/components/custom-textarea'
import Image from 'next/image'

const NewsManagement = ({ news }: { news: News[] | null }) => {
  const [editedNews, setEditedNews] = useState(
    news?.map((newsItem) => ({
      ...newsItem,
      isEditing: false,
      isCreating: false,
    })) || [],
  )

  const createNewNews = () => {
    const newNews = {
      id: Math.max(...editedNews.map((newsItem) => newsItem.id)) + 1,
      title: '',
      subtitle: '',
      content: '',
      thumbnail: '',
      userId: 0,
      author: { id: 0, name: '', team: '' },
      createdAt: new Date().toISOString(),
      isEditing: true,
      isCreating: true,
    }
    setEditedNews((prevNews) => [newNews, ...prevNews])
  }

  const updateNewsState = (id: number, updatedProperties: object) => {
    setEditedNews((prevNews) =>
      prevNews.map((newsItem) =>
        newsItem.id === id ? { ...newsItem, ...updatedProperties } : newsItem,
      ),
    )
  }

  const handleSave = async (id: number) => {
    const newsItem = editedNews.find((newsItem) => newsItem.id === id)
    newsItem?.isCreating ? handleCreate(newsItem) : handleUpdate(newsItem)
  }

  const handleUpdate = async (newsItem: News | undefined) => {
    if (newsItem) {
      const response = await updateNews(newsItem)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Notícia atualizada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao atualizar notícia.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response) updateNewsState(newsItem.id, { isEditing: false })
    }
  }

  const handleCreate = async (newsItem: News | undefined) => {
    if (newsItem) {
      const response = await createNews(newsItem)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Notícia criada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao criar notícia.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response)
        updateNewsState(newsItem.id, { isCreating: false, isEditing: false })
    }
  }

  const handleDelete = async (id: number) => {
    const newsToDelete = editedNews.find((newsItem) => newsItem.id === id)
    if (newsToDelete) {
      const response = await deleteNews(newsToDelete.id)
      const toastMessage = response
        ? {
            title: 'Sucesso',
            description: 'Notícia deletada com sucesso!',
          }
        : { title: 'Erro', description: 'Erro ao deletar notícia.' }
      toast({
        ...toastMessage,
        variant: response ? 'default' : 'destructive',
        duration: 2000,
      })

      if (response)
        setEditedNews((prevNews) =>
          prevNews.filter((newsItem) => newsItem.id !== id),
        )
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Notícias</h1>
      <div className="flex flex-col w-full items-center">
        <CustomButton
          onClick={createNewNews}
          className="bg-green-500 text-white w-1/3"
        >
          Nova Notícia
        </CustomButton>
      </div>
      <ul className="w-full max-w-4xl">
        {editedNews.map((newsItem) => (
          <li
            key={newsItem.id}
            className="flex flex-col justify-between p-4 border-b border-gray-200 gap-4"
          >
            <div className="flex flex-col gap-2">
              {newsItem.isEditing ? (
                <>
                  <CustomInput
                    type="text"
                    value={newsItem.thumbnail}
                    onChange={(e) =>
                      updateNewsState(newsItem.id, {
                        thumbnail: e.target.value,
                      })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="URL da Imagem"
                  />
                  <CustomTextArea
                    value={newsItem.title}
                    onChange={(e) =>
                      updateNewsState(newsItem.id, { title: e.target.value })
                    }
                    className="text-lg border border-gray-300  p-2"
                    placeholder="Título"
                  />
                  <CustomTextArea
                    value={newsItem.subtitle}
                    onChange={(e) =>
                      updateNewsState(newsItem.id, { subtitle: e.target.value })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="Subtítulo"
                  />
                  <CustomTextArea
                    value={newsItem.content}
                    onChange={(e) =>
                      updateNewsState(newsItem.id, { content: e.target.value })
                    }
                    className="text-lg border border-gray-300 rounded p-2"
                    placeholder="Conteúdo"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={newsItem.thumbnail}
                    alt=""
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                  <p className="text-xl font-bold">{newsItem.title}</p>
                  <p className="text-normal italic">{newsItem.subtitle}</p>
                  <p className="text-sm">{newsItem.content}</p>
                </>
              )}
            </div>
            <div className="flex flex-row gap-4">
              {!newsItem.isCreating && (
                <CustomButton
                  onClick={() => handleDelete(newsItem.id)}
                  className="bg-red-800 text-white"
                >
                  Excluir
                </CustomButton>
              )}
              <CustomButton
                onClick={() =>
                  newsItem.isEditing
                    ? handleSave(newsItem.id)
                    : updateNewsState(newsItem.id, { isEditing: true })
                }
                className={`${
                  newsItem.isEditing ? 'bg-blue-500' : 'bg-gray-500'
                } text-white`}
              >
                {newsItem.isEditing ? 'Salvar' : 'Editar'}
              </CustomButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewsManagement
