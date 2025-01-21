import { useEffect, useState } from "react"

export default function Home(){
    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((res)=>{
            setUserList(res);
        });
    },[]);

    return (
        <div>
            {userList.map((el,index)=>{
                return (
                    <div key={index}>
                        {el.id} - {el.name} - {el.username} - {index}
                    </div>
                );
            })}
        </div>
    )
}