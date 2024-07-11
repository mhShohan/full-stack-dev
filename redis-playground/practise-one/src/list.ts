import client from "./client"

export const listConnect = async () => {
  try {
    // await client.lpush('skills', 'TypeScript')
    // await client.lpush('skills', 'Node.js')
    // await client.lpush('skills', 'React')
    // await client.rpop('skills')

    const result = await client.lrange('skills', 0, -1)
    console.log('list =>', result)
  } catch (error) {
    console.log(error)
  }
}