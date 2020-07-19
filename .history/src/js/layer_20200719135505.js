class Layer
{
    constructor({typ,data}){
        this.typ = typ || 'text-layer'
        this.data = data || {
            style:{
                'font-size':'30px',
                'font-family':'arial',
                'text-shadow':'1px  1px 2px black,1px -1px 2px black,-1px  1px 2px black,-1px -1px 2px black',
                'color':'red'
            },
            value:'Wpisz tekst' 
        }
        return this
    }
} 