/**
 * Created by Yarkin UCERLER on 19.12.2018.
 */

const fs = require('fs')
const path = require('path')
const compiler = require('vue-template-compiler')
const jsdoc2md = require('jsdoc-to-markdown')


const source = './src';

fileSearch(source);

function fileSearch (source) {
    fs.readdirSync(source).forEach(folder => {
      if(fs.statSync(source + '/' + folder).isDirectory()) {
          const path = source + '/' + folder
          fileSearch(path)
      }
      else {
          if (path.extname(path.basename(source + '/' + folder)) === '.vue') {
              vueCompiler(source + '/' + folder)
          }
      }

    });

    fs.readdirSync(source).forEach(folder => {
        fileReaderInFolder(source + '/' + folder)

    });
}


function vueCompiler(content) {

    const file = fs.readFileSync(content, 'utf8')

    const parsed = compiler.parseComponent(file)
    const template = parsed.template ? parsed.template.content : ''
    const script = parsed.script ? parsed.script.content : ''

    const templateEscaped = template.trim().replace(/`/g, '\\`')
    const scriptWithTemplate = script.match(/export default ?\{/)
        ? script.replace(/export default ?\{/, `$&\n\ttemplate: \`${templateEscaped}\`,`)
        : `${script}\n export default {\n\ttemplate: \`${templateEscaped}\`};`

    fs.writeFileSync(path.dirname(content) + '/' + path.basename(content, '.vue') + '.js', scriptWithTemplate, 'utf8')
}

function fileReaderInFolder(folder) {
    if(path.extname(path.basename(folder)) === '.js') {
        console.log(folder);
        const templateData = jsdoc2md.renderSync({
           files: folder
       })
       fs.writeFileSync(path.dirname(folder) + '/' + path.basename(folder, '.js') + '.md', templateData, 'utf8')
       jsdoc2md.clear()
    }
}



/*
templateData = jsdoc2md.getJsdocDataSync({
    files: 'src/!*.js',
    configure: './conf.json'
})

console.log(templateData)

jsdoc2md.clear()*/
