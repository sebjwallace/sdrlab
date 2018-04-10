
import Graph from 'sdrkit-js/src/core/Graph'

const graph = new Graph()
graph.graph = ([
    {id:1,type:'sdr',x:10,y:10,sources:[],state:[2,4,6,8]},
    {id:2,type:'sdr',x:10,y:10,sources:[],state:[8,9,10,11]},
    {id:4,type:'union',x:40,y:40,sources:[1]}
])

export default {
    state: {
        graph: [],
        node: null
    },
    getters: {
        graph: state => state.graph,
        node: state => state.node
    },
    mutations: {
        compute(state){
            state.graph = graph.compute()
        },
        connect(state,{source,target}){
            graph.connect(source,target)
        },
        disconnect(state,{source,target}){
            graph.disconnect(source,target)
        },
        create(state,{type}){
            const node = graph.create({type})
            node.x = node.y = 0
        },
        selectNode(state,{node}){
            state.node = node
        }
    }
}