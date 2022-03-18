document.findClasses = function(requiredClass) {
    
    const root = this.body;
    
    function search(node){
       // console.log(node)

        let result = [];

        if(node.classList.contains(requiredClass)) {
            return node
        }

        for(const element of node.children) {
            result = result.concat(search(element))
        }

        return result
    }

    return search(root)
}

const d = document.findClasses("myclass")
console.log(d)