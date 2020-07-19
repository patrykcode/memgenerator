class Layer
{
    constructor({typ,data}){
        this.typ = typ || 'text-layer'
        this.data = data || {
            style:'',
            value:'Wpisz tekst' 
        }
        return this
    }
} 