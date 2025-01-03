import { useEffect, useState } from "react";

export default function Contact(){
    const [postList, setPostList] = useState([]);
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>res.json())
        .then((res)=>{
            setPostList(res);
        });
    },[]);

    return (
        <div className="Posts">
            <table>
                <tr>
                    <th>Id</th>
                    <th>User Id</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                {postList.map((el, index)=>{
                    return(
                        <tr>
                            <td>{el.id}</td>
                            <td>{el.userId}</td>
                            <td>{el.title}</td>
                            <td>{el.body}</td>
                        </tr>
                    );
                })}

            </table>
        </div>
    );
}