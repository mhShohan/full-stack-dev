import client from "./client"

export const setConnect = async () => {
  try {
    await client.sadd('ip', '172.0.0.1:4000')
    await client.sadd('ip', '172.0.0.1:5000')
    await client.sadd('ip', '172.0.0.1:6000')

    // const result = await client.lrange('skills', 0, -1)
    console.log('list =>')
  } catch (error) {
    console.log(error)
  }
}