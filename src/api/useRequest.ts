import { Posts } from "../interfaces"

const useRequest = () => {
    
    async function handlerRequest(postToShow:number, skip:number):Promise<Posts> {
        const url:string = `https://dummyjson.com/posts?limit=${postToShow}&skip=${skip}`
        try {
            const response = await fetch(url)
            return await response.json()
        } catch (error) {
            throw new Error('Error en la solicitud')
        }
    }

    return {handlerRequest}
}

export default useRequest