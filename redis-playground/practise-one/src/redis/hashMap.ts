import client from "./client"

export const hashMapConnect = async () => {
  try {
    await client.hmset('user:1', {
      '1': JSON.stringify({ id: '1', name: 'John', age: 30 }),
    })

    const result = await client.hmget('user:1', '1')
    console.log('hashMap =>', JSON.parse(result[0]!))
  } catch (error) {
    console.log(error)
  }
}