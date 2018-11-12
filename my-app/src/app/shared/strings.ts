export class String {
    static format(...args): string// = function(...args) {
    {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        if (arguments.length == 0) {
            return "";
        }
        var theString = arguments[0];
        if (theString == null) {
            return "";
        }
        if (typeof theString == 'undefined') {
            return "";
        }
        if (theString.length < 1) {
            return "";
        }
        // start with the second argument (i = 1)
        for (var i = 1; i < arguments.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }

        return theString;
    }
    static bulletList(array: string[], ...args): string// = function(...args) {
    {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        if (array.length == 0) {
            return "";
        }
        var response = "<ul class='bullet-dot'>";
        for(var i = 0; i < array.length; i++)
        {
            response += "<li>" + this.format(array[i], ...args) + "</li>";
        }
        response += "</ul>";
        return response;
    }
}