import client from "./client"

export const stringConnect = async () => {
  try {
    await client.set('name', 'MH Shohan')
    const result = await client.get('name')
    console.log('string =>', result)
  } catch (error) {
    console.log(error)
  }
}