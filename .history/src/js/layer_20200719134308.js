class Layer
{
    constructor({typ,data}){
        this.typ = typ || 'text-layer'
        this.data = data || {
            style:{
                'font-size':'15px',
                'font-family':'arial'
            },
            value:'Wpisz tekst' 
        }
        return this
    }
} 