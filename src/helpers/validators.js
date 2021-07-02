export const maxSize = (file) => file.size < 4000
export const image = (file) => ['png', 'jpg', 'jpeg'].includes(file.type.split('/')[1])
