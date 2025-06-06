import { Chat } from '@shared/types/db'
import { fetcher } from '@shared/utils/http'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const updateChat = async (payload: Partial<Chat>) => {
  await fetcher<string>('/api/chat', {
    method: 'PUT',
    body: payload,
    responseType: 'text'
  })

  mutate('/api/history')
  toast.success(`Succeed to update chat ${payload.id}.`)
}

export const deleteChat = async (chat: Chat, currentId?: string) => {
  await fetcher<string>(`/api/chat/${chat.id}`, {
    method: 'DELETE',
    responseType: 'text'
  })

  mutate('/api/history')
  if (chat.id === currentId) {
    window.location.hash = '#/'
  }

  toast.success(`Succeed to delete ${chat.title}.`)
}
