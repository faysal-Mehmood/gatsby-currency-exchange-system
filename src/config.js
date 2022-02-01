export const API_URL = "http://122.155.197.101:8080/DevWebApi.Winplus"
export const   headers = {
    'Content-Type': 'application/json',
    'Language': (typeof window !== 'undefined' && window.location.href.includes('/th')) ? 'th-TH' : 'en-Us',
    'tokenId' : typeof window !== 'undefined' && localStorage.getItem("smartway_auth"),
    }


    export const   headers1 = ()=>({
        'Content-Type': 'application/json',
        'Language': (typeof window !== 'undefined' && window.location.href.includes('/th')) ? 'th-TH' : 'en-Us',
        'tokenId' : typeof window !== 'undefined' && localStorage.getItem("smartway_auth"),
        })
    

// export const token = "9d7756c1-6e07-4bd4-bdea-5e05b284f90d"