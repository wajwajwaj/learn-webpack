function getInfo(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('es6语法可以被解析')
        }, 2000);
    })
}

async function es6func(){
    let string = await getInfo()
    console.log(string)
}
export default es6func