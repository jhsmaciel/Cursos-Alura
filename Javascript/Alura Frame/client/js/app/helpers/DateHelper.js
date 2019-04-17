class DateHelper {

    dateToText(data){
        return  `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}` 
        
        // data.getDate() +'/'+(data.getMonth()+1)+'/'+data.getFullYear()
    }

    textToDate(string){
        if(!/^\d{4}-\d{2}-\d{2}$/.test(string))
            throw new Error('Deve estar no formato aaaa-mm-dd')
        return new Date(...string.split('-').map((item,index) =>  item - index % 2 ))
    }
}