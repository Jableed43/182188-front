import { useState } from "react"

function Roto() {
    const [contadorLikes, setContadorLikes] = useState(0)

    const darLike = () => {
        setContadorLikes(likes => likes + 1)
    }

    // let contadorLikes = 0

    // const darLike = () => {
    //     contadorLikes = contadorLikes + 1
    //     console.log(contadorLikes)
    // }

    
  return (
    <button onClick={darLike} > likes: {contadorLikes} </button>
  )
}

export default Roto