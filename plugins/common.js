
export default ({ store, $config, redirect, route, app }, inject) => {
  const sameFileNameCheck = (fileArr) => {
    const newFileArr = structuredClone(fileArr)
    const nameArr = []
    newFileArr.forEach((file,index)=>{
      if (!file) return
      const fileName = file.name
      if (!nameArr[fileName]) {
        nameArr[fileName] = []
      }
      nameArr[fileName].push(index)
    })
    Object.keys(nameArr).forEach(name => {
      const arr = nameArr[name]
      if (arr.length > 1) {
        arr.forEach((fileIndex,index)=>{
          if (index === 0) return
          const file = newFileArr[fileIndex]
          const name = file.name.split('.')[0]
          const extension = file.name.split('.').pop()
          const newName = `${name}(${index}).${extension}`
          const blob = file.slice(0, file.size, file.type)
          // ファイル名称変更後のファイルオブジェクト
          const renamedFile = new File([blob], newName, {type: file.type})
          newFileArr[fileIndex] = renamedFile
        })
      }
    })
    return newFileArr
  }
  inject('sameFileNameCheck', sameFileNameCheck)
}
