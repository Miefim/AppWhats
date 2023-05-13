type test = () => [(arg: string) => any, (key: string, obj: object) => void, (arg: string) => void]

export const useLocalStorage: test = () => {
   const get = (key: string) => {

      const data = localStorage.getItem(key)
      
      if(data){
         return JSON.parse(data)
      }
      else{
         return null
      }

   } 

   const set = (key: string, obj: object) => {

      const jsonObj = JSON.stringify(obj)
      localStorage.setItem(key, jsonObj)

   }

   const del = (key: string) => {

      localStorage.removeItem(key)

   }

   return [get, set, del]
}