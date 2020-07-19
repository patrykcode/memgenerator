class Layer
{
    constructor({typ,data}){
        this.typ = typ || 'text-layer'
        this.data = data || {
            style:{
                'font-size':'30px',
                'font-family':'arial',
                'text-shadow':'1px  1px 2px black,1px -1px 2px black,-1px  1px 2px black,-1px -1px 2px black',
                'color':'red',
                'border':'1px solid red',
                'width':'auto',
                'float':'left',
                'padding':'5px',
                top:5,
                left:5
            },
            value:'Wpisz tekst' 
        }
        return this
    }
} 