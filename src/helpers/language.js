const  translate = (en,thi)=>{
 if(typeof window !== 'undefined') {
    if(window.location.href.includes('/th')){
       return thi
    }else {
        return en
    }
 }
}

export default translate
