<template>
<div class="graph-container">
    <svg width="100%" height="100%" v-on:mousemove="moveMouse($event)" v-on:mouseup="mouseDown = false; connectingNode = null">
        <g v-for="node in graph"
            v-bind:key="node.id"
            v-on:mousedown="mouseDown = true; mouseOn = true; selectedNodeId = node.id"
            v-on:mouseup="mouseDown = false; endConnection(node)"
            v-on:mouseleave="mouseOn = false"
            v-on:click="$store.commit('selectNode',{node})"
            v-on:mousemove="dragNode($event,node)">
            <rect :x="node.x" :y="node.y" :width="nodeWidth" :height="nodeHeight" class="node" fill="white" :stroke="node.id == selectedNodeId ? 'black' : 'gray'"></rect>
            <image :width="nodeHeight-4" :height="nodeHeight-4" :x="node.x+2" :y="node.y+2" :href="'icons/'+node.type+'_icon.svg'"/>
            <text :x="node.x + nodeHeight + 4" :y="node.y + (nodeHeight/2) + 4" text-anchor="start">{{node.title}}</text>
            <circle :cx="node.x+(nodeWidth/2)" :cy="node.y" r="4" :stroke="node.id == selectedNodeId ? 'black' : 'gray'" stroke-width="1" fill="#e2e2e2"/>
            <circle :cx="node.x+(nodeWidth/2)" :cy="node.y+nodeHeight" r="4" :stroke="node.id == selectedNodeId ? 'black' : 'gray'" stroke-width="1" fill="#e2e2e2" v-on:mousedown="startConnection(node)"/>
            <path v-for="source in getSources(node)"
                v-bind:key="source.id"
                v-on:click="removeConnection(source,node)"
                :d="curveLine(node.x+(nodeWidth/2),node.y,source.x+(nodeWidth/2),source.y+nodeHeight)"
                style="stroke-width:3;stroke:rgba(0,0,0,0.2);fill:none;"/>
        </g>
        <path
            v-if="connectingNode && mouseDown"
            :d="curveLine(connectingNode.x+(nodeWidth/2),connectingNode.y+nodeHeight,mouseX-2,mouseY-2)"
            stroke-dasharray="5, 5"
            style="stroke-width:2;stroke:rgba(0,0,0,0.2);fill:none;"/>
    </svg>
</div>
</template>

<script>
export default {
    name: 'graph',
    computed:{
        graph(){
            return this.$store.getters.graph
        }
    },
    created(){
        this.$store.commit('compute')
    },
    data(){
        return {
            mouseX: false,
            mouseY: false,
            mouseDown: false,
            mouseOn: false,
            selectedNodeId: null,
            connectingNode: false,
            nodeWidth: 100,
            nodeHeight: 30,
        }
    },
    methods: {
        compute: function(){
            this.$store.commit('compute')
        },
        getSources: function(node){
            const sources = []
            for(var i = 0; i < node.sources.length; i++)
                for(var j = 0; j < this.graph.length; j++)
                    if(this.graph[j].id == node.sources[i])
                        sources.push(this.graph[j])
            return sources
        },
        moveMouse: function(e){
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        },
        dragNode: function(e,node){
            if(this.mouseDown && this.mouseOn){
                node.x += e.clientX - (this.mouseX || e.clientX)
                node.y += e.clientY - (this.mouseY || e.clientY)
            }
        },
        startConnection: function(node){
            this.connectingNode = node
        },
        endConnection: function(node){
            if(this.connectingNode && node){
                this.$store.commit('connect',{source:this.connectingNode,target:node})
                this.compute()
            }
            this.connectingNode = false
        },
        removeConnection: function(source,target){
            this.$store.commit('disconnect',{source,target})
            this.compute()
        },
        curveLine: function(x1,y1,x2,y2){
            return "M" + x1 + "," + y1 + " " +
            "C" + (x1 + 20) + "," + y1 + " " +
                (x2 - 20) + "," + y2 + " " +
                x2 + "," + y2
        }
    }
}
</script>

<style>
    .graph-container {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
    }
    .node {
        stroke-width: 1;
        cursor: pointer;
        user-select: none;
    }
    text {
        cursor: pointer;
        user-select: none;
    }
</style>
