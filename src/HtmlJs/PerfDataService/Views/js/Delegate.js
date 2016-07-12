function Delegate() {
    var self = this;
    self.domain = "http://localhost:5000";
    self.defaultDirectoryTreePath = "C:/Users/t-kahoop/Development/perfview/src/PerfView/bin/Debug";
    self.defaultNumNodes = 10;
    self.treeDivID = "#treeContainer";

    self.log = function log(status) {
        $("#statusBar span").text(status);
    };

    self.httpGet = function httpGet(url, callback) {
        url = self.domain + url;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    self.log("GET " + url + " Complete");
                    callback(JSON.parse(xmlHttp.responseText));
                } else {
                    self.log("GET " + url + " " + xmlHttp.status);
                }
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    };

    //self.changeDirectoryTreePath = function changeDirectoryTreePath(path) {
    //    httpGet("/api/data/open?path=" + path, function (response) {
    //        console.log(response);
    //        createJsTreeFromJSON(response);
    //        delegate.log("Completed: Directory Tree Path Update");
    //    });
    //};

    self.openStackSummary = function openStackSummary(filename, stackType, numNodes) {
        self.httpGet("/api/data/stackviewer/summary?filename=" + filename + "&stacktype=" + stackType + "&numNodes=" + numNodes, function (response) {
            console.log(response);

            // Attach data to current (parent) window so that the new window can access it on load (via window.opener.stackData)
            window.filename = filename;
            window.stackType = stackType;
            window.numNodes = numNodes;
            window.stackData = response;

            // Create and open the new window
            var stackViewerWindow = window.open(self.domain + "/Views/static/stackviewer.html");

            // Log the completed work out
            delegate.log("Completed: Open " + stackType + " Stack Summary at filepath " + filename);
        });
    }

    // PRIVATE
    //function createJsTreeFromJSON(JSONTree) {
    //    // In case there is a tree already loaded in the div, destroy it
    //    $(self.treeDivID).jstree("destroy");

    //    // Load the JSON data
    //    $(self.treeDivID).jstree({
    //        'core': {
    //            'data': JSONTree.children
    //        }
    //    });

    //    // Add JsTree event listeners (handles user interactions with the tree)
    //    addJsTreeEventListeners();
    //};

    //// PRIVATE
    //function addJsTreeEventListeners() {
    //    $(self.treeDivID).on('activate_node.jstree', function (event, node) {
    //        nodeObject = node.node.original;  // JSTree has a node within a node.. Weird.

    //        if (nodeObject.type == "dir" || nodeObject.type == "file") {
    //            self.changeDirectoryTreePath(nodeObject.path);
    //        } else if (nodeObject.type == "stacks") {
    //            self.openStackSummary(nodeObject.path, nodeObject.stackType, self.defaultNumNodes);
    //        }
    //    });

        // TODO: Use double click event to change directory
        //$(self.treeDivID).on('dblclick.jstree', function (event, node) {
        //    var node = $(event.target).closest("li");
        //    var node_id = node[0].id
        //    var newPath = $(self.treeDivID).find(node_id);

        //    console.log(newPath);
        //    self.changeDirectoryTreePath(node.node.original.path);
        //});
        
        // TODO: Get dropdown arrows working
        //$(self.treeDivID).on('load_node.jstree', function (event, data) {
        //    var treeNode = data.node;
        //    if (treeNode.type === NODE_TYPE_FOLDER) {
        //        domNode = $(self.treeDivID).jstree.get_node(treeNode.id, true);
        //        domNode.addClass('jstree-open').removeClass('jstree-leaf');
        //    }
        //});
    //}

}

delegate = new Delegate();



/**********************************************************/
/**********************************************************/
/**************** USING THE DELEGATE BELOW ****************/
/**********************************************************/
/**********************************************************/

