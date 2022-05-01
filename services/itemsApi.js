const BASE_API_URL = 'http://localhost:3001/items'

export async function searchItems(search) {
  try {
    const response = await fetch(`${BASE_API_URL}?search=${search}`)
    return response.json()
  } catch (err) {
    console.log('something went wrong')
  }
}

export async function getItemById(id) {
  try {
    const response = await fetch(`${BASE_API_URL}/${id}`)
    return response.json()
  } catch (err) {
    console.log('something went wrong')
  }
}
