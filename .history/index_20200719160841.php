<!DOCTYPE html>
<html>
    <head>
        <script src="js/index.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
        
    </head>
    <body>
        <div id="app">
            <div class="layer">
                <ul id="layers">
                    <li>
                        <button v-if="downloadUrl" class="btn btn-small btn-success" v-on:click="downloadSVG()">pobierz</button>
                    </li>
                    <li v-bind:key="index" v-for="layer,index in layers">
                       
                        <select v-model="layer.data.style['font-family']">
                            <option>arial</option>
                            <option>ubuntu</option>
                            <option>helvetica</option>
                        </select>

                        <select v-model="layer.data.style['font-size']">
                            <option v-bind:value="fs" v-for="fs,index in fontSize">{{fs}}</option>
                        </select>
                        <input type="text" v-model="layer.data.value">
                        <button class="btn btn-danger btn-small " v-on:click="deleteLayer(index)">
                            <fa-trash v-bind:size="15"/>
                        </button>
                    </li>
                    <li>
                        <button class="btn btn-primary btn-small w-100" v-on:click="addLayer()">
                            <fa-plus v-bind:size="15"/>
                        </button>
                    </li>
                </ul>
            </div>
            <div id="canvas">
                <div v-bind:key="'element'+index" v-for="element,index in layers" v-bind:id="'element'+index">
                    <div v-bind:id="'handler'+index+'element'" v-on:click="dragElement(this)">&times;</div>
                    <component :is="element.typ" v-bind:elem="element.data"></component>
                </div>
            </div>
            <canvas id="layerCanvas" style="border:1px solid #000000;"></canvas>
        </div>
        
    </body>
</html>