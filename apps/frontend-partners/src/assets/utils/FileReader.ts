function ImagetoBase64(params) {
    const reader = new FileReader()

    reader.readAsDataURL(params)

    const data = new Promise((resolve, reject)=>{
        reader.onload = () => resolve(reader.result)

        reader.onerror = err => reject(err)
    })

    console.log(data);

    return data
}

export {ImagetoBase64}