import query from "./bower_components/query/query";

const encode = function(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(chr) {
            return "%" + chr.charCodeAt(0).toString(16);
        });
    },
    Url = new StructType({
        "schema": String,
        "username": String,
        "password": String,
        "hostname": String,
        "port": uint16,
        "pathname": String,
        "query": Any,
        "fragment": String
    });

Url.prototype.toString = function() {
    var url = "";

    if(this.schema) {
        url += this.schema;
    }

    url += "//";

    if(this.username) {
        url += this.username;

        if(this.password) {
            url += ":" + this.password;
        }

        url += "@";
    }

    url += this.hostname;

    if(this.pathname) {
        url += encode(this.pathname).replace(new RegExp("%" + "/".charCodeAt(0).toString(16), "g"), "/");
    } else {
        url += "/";
    }

    if(this.query) {
        let query = "";

        if(typeof(this.query) === "object") {
            url += "?";
            query = query.stringify(this.query);
        } else {
            query = String(this.query);

            if(query.charAt(0) !== "?") {
                url += "?";
            }
        }

        if(query) {
            url += query;
        }
    }

    if(this.fragment) {
        url += "#" + this.fragment;
    }

    return url;
};

Url.parse = function(string) {

};

export default Url;
