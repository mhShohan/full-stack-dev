import {useEffect,useState} from "react";
import UsersList from "./Users.tsx";

const App = ()=>{
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async ()=>{
            setIsLoading(true)
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json()
            setData(data)

            setIsLoading(false)
        })()
    },[])

    return (
        <div className='container'>
            {isLoading && <h1>Loading</h1>}
            {!isLoading && <UsersList users={data} setUsers={setData}/>}
        </div>
    )
}

export  default  App