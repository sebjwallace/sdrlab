
import Graph from 'sdrkit-js/src/core/Graph'

const graph = new Graph()

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
            const node = graph.create({type:type.toLowerCase()})
            node.x = node.y = 0
            node.title = 'untitled'
        },
        selectNode(state,{node}){
            state.node = node
        }
    }
}