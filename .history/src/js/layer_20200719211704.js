class Layer
{
    constructor({typ,data}){
        this.typ = typ || 'text-layer'
        this.size = data && data.size || 30

        var types = {
            'text-layer' : {
                'font-size': this.size + 'px',
                'font-family':'arial',
                'text-shadow':'1px  1px 2px black,1px -1px 2px black,-1px  1px 2px black,-1px -1px 2px black',
                'color':'red',
                'border':'1px solid red',
                'width':'auto',
                'float':'left',
                // 'padding':'5px',
                'position':'absolute',
                'top':5,
                'left':5
            },
            'img-layer': {
                'width':'100%',
                'position':'absolute',
                'top':5,
                'left':5
            }
        }


        this.data = data || {
            style: types[this.typ],
            value: this.typ == 'text-layer'?'Wpisz tekst' :'/placeholder.png'
        }
        this.show = false;
        return this
    }
} 