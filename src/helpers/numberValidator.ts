export const numberValidator = (number: string) => {
   const isValidFormat = number.match(/79[0-9]{9}/g)

   if(number.length < 11){
      return 'Слишком короткий номер'
   }
   else if(number.length > 11){
      return 'Слишком длинный номер'
   }
   else if(!isValidFormat){
      return 'Неверный формат номера'
   }
   else {
      return true
   }
}