class Layer
{
    constructor({typ,data}){
        this.type = typ || 'text-layer'
        this.data = data || {
            style:'',
            value:'Wpisz tekst' 
        }
    }
} 