 const mockReuniones = [
    {
        id: '1',
        nombre: 'reunion 1',
        dia: 'sabado',
        fecha: '2021/05/29',
        hora: '21',
        cantidadPersonas: 50
    },
    {
        id: '2',
        nombre: 'reunion 2',
        dia: 'sabado',
        fecha: '2021/05/29',
        hora: '21',
        cantidadPersonas: 50
    },
    {
        id: '3',
        nombre: 'reunion 3',
        dia: 'sabado',
        fecha: '2021/05/29',
        hora: '21',
        cantidadPersonas: 50
    },
    {
        id: '4',
        nombre: 'reunion 4',
        dia: 'sabado',
        fecha: '2021/05/29',
        hora: '21',
        cantidadPersonas: 50
    }
]

export const promesaReuniones = new Promise((res)=>{
    setTimeout(()=>{
        res(mockReuniones) 
    }, 2000)
})