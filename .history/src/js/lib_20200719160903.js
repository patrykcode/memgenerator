
document.addEventListener('DOMContentLoaded',function(){
   
    Vue.component('fa-trash',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z" class=""></path></svg>'
    })

    Vue.component('fa-plus',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 64c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352m0-32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-60 206h-98v-98c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v98h-98c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h98v98c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12v-98h98c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z" class=""></path></svg>'
    })

    Vue.component('text-layer',{
        props:{
            elem:{
                type:Object,
                default: () => {
                    return{
                        style:'',
                        value:'Wpisz tekst'
                    } 
                }
            }
        },
        template:'<div class="layer-element" v-bind:style="elem.style">{{elem.value}}</div>'
    })

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layers:[],
                fontSize: [],
                canvas:{
                    width:500,
                    height:500
                },
                downloadUrl:null
            }
        },
        mounted(){
            for(var i=1;i<73;i++){
                this.fontSize.push(i+'px');
            }
        },
        methods:{
            addLayer(){
                this.layers.push(new Layer({
                    
                }))
                setTimeout(this.render,200);
            },
            deleteLayer(i){
                this.layers.splice(i, 1);
            },
            html_to_xml(html) {
                var doc = document.implementation.createHTMLDocument('');
                doc.write(html);

                doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

                html = (new XMLSerializer).serializeToString(doc.body);
                console.log(html)
                return html.toString();
            },
            downloadSVG() {
                var svg = document.getElementById('layerCanvas');
                var ctx = svg.getContext('2d');
                console.log(ctx);

                console.log('svg',svg.toDataURL());
                const blob = new Blob([svg.innerHTML.toString()]);
                const element = document.createElement("a");
                element.download = "mem.png";
                element.href = this.downloadUrl;
                element.click();
                element.remove();
            },
            render(){
                var canvas = document.getElementById('layerCanvas');
                
                canvas.height = this.canvas.height;
                canvas.width = this.canvas.width;

                var ctx = canvas.getContext('2d');
                
                var data = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" '+
                  'width="'+this.canvas.width+'" height="'+this.canvas.height+'">' +
                  '<foreignObject width="100%" height="100%">' +
                  this.html_to_xml(document.getElementById('canvas').innerHTML) +
                  '</foreignObject>' +
                  '</svg>'; 

                var img = new Image();
                 var $this = this
                img.addEventListener('load', function() {
                    ctx.drawImage(img, 0, 0);
                    $this.downloadUrl = canvas.toDataURL("image/png");
                }, false);

                img.setAttribute('crossorigin', 'Anonymous');
                img.src = data;
               

            },
            drag(elmnt){
                dragElement(elmnt)
            }
        
        }
    })

   
})


function dragElement(elmnt) {
console.log(elmnt)
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("handler"+elmnt.id  )) {
      // if present, the header is where you move the DIV from:
      document.getElementById("handler"+elmnt.id ).onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
