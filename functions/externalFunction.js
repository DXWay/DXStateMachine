const common = require('../generated/common');
module.exports = {
    externalFunction : function(context) {
        return new Promise(function (resolve, reject) {
            let outputString = 'externalFunction is called New one==============';
            context['EXTERN'] = 'Extern'
            console.log(context['USE_KEYBOARD_INPUT']);
            common.GOTO(context, 'START');   
            resolve(outputString);
        });
    }
}