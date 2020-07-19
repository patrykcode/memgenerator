class Layer
{
    constructor({typ,data}){
        this.type = typ || 'textLayer'
        this.data = data || {
            style:'',
            value:'' 
        }
    }
} 